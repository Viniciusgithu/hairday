import { FastifyInstance } from 'fastify';
import { AppointmentController } from '../controllers/AppointmentController';

/**
 * Plugin de rotas do Fastify para a entidade Appointment.
 */
export async function appointmentRoutes(app: FastifyInstance) {
  const controller = new AppointmentController();

  app.get('/appointments', controller.list);
  app.post('/appointments', controller.create);
  app.delete('/appointments/:id', controller.remove);
}
