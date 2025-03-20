import React, { useState, useEffect } from 'react';
import { useToastMessages } from '../components/Toast';

// Add NodeJS types
type Timeout = ReturnType<typeof setTimeout>;

enum GameType {
  Arithmetic = 'arithmetic',
  NumberSequence = 'number-sequence',
  GeometryQuiz = 'geometry-quiz',
  FactorChallenge = 'factor-challenge',
  MathMemory = 'math-memory',
  SpeedCalculation = 'speed-calculation',
  FractionChallenge = 'fraction-challenge',
  AlgebraPuzzle = 'algebra-puzzle',
  ProbabilityGame = 'probability-game',
  MathWordProblem = 'math-word-problem'
}

enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

enum Operation {
  Addition = '+',
  Subtraction = '-',
  Multiplication = '×',
  Division = '÷'
}

interface Question {
  id: string;
  prompt: string;
  answer: number | string;
  options?: string[];
  imageUrl?: string;
}

interface GameStats {
  correct: number;
  total: number;
  timeSpent: number;
  streak: number;
}

const MathGames: React.FC = () => {
  const [gameType, setGameType] = useState<GameType>(GameType.Arithmetic);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [isPlaying, setIsPlaying] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');
  const [stats, setStats] = useState<GameStats>({
    correct: 0,
    total: 0,
    timeSpent: 0,
    streak: 0
  });
  const [timer, setTimer] = useState<number>(0);
  const [operations, setOperations] = useState<Operation[]>([Operation.Addition]);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const toast = useToastMessages();

  useEffect(() => {
    let interval: Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const generateQuestion = (): Question => {
    switch (gameType) {
      case GameType.Arithmetic:
        return generateArithmeticQuestion();
      case GameType.NumberSequence:
        return generateSequenceQuestion();
      case GameType.GeometryQuiz:
        return generateGeometryQuestion();
      case GameType.FactorChallenge:
        return generateFactorQuestion();
      case GameType.MathMemory:
        return generateMemoryQuestion();
      case GameType.SpeedCalculation:
        return generateSpeedQuestion();
      case GameType.FractionChallenge:
        return generateFractionQuestion();
      case GameType.AlgebraPuzzle:
        return generateAlgebraQuestion();
      case GameType.ProbabilityGame:
        return generateProbabilityQuestion();
      case GameType.MathWordProblem:
        return generateWordProblem();
      default:
        return generateArithmeticQuestion();
    }
  };

  const generateArithmeticQuestion = (): Question => {
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1: number, num2: number, answer: number;

    switch (difficulty) {
      case Difficulty.Easy:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        break;
      case Difficulty.Medium:
        num1 = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * 50) + 10;
        break;
      case Difficulty.Hard:
        num1 = Math.floor(Math.random() * 100) + 50;
        num2 = Math.floor(Math.random() * 100) + 50;
        break;
    }

    switch (operation) {
      case Operation.Addition:
        answer = num1 + num2;
        break;
      case Operation.Subtraction:
        answer = num1 - num2;
        break;
      case Operation.Multiplication:
        answer = num1 * num2;
        break;
      case Operation.Division:
        // Ensure clean division
        answer = num1;
        num1 = answer * num2;
        break;
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      prompt: `${num1} ${operation} ${num2} = ?`,
      answer: answer
    };
  };

  const generateSequenceQuestion = (): Question => {
    const patterns = {
      [Difficulty.Easy]: [
        { rule: 'n + 2', start: 1, length: 5 },
        { rule: 'n * 2', start: 1, length: 5 },
        { rule: 'n + 3', start: 0, length: 5 }
      ],
      [Difficulty.Medium]: [
        { rule: 'n² + 1', start: 1, length: 5 },
        { rule: 'n * 3 - 1', start: 1, length: 5 },
        { rule: 'n² - n', start: 2, length: 5 }
      ],
      [Difficulty.Hard]: [
        { rule: 'fibonacci', start: 0, length: 6 },
        { rule: 'n³ - n', start: 1, length: 5 },
        { rule: '2ⁿ - 1', start: 1, length: 5 }
      ]
    };

    const pattern = patterns[difficulty][Math.floor(Math.random() * patterns[difficulty].length)];
    const sequence: number[] = [];
    let nextNumber: number;

    if (pattern.rule === 'fibonacci') {
      sequence.push(0, 1);
      for (let i = 2; i < pattern.length; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
      }
      nextNumber = sequence[sequence.length - 1] + sequence[sequence.length - 2];
    } else {
      for (let i = 0; i < pattern.length; i++) {
        const n = pattern.start + i;
        sequence.push(eval(pattern.rule.replace('n', n.toString())));
      }
      const n = pattern.start + pattern.length;
      nextNumber = eval(pattern.rule.replace('n', n.toString()));
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      prompt: `What comes next in the sequence: ${sequence.join(', ')}, ?`,
      answer: nextNumber
    };
  };

  const generateGeometryQuestion = (): Question => {
    const questions = {
      [Difficulty.Easy]: [
        {
          id: Math.random().toString(36).substr(2, 9),
          prompt: 'What is the area of a square with side length 5?',
          answer: 25,
          imageUrl: '/images/square.svg'
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          prompt: 'How many sides does a hexagon have?',
          answer: '6',
          imageUrl: '/images/hexagon.svg'
        }
      ],
      [Difficulty.Medium]: [
        {
          id: Math.random().toString(36).substr(2, 9),
          prompt: 'What is the area of a triangle with base 6 and height 8?',
          answer: 24,
          imageUrl: '/images/triangle.svg'
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          prompt: 'What is the circumference of a circle with radius 7? (Use 3.14 for π)',
          answer: 43.96,
          imageUrl: '/images/circle.svg'
        }
      ],
      [Difficulty.Hard]: [
        {
          id: Math.random().toString(36).substr(2, 9),
          prompt: 'What is the volume of a cube with side length 4?',
          answer: 64,
          imageUrl: '/images/cube.svg'
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          prompt: 'What is the surface area of a sphere with radius 3? (Use 3.14 for π)',
          answer: 113.04,
          imageUrl: '/images/sphere.svg'
        }
      ]
    };

    const questionSet = questions[difficulty];
    return questionSet[Math.floor(Math.random() * questionSet.length)];
  };

  const generateFactorQuestion = (): Question => {
    let number: number;
    switch (difficulty) {
      case Difficulty.Easy:
        number = [12, 15, 20, 24, 28][Math.floor(Math.random() * 5)];
        break;
      case Difficulty.Medium:
        number = [36, 48, 56, 64, 72][Math.floor(Math.random() * 5)];
        break;
      case Difficulty.Hard:
        number = [96, 120, 144, 168, 192][Math.floor(Math.random() * 5)];
        break;
    }

    const factors = Array.from({ length: number }, (_, i) => i + 1)
      .filter(i => number % i === 0)
      .join(', ');

    return {
      id: Math.random().toString(36).substr(2, 9),
      prompt: `List all factors of ${number} (separate with commas)`,
      answer: factors
    };
  };

  const generateMemoryQuestion = (): Question => {
    const length = difficulty === Difficulty.Easy ? 4 : 
                  difficulty === Difficulty.Medium ? 6 : 8;
    const numbers = Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      prompt: `Remember these numbers (they will disappear in 5 seconds): ${numbers.join(' ')}`,
      answer: numbers.join('')
    };
  };

  const generateSpeedQuestion = (): Question => {
    const operations = ['+', '-', '*'];
    const numbers: number[] = [];
    const ops: string[] = [];
    
    const count = difficulty === Difficulty.Easy ? 2 :
                 difficulty === Difficulty.Medium ? 3 : 4;

    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * 10) + 1);
      if (i < count - 1) {
        ops.push(operations[Math.floor(Math.random() * operations.length)]);
      }
    }

    const expression = numbers.reduce((acc, num, i) => {
      return acc + num + (ops[i] || '');
    }, '');

    return {
      id: Math.random().toString(36).substr(2, 9),
      prompt: `Quickly solve: ${expression}`,
      answer: eval(expression)
    };
  };

  const generateFractionQuestion = (): Question => {
    let num1: number, den1: number, num2: number, den2: number;
    const operations = ['+', '-', '×', '÷'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    switch (difficulty) {
      case Difficulty.Easy:
        num1 = Math.floor(Math.random() * 5) + 1;
        den1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        den2 = Math.floor(Math.random() * 5) + 1;
        break;
      case Difficulty.Medium:
        num1 = Math.floor(Math.random() * 10) + 1;
        den1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        den2 = Math.floor(Math.random() * 10) + 1;
        break;
      case Difficulty.Hard:
        num1 = Math.floor(Math.random() * 15) + 1;
        den1 = Math.floor(Math.random() * 15) + 1;
        num2 = Math.floor(Math.random() * 15) + 1;
        den2 = Math.floor(Math.random() * 15) + 1;
        break;
    }

    let answer: string;
    switch (operation) {
      case '+':
        answer = `${num1 * den2 + num2 * den1}/${den1 * den2}`;
        break;
      case '-':
        answer = `${num1 * den2 - num2 * den1}/${den1 * den2}`;
        break;
      case '×':
        answer = `${num1 * num2}/${den1 * den2}`;
        break;
      case '÷':
        answer = `${num1 * den2}/${den1 * num2}`;
        break;
      default:
        answer = '0';
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      prompt: `Calculate: ${num1}/${den1} ${operation} ${num2}/${den2}`,
      answer: answer
    };
  };

  const generateAlgebraQuestion = (): Question => {
    let x: number, y: number;
    switch (difficulty) {
      case Difficulty.Easy:
        x = Math.floor(Math.random() * 5) + 1;
        y = Math.floor(Math.random() * 5) + 1;
        break;
      case Difficulty.Medium:
        x = Math.floor(Math.random() * 10) + 1;
        y = Math.floor(Math.random() * 10) + 1;
        break;
      case Difficulty.Hard:
        x = Math.floor(Math.random() * 15) + 1;
        y = Math.floor(Math.random() * 15) + 1;
        break;
    }

    const equations = [
      {
        prompt: `If x = ${x} and y = ${y}, what is 2x + 3y?`,
        answer: 2 * x + 3 * y
      },
      {
        prompt: `If x = ${x} and y = ${y}, what is x² + y²?`,
        answer: x * x + y * y
      },
      {
        prompt: `If x = ${x} and y = ${y}, what is (x + y)²?`,
        answer: (x + y) * (x + y)
      }
    ];

    return {
      id: Math.random().toString(36).substr(2, 9),
      ...equations[Math.floor(Math.random() * equations.length)]
    };
  };

  const generateProbabilityQuestion = (): Question => {
    const scenarios = {
      [Difficulty.Easy]: [
        {
          prompt: 'What is the probability of rolling a 6 on a fair die?',
          answer: '1/6'
        },
        {
          prompt: 'What is the probability of getting heads when flipping a fair coin?',
          answer: '1/2'
        }
      ],
      [Difficulty.Medium]: [
        {
          prompt: 'What is the probability of drawing a red card from a standard deck?',
          answer: '1/2'
        },
        {
          prompt: 'What is the probability of rolling an even number on a fair die?',
          answer: '1/2'
        }
      ],
      [Difficulty.Hard]: [
        {
          prompt: 'What is the probability of drawing two aces in a row from a standard deck (without replacement)?',
          answer: '1/221'
        },
        {
          prompt: 'What is the probability of rolling three 6s in a row on a fair die?',
          answer: '1/216'
        }
      ]
    };

    const questionSet = scenarios[difficulty];
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...questionSet[Math.floor(Math.random() * questionSet.length)]
    };
  };

  const generateWordProblem = (): Question => {
    const problems = {
      [Difficulty.Easy]: [
        {
          prompt: 'If John has 5 apples and gives 2 to Mary, how many apples does he have left?',
          answer: 3
        },
        {
          prompt: 'A pizza is cut into 8 equal pieces. If you eat 3 pieces, how many pieces are left?',
          answer: 5
        }
      ],
      [Difficulty.Medium]: [
        {
          prompt: 'A train travels 120 miles in 2 hours. What is its average speed in miles per hour?',
          answer: 60
        },
        {
          prompt: 'If a shirt costs $25 and is on sale for 20% off, what is the final price?',
          answer: 20
        }
      ],
      [Difficulty.Hard]: [
        {
          prompt: 'A rectangle has a length that is 3 times its width. If the perimeter is 48 units, what is the width?',
          answer: 6
        },
        {
          prompt: 'If you invest $1000 at 5% interest compounded annually, how much will you have after 2 years?',
          answer: 1102.50
        }
      ]
    };

    const problemSet = problems[difficulty];
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...problemSet[Math.floor(Math.random() * problemSet.length)]
    };
  };

  const startGame = () => {
    setIsPlaying(true);
    setStats({
      correct: 0,
      total: 0,
      timeSpent: 0,
      streak: 0
    });
    setTimer(0);
    setQuestion(generateQuestion());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;

    const isCorrect = answer === question.answer.toString();
    const newStats = {
      ...stats,
      correct: isCorrect ? stats.correct + 1 : stats.correct,
      total: stats.total + 1,
      streak: isCorrect ? stats.streak + 1 : 0
    };

    if (isCorrect && newStats.streak > bestStreak) {
      setBestStreak(newStats.streak);
    }

    setStats(newStats);
    setShowFeedback(true);
    setFeedback(isCorrect ? 'Correct! Well done! 🎉' : `Incorrect. The answer was ${question.answer}`);
    
    setTimeout(() => {
      setShowFeedback(false);
    setAnswer('');
    setQuestion(generateQuestion());
    }, 2000);

    if (isCorrect) {
      toast.success('Great job! Keep it up!');
    } else {
      toast.error('Try again! You can do it!');
    }
  };

  const resetGame = () => {
    setIsPlaying(false);
    setTimer(0);
    setStats({
      correct: 0,
      total: 0,
      timeSpent: 0,
      streak: 0
    });
    setQuestion(null);
    setAnswer('');
    setShowFeedback(false);
    setFeedback('');
  };

  const toggleOperation = (op: Operation) => {
    setOperations(prev => {
      if (prev.includes(op)) {
        return prev.length > 1 ? prev.filter(o => o !== op) : prev;
      }
      return [...prev, op];
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Math Games</h1>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {!isPlaying ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Game Type</label>
              <select
                value={gameType}
                onChange={(e) => setGameType(e.target.value as GameType)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                  <option value={GameType.Arithmetic}>Arithmetic</option>
                <option value={GameType.NumberSequence}>Number Sequence</option>
                <option value={GameType.GeometryQuiz}>Geometry Quiz</option>
                <option value={GameType.FactorChallenge}>Factor Challenge</option>
                <option value={GameType.MathMemory}>Math Memory</option>
                <option value={GameType.SpeedCalculation}>Speed Calculation</option>
                <option value={GameType.FractionChallenge}>Fraction Challenge</option>
                <option value={GameType.AlgebraPuzzle}>Algebra Puzzle</option>
                <option value={GameType.ProbabilityGame}>Probability Game</option>
                <option value={GameType.MathWordProblem}>Math Word Problem</option>
              </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value={Difficulty.Easy}>Easy</option>
                <option value={Difficulty.Medium}>Medium</option>
                <option value={Difficulty.Hard}>Hard</option>
              </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Operations</label>
                <div className="flex flex-wrap gap-2">
                {Object.values(Operation).map((op) => (
                    <button
                      key={op}
                      onClick={() => toggleOperation(op)}
                    className={`px-4 py-2 rounded-md ${
                        operations.includes(op)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

            <button
              onClick={startGame}
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
            >
              Start Game
            </button>
        </div>
      ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">Time: {timer}s</div>
              <div className="text-lg font-semibold">Score: {stats.correct}/{stats.total}</div>
              <div className="text-lg font-semibold">Streak: {stats.streak}</div>
              <div className="text-lg font-semibold">Best Streak: {bestStreak}</div>
          </div>

          {question && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-xl font-medium mb-4">{question.prompt}</p>
              {question.imageUrl && (
                  <img src={question.imageUrl} alt="Question" className="max-w-full h-auto mb-4" />
              )}
                <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
                  <div className="flex gap-4">
              <button
                type="submit"
                      className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={resetGame}
                      className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      End Game
              </button>
                  </div>
            </form>
              </div>
            )}

            {showFeedback && (
              <div className={`p-4 rounded-md text-center text-lg font-medium ${
                feedback.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {feedback}
              </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default MathGames; 