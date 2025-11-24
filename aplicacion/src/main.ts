import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  // Conectar microservicio RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'user_events',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices(); // Importante para que los EventPattern funcionen
  await app.listen(3001, '0.0.0.0');

  console.log('Auth API running on port 3001');
  console.log("Starting backend:", process.env.BACKEND_NAME);
  
}
bootstrap();
