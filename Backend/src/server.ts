import fastify from 'fastify';
import cors from '@fastify/cors';
import { appointmentRoutes } from './routes/appointments';

const app = fastify({ logger: true });

app.register(cors, {
  origin: true, // Em produção, colocar a URL do frontend
});

// Registra as rotas
app.register(appointmentRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' });
    console.log('Servidor rodando na porta 3333!');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
