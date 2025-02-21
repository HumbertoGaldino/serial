import React from "react";

interface ApprovalCircleProps {
  voteAverage: number;
}

const ApprovalCircle: React.FC<ApprovalCircleProps> = ({ voteAverage }) => {
  const percentage = voteAverage * 10;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 80 80">

        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="6"
          fill="transparent"
        />

        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={percentage >= 70 ? "#FFFE00" : "gray"}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
      </svg>

      <span className="absolute text-white text-lg font-bold">{Math.round(percentage)}%</span>
    </div>
  );
};

export default ApprovalCircle;
