export interface Appointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
}

const API_URL = 'http://localhost:3333';

/**
 * Busca todos os agendamentos ou filtra por data específica.
 */
export async function fetchAppointments(date?: string): Promise<Appointment[]> {
  const url = date ? `${API_URL}/appointments?date=${date}` : `${API_URL}/appointments`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erro ao buscar agendamentos');
  }
  return response.json();
}

/**
 * Cria um novo agendamento na API.
 */
export async function createAppointment(data: { clientName: string; date: string; time: string }): Promise<Appointment> {
  const response = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Erro ao criar agendamento');
  }

  return response.json();
}

/**
 * Deleta um agendamento da API pelo ID.
 */
export async function deleteAppointment(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Erro ao deletar agendamento');
  }
}
