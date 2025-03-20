import React, { useState, useRef, useEffect } from 'react';

interface MorseCodeMap {
  [key: string]: string;
}

const MorseConverter: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [morseCode, setMorseCode] = useState<string>('');
  const [mode, setMode] = useState<'textToMorse' | 'morseToText'>('textToMorse');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const audioContext = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const isMounted = useRef<boolean>(true);
  
  // Define Morse code mappings
  const textToMorseMap: MorseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', 
    '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
    ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
    '$': '...-..-', '@': '.--.-.', ' ': '/'
  };
  
  // Create reverse mapping (morse to text)
  const morseToTextMap: MorseCodeMap = {};
  Object.keys(textToMorseMap).forEach(key => {
    morseToTextMap[textToMorseMap[key]] = key;
  });
  
  // Handle component unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (audioContext.current) {
        audioContext.current.close();
      }
      if (oscillator.current) {
        oscillator.current.stop();
      }
    };
  }, []);

  // Convert text to Morse code
  const convertTextToMorse = () => {
    setError('');
    
    if (!text.trim()) {
      setMorseCode('');
      return;
    }
    
    try {
      const result = text
        .toUpperCase()
        .split('')
        .map(char => {
          if (textToMorseMap[char]) {
            return textToMorseMap[char];
          } else if (char === ' ') {
            return '/';
          } else {
            throw new Error(`Character '${char}' cannot be converted to Morse code`);
          }
        })
        .join(' ');
      
      setMorseCode(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during conversion');
      }
    }
  };

  // Convert Morse code to text
  const convertMorseToText = () => {
    setError('');
    
    if (!morseCode.trim()) {
      setText('');
      return;
    }
    
    try {
      // Replace multiple spaces with a single space
      const cleanedMorseCode = morseCode.replace(/\s+/g, ' ').trim();
      
      const result = cleanedMorseCode
        .split(' ')
        .map(code => {
          if (code === '/') {
            return ' ';
          } else if (morseToTextMap[code]) {
            return morseToTextMap[code];
          } else {
            throw new Error(`Morse code '${code}' cannot be converted to text`);
          }
        })
        .join('');
      
      setText(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during conversion');
      }
    }
  };

  // Handle conversion based on current mode
  const handleConvert = () => {
    if (mode === 'textToMorse') {
      convertTextToMorse();
    } else {
      convertMorseToText();
    }
  };

  // Switch between text-to-morse and morse-to-text modes
  const toggleMode = () => {
    setMode(prevMode => prevMode === 'textToMorse' ? 'morseToText' : 'textToMorse');
    setError('');
  };

  // Play Morse code
  const playMorseCode = async () => {
    if (isPlaying || !morseCode) return;
    
    setIsPlaying(true);
    setError('');
    
    try {
      // Initialize audio context if it doesn't exist
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const context = audioContext.current;
      
      // Define timing constants (adjusted by playback speed)
      const dotDuration = 60 / playbackSpeed; // ms
      const dashDuration = dotDuration * 3;
      const elementGap = dotDuration;
      const letterGap = dotDuration * 3;
      const wordGap = dotDuration * 7;
      
      // Function to play a tone
      const playTone = (duration: number): Promise<void> => {
        return new Promise((resolve) => {
          oscillator.current = context.createOscillator();
          const gainNode = context.createGain();
          
          oscillator.current.type = 'sine';
          oscillator.current.frequency.setValueAtTime(700, context.currentTime);
          
          oscillator.current.connect(gainNode);
          gainNode.connect(context.destination);
          
          // Apply slight fade in/out to avoid clicks
          gainNode.gain.setValueAtTime(0, context.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.5, context.currentTime + 0.01);
          gainNode.gain.linearRampToValueAtTime(0, context.currentTime + (duration / 1000) - 0.01);
          
          oscillator.current.start();
          
          setTimeout(() => {
            if (oscillator.current) {
              oscillator.current.stop();
              oscillator.current = null;
            }
            resolve();
          }, duration);
        });
      };
      
      // Function to play silence
      const playSilence = (duration: number): Promise<void> => {
        return new Promise((resolve) => {
          setTimeout(resolve, duration);
        });
      };
      
      // Parse and play the Morse code
      const morseSounds = morseCode.split('');
      let index = 0;
      
      while (index < morseSounds.length && isMounted.current) {
        const symbol = morseSounds[index];
        
        if (symbol === '.') {
          await playTone(dotDuration);
          await playSilence(elementGap);
        } else if (symbol === '-') {
          await playTone(dashDuration);
          await playSilence(elementGap);
        } else if (symbol === ' ') {
          await playSilence(letterGap);
        } else if (symbol === '/') {
          await playSilence(wordGap);
        }
        
        index++;
      }
      
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error playing Morse code: ${err.message}`);
      } else {
        setError('An error occurred while playing Morse code');
      }
    } finally {
      if (isMounted.current) {
        setIsPlaying(false);
      }
    }
  };

  // Stop playing Morse code
  const stopPlayback = () => {
    if (oscillator.current) {
      oscillator.current.stop();
      oscillator.current = null;
    }
    setIsPlaying(false);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (mode === 'textToMorse') {
      setText(e.target.value);
    } else {
      setMorseCode(e.target.value);
    }
  };

  // Handle the Enter key for conversion
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleConvert();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Morse Code Converter</h1>
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === 'textToMorse' ? 'Text to Morse Code' : 'Morse Code to Text'}
          </h2>
          
          <button
            className="btn-secondary"
            onClick={toggleMode}
          >
            Switch Mode
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="label">
              {mode === 'textToMorse' ? 'Text Input' : 'Morse Code Input'}
            </label>
            <textarea
              className="input w-full h-32 font-mono"
              value={mode === 'textToMorse' ? text : morseCode}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={mode === 'textToMorse' 
                ? 'Enter text to convert to Morse code...' 
                : 'Enter Morse code to convert to text (use spaces between letters and / between words)...'}
            />
          </div>
          
          <div className="flex">
            <button
              className="btn-primary flex-1"
              onClick={handleConvert}
            >
              Convert
            </button>
          </div>
          
          <div>
            <label className="label">
              {mode === 'textToMorse' ? 'Morse Code Output' : 'Text Output'}
            </label>
            <textarea
              className="input w-full h-32 font-mono"
              value={mode === 'textToMorse' ? morseCode : text}
              readOnly
            />
          </div>
          
          {error && (
            <div className="bg-red-900 text-white p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
      
      {/* Playback Controls - Only visible in text-to-morse mode or when morse code is available */}
      {(mode === 'textToMorse' || morseCode) && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Morse Code Playback</h2>
          
          <div className="space-y-4">
            <div>
              <label className="label">Playback Speed</label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Slow</span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="flex-1"
                  disabled={isPlaying}
                />
                <span className="text-sm">Fast</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-sm ml-2">{playbackSpeed.toFixed(1)}x</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                className={`btn-primary flex-1 ${!morseCode || isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={playMorseCode}
                disabled={!morseCode || isPlaying}
              >
                {isPlaying ? 'Playing...' : 'Play Morse Code'}
              </button>
              
              {isPlaying && (
                <button
                  className="btn-secondary flex-1"
                  onClick={stopPlayback}
                >
                  Stop
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Morse Code Reference */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Morse Code Reference</h2>
          <button
            className="text-sm text-gray-400 hover:text-white"
            onClick={() => {
              const element = document.getElementById('morseReference');
              if (element) {
                element.style.display = element.style.display === 'none' ? 'block' : 'none';
              }
            }}
          >
            Show/Hide
          </button>
        </div>
        
        <div id="morseReference" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Object.entries(textToMorseMap).map(([char, code]) => (
            <div key={char} className="bg-gray-700 p-2 rounded flex justify-between">
              <span className="font-bold">{char === ' ' ? '[space]' : char}</span>
              <span className="font-mono">{code}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            Morse code is a method of encoding text characters as standardized sequences of dots (.) and dashes (-).
          </p>
          
          <div>
            <h3 className="font-semibold text-white">Text to Morse Code:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Enter your text in the input field</li>
              <li>Click "Convert" or press Ctrl+Enter</li>
              <li>The corresponding Morse code will appear in the output field</li>
              <li>You can play the Morse code audio using the playback controls</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white">Morse Code to Text:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Enter Morse code in the input field</li>
              <li>Use dots (.) for short signals and dashes (-) for long signals</li>
              <li>Separate letters with spaces</li>
              <li>Separate words with forward slashes (/)</li>
              <li>Click "Convert" or press Ctrl+Enter</li>
              <li>The decoded text will appear in the output field</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorseConverter; 