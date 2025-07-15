> https://docs.nestjs.com/techniques/performance

# Nest + Fastify

To use Fastify with NestJS, you need to install the Fastify platform adapter for NestJS. You can do this by running the following command:

```bash
# Create a project in the current dir
nest new .
# install fastify platform
npm i --save @nestjs/platform-fastify
# to remove express
npm uninstall @nestjs/platform-express @types/express
```

Adapter
Once the Fastify platform is installed, we can use the FastifyAdapter.
Update the `main.ts` file in your NestJS project to use the FastifyAdapter:

```typescript
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

By default, Fastify listens only on the localhost 127.0.0.1 interface (read more). If you want to accept connections on other hosts, you should specify '0.0.0.0' in the listen() call:

```typescript
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000, '0.0.0.0');
}
```

If you get error in line edit, run

```bash
npm run format
```

Installing and generating files

```bash
npm i --save class-validator class-transformer # for validation
nest generate module module-name # generating modules
nest g controller controller-name # creates a controller
nest g service service-name # creates a service
nest g resource resource-name # create a whole resource(module,controller,service,)
nest g guard guard-name # installing a guard(for authorization)
```