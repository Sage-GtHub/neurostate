import { useEffect, useState } from 'react';

interface AnimatedNeuronProps {
  className?: string;
  color?: string;
  pulseDelay?: number;
}

const AnimatedNeuron = ({ className = '', color = '#8b5cf6', pulseDelay = 0 }: AnimatedNeuronProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className}`}
      style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))' }}
    >
      <defs>
        {/* Gradient for soma */}
        <radialGradient id={`somaGradient-${pulseDelay}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="70%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </radialGradient>

        {/* Glow filter */}
        <filter id={`glow-${pulseDelay}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Synapse glow */}
        <filter id={`synapseGlow-${pulseDelay}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dendrites - branching input structures */}
      <g stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" filter={`url(#glow-${pulseDelay})`}>
        {/* Upper left dendrite branch */}
        <path d="M50,50 Q35,35 20,25">
          <animate
            attributeName="stroke-opacity"
            values="0.4;0.8;0.4"
            dur="2s"
            repeatCount="indefinite"
            begin={`${pulseDelay}ms`}
          />
        </path>
        <path d="M30,32 Q22,28 15,35" />
        <path d="M35,35 Q28,25 18,20" />
        
        {/* Upper right dendrite branch */}
        <path d="M50,50 Q65,35 80,28">
          <animate
            attributeName="stroke-opacity"
            values="0.4;0.8;0.4"
            dur="2.3s"
            repeatCount="indefinite"
            begin={`${pulseDelay + 200}ms`}
          />
        </path>
        <path d="M68,35 Q75,28 85,32" />
        <path d="M72,38 Q80,30 88,25" />

        {/* Lower left dendrite */}
        <path d="M50,50 Q30,55 18,70">
          <animate
            attributeName="stroke-opacity"
            values="0.4;0.8;0.4"
            dur="1.8s"
            repeatCount="indefinite"
            begin={`${pulseDelay + 400}ms`}
          />
        </path>
        <path d="M25,60 Q18,65 12,62" />
      </g>

      {/* Axon - main output pathway */}
      <g stroke={color} strokeWidth="2" fill="none" opacity="0.7" filter={`url(#glow-${pulseDelay})`}>
        <path d="M50,50 Q55,65 50,80 Q48,88 55,95">
          <animate
            attributeName="stroke-dasharray"
            values="0,100;50,50;100,0"
            dur="1.5s"
            repeatCount="indefinite"
            begin={`${pulseDelay}ms`}
          />
        </path>
        
        {/* Axon terminals */}
        <path d="M55,95 Q60,98 65,95" />
        <path d="M55,95 Q50,100 45,97" />
        <path d="M55,95 Q58,102 62,105" />
      </g>

      {/* Central soma (cell body) */}
      <circle
        cx="50"
        cy="50"
        r="12"
        fill={`url(#somaGradient-${pulseDelay})`}
        filter={`url(#glow-${pulseDelay})`}
      >
        <animate
          attributeName="r"
          values="11;13;11"
          dur="2s"
          repeatCount="indefinite"
          begin={`${pulseDelay}ms`}
        />
      </circle>

      {/* Nucleus */}
      <circle cx="50" cy="50" r="5" fill={color} opacity="0.9">
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.5s"
          repeatCount="indefinite"
          begin={`${pulseDelay}ms`}
        />
      </circle>

      {/* Firing synapses - animated dots traveling along dendrites */}
      {isClient && (
        <g filter={`url(#synapseGlow-${pulseDelay})`}>
          {/* Synapse 1 - upper left */}
          <circle r="2.5" fill={color}>
            <animateMotion
              path="M20,25 Q35,35 50,50"
              dur="1.2s"
              repeatCount="indefinite"
              begin={`${pulseDelay}ms`}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="1.2s"
              repeatCount="indefinite"
              begin={`${pulseDelay}ms`}
            />
            <animate
              attributeName="r"
              values="1.5;3;1.5"
              dur="1.2s"
              repeatCount="indefinite"
              begin={`${pulseDelay}ms`}
            />
          </circle>

          {/* Synapse 2 - upper right */}
          <circle r="2" fill={color}>
            <animateMotion
              path="M80,28 Q65,35 50,50"
              dur="1.5s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 300}ms`}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="1.5s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 300}ms`}
            />
          </circle>

          {/* Synapse 3 - lower left */}
          <circle r="2" fill={color}>
            <animateMotion
              path="M18,70 Q30,55 50,50"
              dur="1.8s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 600}ms`}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="1.8s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 600}ms`}
            />
          </circle>

          {/* Output signal - traveling down axon */}
          <circle r="3" fill={color}>
            <animateMotion
              path="M50,50 Q55,65 50,80 Q48,88 55,95"
              dur="1s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 100}ms`}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0.5;0"
              dur="1s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 100}ms`}
            />
            <animate
              attributeName="r"
              values="2;3.5;2"
              dur="1s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 100}ms`}
            />
          </circle>

          {/* Secondary output signals */}
          <circle r="2" fill={color}>
            <animateMotion
              path="M55,95 Q60,98 65,95"
              dur="0.5s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 1100}ms`}
            />
            <animate
              attributeName="opacity"
              values="0.8;0"
              dur="0.5s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 1100}ms`}
            />
          </circle>

          <circle r="2" fill={color}>
            <animateMotion
              path="M55,95 Q50,100 45,97"
              dur="0.5s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 1150}ms`}
            />
            <animate
              attributeName="opacity"
              values="0.8;0"
              dur="0.5s"
              repeatCount="indefinite"
              begin={`${pulseDelay + 1150}ms`}
            />
          </circle>
        </g>
      )}

      {/* Membrane potential rings */}
      <circle
        cx="50"
        cy="50"
        r="18"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          values="15;22;15"
          dur="2s"
          repeatCount="indefinite"
          begin={`${pulseDelay}ms`}
        />
        <animate
          attributeName="opacity"
          values="0.5;0;0.5"
          dur="2s"
          repeatCount="indefinite"
          begin={`${pulseDelay}ms`}
        />
      </circle>

      <circle
        cx="50"
        cy="50"
        r="25"
        fill="none"
        stroke={color}
        strokeWidth="0.3"
        opacity="0.2"
      >
        <animate
          attributeName="r"
          values="20;30;20"
          dur="2.5s"
          repeatCount="indefinite"
          begin={`${pulseDelay + 500}ms`}
        />
        <animate
          attributeName="opacity"
          values="0.3;0;0.3"
          dur="2.5s"
          repeatCount="indefinite"
          begin={`${pulseDelay + 500}ms`}
        />
      </circle>
    </svg>
  );
};

export default AnimatedNeuron;
