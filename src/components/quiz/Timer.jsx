import { useEffect } from 'react';

const Timer = ({ timeLeft, onTimeUp }) => {
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className="flex items-center space-x-2">
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span className="font-mono text-lg font-semibold">
        {timeLeft}s
      </span>
    </div>
  );
};

export default Timer;