import React from "react";

interface ProgressBarProps {
  width: string;
}

const ProgressBar = ({ width }) => {
  return (
    <div className="fixed bottom-0 w-full">
      <div
        className="bg-emerald text-xs leading-none py-1 text-center text-white"
        style={{ width }}
      >
        {width}
      </div>
    </div>
  );
};

export default ProgressBar;
