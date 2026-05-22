

interface TimeSelectProps {
  time: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function TimeSelect({ time, selected, disabled, onClick }: TimeSelectProps) {
  let baseClasses = "flex items-center justify-center py-2 px-3 rounded-lg border text-sm font-bold transition-colors duration-200";
  
  let stateClasses = "bg-transparent text-gray-300 border-gray-700 hover:bg-gray-700 cursor-pointer";

  if (selected) {
    stateClasses = "bg-gray-600 text-yellow border-yellow cursor-default";
  } else if (disabled) {
    stateClasses = "bg-transparent text-gray-300 border-gray-700 opacity-40 cursor-not-allowed hover:bg-transparent";
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${stateClasses}`}
    >
      {time}
    </button>
  );
}
