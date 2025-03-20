import React, { useEffect, useState, useRef } from 'react';

interface Butterfly {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  color: string;
  wingFlapSpeed: number;
  wingFlapDirection: number;
  xDirection: number;
  yDirection: number;
  pathAmplitude: {
    x: number;
    y: number;
  };
  pathFrequency: {
    x: number;
    y: number;
  };
  pathProgress: number;
  wingPattern: number;
  restProbability: number;
  restTimer: number;
  flutterIntensity: number;
  zIndex: number;
}

interface ButterflyAnimationProps {
  count?: number;
  interactive?: boolean;
}

const COLORS = [
  'butterfly-purple',
  'butterfly-pink',
  'butterfly-blue',
  'butterfly-green',
];

// Realistic butterfly flight physics parameters
const FLIGHT_PARAMS = {
  minSpeed: 0.3,
  maxSpeed: 1.2,
  minWingFlapSpeed: 0.08,
  maxWingFlapSpeed: 0.2,
  minFlutterIntensity: 0.8,
  maxFlutterIntensity: 1.2,
  minRestProbability: 0.0005,
  maxRestProbability: 0.002,
  minRestTime: 50,
  maxRestTime: 200,
  minZIndex: 5,
  maxZIndex: 20,
};

const ButterflyAnimation: React.FC<ButterflyAnimationProps> = ({
  count = 15,
  interactive = true,
}) => {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const initialized = useRef(false);

  // Generate initial butterflies
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    const newButterflies: Butterfly[] = Array.from({ length: count }).map((_, index) => ({
      id: index,
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      size: 20 + Math.random() * 40, // Between 20px and 60px
      speed: FLIGHT_PARAMS.minSpeed + Math.random() * (FLIGHT_PARAMS.maxSpeed - FLIGHT_PARAMS.minSpeed),
      rotation: Math.random() * 360, // Random initial rotation
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      wingFlapSpeed: FLIGHT_PARAMS.minWingFlapSpeed + Math.random() * (FLIGHT_PARAMS.maxWingFlapSpeed - FLIGHT_PARAMS.minWingFlapSpeed),
      wingFlapDirection: 1, // Direction of wing flapping
      xDirection: Math.random() > 0.5 ? 1 : -1, // Initial horizontal direction
      yDirection: Math.random() > 0.5 ? 1 : -1, // Initial vertical direction
      pathAmplitude: {
        x: 50 + Math.random() * 100, // Amplitude of horizontal sine wave
        y: 30 + Math.random() * 60, // Amplitude of vertical sine wave
      },
      pathFrequency: {
        x: 0.001 + Math.random() * 0.002, // Frequency of horizontal sine wave
        y: 0.001 + Math.random() * 0.002, // Frequency of vertical sine wave
      },
      pathProgress: Math.random() * 1000, // Starting point in the sine wave
      wingPattern: Math.floor(Math.random() * 3), // Random wing pattern
      restProbability: FLIGHT_PARAMS.minRestProbability + Math.random() * (FLIGHT_PARAMS.maxRestProbability - FLIGHT_PARAMS.minRestProbability),
      restTimer: 0, // Butterfly is initially in flight
      flutterIntensity: FLIGHT_PARAMS.minFlutterIntensity + Math.random() * (FLIGHT_PARAMS.maxFlutterIntensity - FLIGHT_PARAMS.minFlutterIntensity),
      zIndex: FLIGHT_PARAMS.minZIndex + Math.floor(Math.random() * (FLIGHT_PARAMS.maxZIndex - FLIGHT_PARAMS.minZIndex)),
    }));
    
    setButterflies(newButterflies);
  }, [count]);

  // Handle mouse movement for interactivity
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;

      setButterflies(prevButterflies => 
        prevButterflies.map(butterfly => {
          // Keep butterflies within bounds when window is resized
          return {
            ...butterfly,
            x: Math.min(butterfly.x, containerWidth),
            y: Math.min(butterfly.y, containerHeight),
          };
        })
      );
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (butterflies.length === 0) return;

    const updateButterflies = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const mouseRepelRadius = 180; // Radius around mouse that affects butterflies

      setButterflies(prevButterflies => 
        prevButterflies.map(butterfly => {
          let { 
            x, y, speed, rotation, pathProgress, xDirection, yDirection,
            wingFlapSpeed, pathAmplitude, pathFrequency,
            restProbability, restTimer, flutterIntensity
          } = butterfly;
          
          // Handle resting behavior
          if (restTimer > 0) {
            restTimer--;
            // Very slight movement even when resting (subtle wing flapping)
            pathProgress += 0.05;
            return {
              ...butterfly,
              restTimer,
              pathProgress
            };
          }
          
          // Check if butterfly should start resting
          if (Math.random() < restProbability) {
            restTimer = FLIGHT_PARAMS.minRestTime + Math.floor(Math.random() * (FLIGHT_PARAMS.maxRestTime - FLIGHT_PARAMS.minRestTime));
            // When resting, butterfly should face upward
            rotation = 0;
            return {
              ...butterfly, 
              restTimer,
              rotation
            };
          }

          // Update wing flapping animation for flying butterflies
          Math.sin(pathProgress * wingFlapSpeed) * 30 * flutterIntensity;
          
          // Calculate repulsion from mouse (if interactive)
          let repelX = 0;
          let repelY = 0;
          
          if (interactive && mousePosition) {
            const dx = x - mousePosition.x;
            const dy = y - mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRepelRadius) {
              // Normalize direction vector
              const factor = 1 - distance / mouseRepelRadius;
              repelX = (dx / distance) * factor * 7; // Stronger repulsion
              repelY = (dy / distance) * factor * 7;
              
              // Increase wing flap speed when near mouse
              wingFlapSpeed = Math.min(wingFlapSpeed * 1.5, 0.4);
              
              // More likely to change direction based on mouse position
              if (Math.random() < 0.15) {
                xDirection = dx > 0 ? 1 : -1;
                yDirection = dy > 0 ? 1 : -1;
              }
            }
          }
          
          // Update position with sine wave path
          pathProgress += speed;
          
          // Base movement direction with varying speed to simulate real butterflies
          const speedVariation = 0.8 + Math.sin(pathProgress * 0.05) * 0.2;
          x += speed * speedVariation * xDirection * 2 + repelX;
          y += speed * speedVariation * yDirection + repelY;
          
          // Add sine wave movement - more realistic with multiple frequencies
          x += Math.sin(pathProgress * pathFrequency.x) * pathAmplitude.x * 0.05;
          y += Math.sin(pathProgress * pathFrequency.y) * pathAmplitude.y * 0.05;
          y += Math.sin(pathProgress * pathFrequency.y * 2.7) * pathAmplitude.y * 0.02; // Secondary frequency
          
          // Calculate rotation based on movement direction with more natural easing
          const targetRotation = Math.atan2(
            Math.sin(pathProgress * pathFrequency.y) * pathAmplitude.y * 0.05 + yDirection,
            Math.sin(pathProgress * pathFrequency.x) * pathAmplitude.x * 0.05 + xDirection * 2
          ) * (180 / Math.PI);
          
          // Smoothly rotate toward movement direction with momentum effect
          const rotationEase = 0.03 + (Math.random() * 0.01); // Small random variance in rotation speed
          rotation = rotation + (targetRotation - rotation) * rotationEase;
          
          // Wrap around screen edges with a buffer
          const buffer = butterfly.size;
          if (x < -buffer) x = containerWidth + buffer;
          if (x > containerWidth + buffer) x = -buffer;
          if (y < -buffer) y = containerHeight + buffer;
          if (y > containerHeight + buffer) y = -buffer;
          
          // Occasionally change direction randomly with more natural frequency
          if (Math.random() < 0.003) {
            xDirection = -xDirection;
            // Small burst of speed on direction change
            pathProgress += 0.2;
          }
          if (Math.random() < 0.002) {
            yDirection = -yDirection;
          }
          
          // Occasionally change fluttering intensity for more natural movement
          if (Math.random() < 0.002) {
            flutterIntensity = FLIGHT_PARAMS.minFlutterIntensity + Math.random() * (FLIGHT_PARAMS.maxFlutterIntensity - FLIGHT_PARAMS.minFlutterIntensity);
          }
          
          return {
            ...butterfly,
            x,
            y,
            rotation,
            pathProgress,
            xDirection,
            yDirection,
            wingFlapSpeed,
            flutterIntensity
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(updateButterflies);
    };
    
    animationRef.current = requestAnimationFrame(updateButterflies);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [butterflies, mousePosition, interactive]);

  // Render wing patterns based on butterfly type
  const renderWingPattern = (butterfly: Butterfly, isLeftWing: boolean, isUpperWing: boolean) => {
    const { wingPattern, color, pathProgress, wingFlapSpeed, flutterIntensity, restTimer } = butterfly;
    const baseClass = `fill-${color}-${isLeftWing ? '300' : '400'} opacity-80`;
    const wingRotation = restTimer > 0 
      ? Math.sin(pathProgress * wingFlapSpeed) * 10 // Subtle movement when resting
      : Math.sin(pathProgress * wingFlapSpeed) * 30 * flutterIntensity;
    
    const patternTransform = isUpperWing 
      ? `rotate(${isLeftWing ? wingRotation : -wingRotation}deg)`
      : `rotate(${isLeftWing ? wingRotation : -wingRotation}deg)`;
      
    const patternOrigin = isUpperWing ? '12px 7px' : '12px 15px';
    
    // Determine pattern based on wingPattern value
    let patternPath;
    switch(wingPattern) {
      case 0: // Default pattern
        patternPath = isUpperWing
          ? "M12 4C10.5 1 8 2 8 4C8 6 10 7 12 7C10 7 8 6 8 4C8 2 10.5 1 12 4Z"
          : "M12 18C10.5 21 8 20 8 18C8 16 10 15 12 15C10 15 8 16 8 18C8 20 10.5 21 12 18Z";
        if (!isLeftWing) {
          patternPath = isUpperWing
            ? "M12 4C13.5 1 16 2 16 4C16 6 14 7 12 7C14 7 16 6 16 4C16 2 13.5 1 12 4Z"
            : "M12 18C13.5 21 16 20 16 18C16 16 14 15 12 15C14 15 16 16 16 18C16 20 13.5 21 12 18Z";
        }
        break;
      case 1: // Monarch-like pattern
        patternPath = isUpperWing
          ? "M12 4C10.5 1 8 2 8 4C8 6 10 7 12 7C10 7 8 6 8 4C8 2 10.5 1 12 4Z M9 3.5C9.5 3 10 3.2 10.5 3.7 M8.5 4.5C9 4 9.5 4.2 10 4.7"
          : "M12 18C10.5 21 8 20 8 18C8 16 10 15 12 15C10 15 8 16 8 18C8 20 10.5 21 12 18Z M9 17.5C9.5 17 10 17.2 10.5 17.7 M8.5 18.5C9 18 9.5 18.2 10 18.7";
        if (!isLeftWing) {
          patternPath = isUpperWing
            ? "M12 4C13.5 1 16 2 16 4C16 6 14 7 12 7C14 7 16 6 16 4C16 2 13.5 1 12 4Z M15 3.5C14.5 3 14 3.2 13.5 3.7 M15.5 4.5C15 4 14.5 4.2 14 4.7"
            : "M12 18C13.5 21 16 20 16 18C16 16 14 15 12 15C14 15 16 16 16 18C16 20 13.5 21 12 18Z M15 17.5C14.5 17 14 17.2 13.5 17.7 M15.5 18.5C15 18 14.5 18.2 14 18.7";
        }
        break;
      case 2: // Complex pattern
        patternPath = isUpperWing
          ? "M12 4C10.5 1 8 2 8 4C8 6 10 7 12 7C10 7 8 6 8 4C8 2 10.5 1 12 4Z M9 3C9.2 4 10 4.5 10.8 4.2 M10 2.5C10.5 3.5 11 4 11.5 3.8"
          : "M12 18C10.5 21 8 20 8 18C8 16 10 15 12 15C10 15 8 16 8 18C8 20 10.5 21 12 18Z M9 17C9.2 18 10 18.5 10.8 18.2 M10 16.5C10.5 17.5 11 18 11.5 17.8";
        if (!isLeftWing) {
          patternPath = isUpperWing
            ? "M12 4C13.5 1 16 2 16 4C16 6 14 7 12 7C14 7 16 6 16 4C16 2 13.5 1 12 4Z M15 3C14.8 4 14 4.5 13.2 4.2 M14 2.5C13.5 3.5 13 4 12.5 3.8"
            : "M12 18C13.5 21 16 20 16 18C16 16 14 15 12 15C14 15 16 16 16 18C16 20 13.5 21 12 18Z M15 17C14.8 18 14 18.5 13.2 18.2 M14 16.5C13.5 17.5 13 18 12.5 17.8";
        }
        break;
    }
    
    return (
      <path
        d={patternPath}
        className={baseClass}
        style={{
          transform: patternTransform,
          transformOrigin: patternOrigin,
          transition: 'transform 0.1s ease-out'
        }}
      />
    );
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ overflow: 'hidden' }}
    >
      {butterflies.map((butterfly) => (
        <div
          key={butterfly.id}
          className="absolute"
          style={{
            left: `${butterfly.x}px`,
            top: `${butterfly.y}px`,
            width: `${butterfly.size}px`,
            height: `${butterfly.size}px`,
            transform: `rotate(${butterfly.rotation}deg)`,
            transition: 'transform 0.2s ease-out',
            willChange: 'transform, left, top',
            zIndex: butterfly.zIndex
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            style={{ 
              filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))' 
            }}
          >
            {/* Left upper wing with pattern */}
            {renderWingPattern(butterfly, true, true)}
            
            {/* Right upper wing with pattern */}
            {renderWingPattern(butterfly, false, true)}
            
            {/* Body */}
            <path
              d="M12 7V18"
              stroke={`var(--${butterfly.color}-500)`}
              strokeWidth="0.7"
              strokeLinecap="round"
            />
            
            {/* Antenna */}
            <path
              d="M11.5 7C11 6 10.5 5.5 10 5 M12.5 7C13 6 13.5 5.5 14 5"
              stroke={`var(--${butterfly.color}-500)`}
              strokeWidth="0.3"
              strokeLinecap="round"
            />
            
            {/* Head */}
            <circle
              cx="12"
              cy="7"
              r="0.6"
              fill={`var(--${butterfly.color}-500)`}
            />
            
            {/* Left lower wing with pattern */}
            {renderWingPattern(butterfly, true, false)}
            
            {/* Right lower wing with pattern */}
            {renderWingPattern(butterfly, false, false)}
          </svg>
          
          {/* Cast shadow - only for flying butterflies */}
          {butterfly.restTimer <= 0 && (
            <div 
              className="absolute top-0 left-0 w-full h-full opacity-20"
              style={{ 
                transform: 'translateY(10px) scale(0.8, 0.2) rotateX(80deg)',
                filter: 'blur(4px)',
                zIndex: -1
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path d="M8 4C8 2 10.5 1 12 4C13.5 1 16 2 16 4C16 6 14 7 12 7C10 7 8 6 8 4Z" />
                <path d="M8 18C8 16 10 15 12 15C14 15 16 16 16 18C16 20 13.5 21 12 18C10.5 21 8 20 8 18Z" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ButterflyAnimation; 