import { useState, useEffect } from 'react';
import { CalendarBlank, Sun, CloudSun, Moon } from '@phosphor-icons/react';
import { Sidebar } from './components/Sidebar';
import { Input } from './components/Input';
import { ScheduleCard } from './components/ScheduleCard';
import { fetchAppointments, createAppointment, deleteAppointment } from './services/api';
import type { Appointment } from './services/api';

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // Use today's date as default (YYYY-MM-DD format)
  const today = new Date().toISOString().split('T')[0];
  const [selectedGlobalDate, setSelectedGlobalDate] = useState(today);
  const [error, setError] = useState<string | null>(null);

  // Carrega todos os agendamentos do backend
  const loadAppointments = async () => {
    try {
      setError(null);
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (err: any) {
      console.error(err);
      setError('Erro ao carregar agendamentos do servidor.');
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleAddAppointment = async (date: string, time: string, clientName: string) => {
    try {
      setError(null);
      await createAppointment({ date, time, clientName });
      await loadAppointments();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao realizar agendamento.');
    }
  };

  const handleRemoveAppointment = async (id: string) => {
    try {
      setError(null);
      await deleteAppointment(id);
      await loadAppointments();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao remover agendamento.');
    }
  };

  // Filter appointments by selected date and sort by time
  const currentAppointments = appointments
    .filter(app => app.date === selectedGlobalDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Helper to filter by time period
  const filterByPeriod = (apps: Appointment[], startHour: number, endHour: number) => {
    return apps.filter(app => {
      const hour = parseInt(app.time.split(':')[0], 10);
      return hour >= startHour && hour <= endHour;
    });
  };

  const morningAppointments = filterByPeriod(currentAppointments, 9, 12);
  const afternoonAppointments = filterByPeriod(currentAppointments, 13, 18);
  const eveningAppointments = filterByPeriod(currentAppointments, 19, 21);

  const renderSection = (title: string, icon: React.ReactNode, apps: Appointment[]) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-4 mb-4 text-gray-300">
        <span className="text-yellow">{icon}</span>
        <h3 className="font-bold">{title}</h3>
        <span className="ml-auto text-sm">
          {apps.length > 0 ? (
             title === 'Manhã' ? '09h-12h' : title === 'Tarde' ? '13h-18h' : '19h-21h' 
             // Ajuste no layout para colocar a label do horário conforme os specs
          ) : ''}
        </span>
      </div>
      
      {apps.length === 0 ? (
        <p className="text-gray-400 text-sm mt-4">Você ainda não tem agendamentos cadastrados nesse período.</p>
      ) : (
        <div className="flex flex-col">
          {apps.map(app => (
            <ScheduleCard 
              key={app.id} 
              id={app.id} 
              time={app.time} 
              clientName={app.clientName} 
              onRemove={handleRemoveAppointment} 
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-8 flex flex-col lg:flex-row gap-12 max-w-[1200px] mx-auto">
      <Sidebar 
        onAddAppointment={handleAddAppointment} 
        appointments={appointments} 
      />

      <main className="flex-1 py-4">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-gray-100 font-bold text-3xl mb-2">Sua agenda</h2>
            <p className="text-gray-300 text-sm">Consulte os seus cortes de cabelo agendados por dia</p>
          </div>
          
          <div className="w-full sm:w-48">
            <Input 
              type="date" 
              icon={<CalendarBlank size={20} />} 
              value={selectedGlobalDate}
              onChange={(e) => setSelectedGlobalDate(e.target.value)}
              className="[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>
        </header>

        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-200 text-sm p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div>
          {renderSection('Manhã', <Sun size={24} />, morningAppointments)}
          {renderSection('Tarde', <CloudSun size={24} />, afternoonAppointments)}
          {renderSection('Noite', <Moon size={24} />, eveningAppointments)}
        </div>
      </main>
    </div>
  );
}

export default App;
