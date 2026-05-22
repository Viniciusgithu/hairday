import { prisma } from './prismaClient';

/**
 * AppointmentModel — Camada Model do MVC.
 * Encapsula todas as operações de dados da entidade Appointment.
 * O Controller NUNCA deve acessar o Prisma diretamente.
 */
export class AppointmentModel {
  /**
   * Retorna todos os agendamentos, ordenados por data e horário.
   */
  static async findAll() {
    return prisma.appointment.findMany({
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });
  }

  /**
   * Retorna agendamentos filtrados por data.
   */
  static async findByDate(date: string) {
    return prisma.appointment.findMany({
      where: { date },
      orderBy: { time: 'asc' },
    });
  }

  /**
   * Busca um agendamento pelo ID.
   */
  static async findById(id: string) {
    return prisma.appointment.findUnique({
      where: { id },
    });
  }

  /**
   * Verifica se já existe um agendamento no mesmo horário e data.
   */
  static async existsByDateTime(date: string, time: string) {
    const existing = await prisma.appointment.findFirst({
      where: { date, time },
    });
    return !!existing;
  }

  /**
   * Cria um novo agendamento.
   */
  static async create(data: { clientName: string; date: string; time: string }) {
    return prisma.appointment.create({ data });
  }

  /**
   * Deleta um agendamento pelo ID.
   */
  static async deleteById(id: string) {
    return prisma.appointment.delete({
      where: { id },
    });
  }
}
