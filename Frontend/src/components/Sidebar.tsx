import React, { useState } from 'react';
import { CalendarBlank, User } from '@phosphor-icons/react';
import { Input } from './Input';
import { Button } from './Button';
import { TimeSelect } from './TimeSelect';

interface SidebarProps {
  onAddAppointment: (date: string, time: string, clientName: string) => void;
  appointments: { id: string; clientName: string; date: string; time: string }[];
}

const MORNING_TIMES = ['09:00', '10:00', '11:00', '12:00'];
const AFTERNOON_TIMES = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const EVENING_TIMES = ['19:00', '20:00', '21:00'];

export function Sidebar({ onAddAppointment, appointments }: SidebarProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [clientName, setClientName] = useState('');

  // Pega os agendamentos já marcados para a data selecionada no formulário
  const appointmentsForSelectedDate = appointments.filter(app => app.date === date);
  const bookedTimes = appointmentsForSelectedDate.map(app => app.time);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !clientName) return;
    
    onAddAppointment(date, time, clientName);
    
    // Limpar o formulário
    setTime('');
    setClientName('');
  };

  const renderTimeGroup = (title: string, times: string[]) => (
    <div className="mb-6">
      <h3 className="text-gray-300 text-sm mb-3 border-b border-gray-700 pb-2">{title}</h3>
      <div className="grid grid-cols-4 gap-2">
        {times.map((t) => (
          <TimeSelect
            key={t}
            time={t}
            selected={time === t}
            disabled={!date || bookedTimes.includes(t)}
            onClick={() => setTime(t)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-full lg:w-[400px] bg-gray-800 rounded-2xl p-8 flex flex-col gap-10">
      <div className="flex items-center gap-2">
        <h1 className="text-yellow font-bold text-2xl flex items-center gap-2">
          HairDay 
          <span className="text-yellow text-sm font-normal">✂</span>
        </h1>
      </div>

      <div>
        <h2 className="text-gray-100 font-bold text-3xl mb-2">Agende um atendimento</h2>
        <p className="text-gray-300 text-sm">Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 text-sm font-bold">Data</label>
          <Input 
            type="date" 
            icon={<CalendarBlank size={20} />} 
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setTime(''); // reset time when date changes
            }}
            required
            className="[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>

        <div>
          <label className="text-gray-300 text-sm font-bold block mb-4">Horários</label>
          {renderTimeGroup('Manhã', MORNING_TIMES)}
          {renderTimeGroup('Tarde', AFTERNOON_TIMES)}
          {renderTimeGroup('Noite', EVENING_TIMES)}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-300 text-sm font-bold">Cliente</label>
          <Input 
            type="text" 
            placeholder="Nome do cliente"
            icon={<User size={20} />} 
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={!date || !time || !clientName}>
          Agendar
        </Button>
      </form>
    </aside>
  );
}
