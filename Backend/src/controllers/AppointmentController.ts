import { FastifyRequest, FastifyReply } from 'fastify';
import { AppointmentModel } from '../models/AppointmentModel';

/**
 * AppointmentController — Camada Controller do MVC.
 * Responsabilidades: validar request, delegar ao Model, formatar response.
 * NÃO acessa o Prisma diretamente.
 */
export class AppointmentController {
  /** GET /appointments — Lista todos os agendamentos */
  async list(
    request: FastifyRequest<{ Querystring: { date?: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { date } = request.query;
      const appointments = date
        ? await AppointmentModel.findByDate(date)
        : await AppointmentModel.findAll();
      return reply.send(appointments);
    } catch (error) {
      console.error('[AppointmentController.list]', error);
      return reply.status(500).send({ error: 'Erro ao listar agendamentos' });
    }
  }

  /** POST /appointments — Cria um novo agendamento */
  async create(
    request: FastifyRequest<{ Body: { clientName: string; date: string; time: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { clientName, date, time } = request.body;

      // Validação dos campos obrigatórios
      if (!clientName || !date || !time) {
        return reply.status(400).send({
          error: 'Nome do cliente, data e horário são obrigatórios',
        });
      }

      // Regra de negócio: não permitir duplicidade de horário na mesma data
      const alreadyBooked = await AppointmentModel.existsByDateTime(date, time);
      if (alreadyBooked) {
        return reply.status(409).send({
          error: 'Já existe um agendamento nesse horário para essa data',
        });
      }

      const appointment = await AppointmentModel.create({ clientName, date, time });
      return reply.status(201).send(appointment);
    } catch (error) {
      console.error('[AppointmentController.create]', error);
      return reply.status(500).send({ error: 'Erro ao criar agendamento' });
    }
  }

  /** DELETE /appointments/:id — Remove um agendamento */
  async remove(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      // Verifica se o agendamento existe antes de deletar
      const exists = await AppointmentModel.findById(id);
      if (!exists) {
        return reply.status(404).send({ error: 'Agendamento não encontrado' });
      }

      await AppointmentModel.deleteById(id);
      return reply.status(204).send();
    } catch (error) {
      console.error('[AppointmentController.remove]', error);
      return reply.status(500).send({ error: 'Erro ao deletar agendamento' });
    }
  }
}
