import { Trash } from '@phosphor-icons/react';

interface ScheduleCardProps {
  id: string;
  time: string;
  clientName: string;
  onRemove: (id: string) => void;
}

export function ScheduleCard({ id, time, clientName, onRemove }: ScheduleCardProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700 last:border-0 group">
      <div className="flex items-center gap-6">
        <span className="font-bold text-gray-100">{time}</span>
        <span className="text-gray-100">{clientName}</span>
      </div>
      <button 
        onClick={() => onRemove(id)}
        className="text-gray-400 hover:text-yellow transition-colors duration-200"
        title="Remover agendamento"
      >
        <Trash size={20} />
      </button>
    </div>
  );
}
