> https://docs.nestjs.com/techniques/performance

# Nest + Fastify

This guide shows how to set up a NestJS project using Fastify as the HTTP platform instead of the default Express, and explains how a NestJS project is organized for developers coming from frameworks like Spring Boot.

---

## 🚀 Getting Started

### 1. Create a New Project

```bash
# Create a new NestJS project in the current directory
nest new .
```

### 2. Install Fastify Platform

```bash
npm i --save @nestjs/platform-fastify
```

### 3. Remove Express (Optional, but recommended)

```bash
npm uninstall @nestjs/platform-express @types/express
```

---

## ⚡ Using FastifyAdapter

Update your `main.ts` file to use the Fastify adapter:

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
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

**Note:**  
By default, Fastify listens only on the localhost `127.0.0.1` interface.  
If you want to accept connections on other hosts, specify `'0.0.0.0'` in the `listen()` call:

```typescript
await app.listen(3000, '0.0.0.0');
```

---

## 🛠 Formatting

If you get line ending errors (e.g., `Delete ␍`), run:

```bash
npm run format
```

---

## 🧰 Useful CLI Commands

```bash
npm i --save class-validator class-transformer   # For validation
nest generate module module-name                 # Generate a module
nest g controller controller-name                # Create a controller
nest g service service-name                      # Create a service
nest g resource resource-name                    # Create a resource (module, controller, service, etc.)
nest g guard guard-name                          # Create a guard (for authorization)
```

---

# 📦 How NestJS Projects Are Organized

If you’re coming from Spring Boot, you’ll find many familiar concepts, but with NestJS’s own patterns and terminology.

## 1. **Core Concepts**

- **Modules**:  
  - The main organizational unit in NestJS (like a feature package in Spring Boot).
  - Each feature (e.g., User, Auth) gets its own module (`user.module.ts`).
  - Modules group related controllers, services, and providers.
  - Modules can import and export providers to share functionality.

- **Controllers**:  
  - Handle incoming HTTP requests (like Spring’s `@RestController`).
  - Route requests to the appropriate service methods.

- **Services**:  
  - Contain business logic (like Spring’s `@Service`).
  - Can be injected into controllers or other services.

- **Providers**:  
  - Any class that can be injected (services, repositories, etc.).

- **Repositories**:  
  - Not built-in, but you can create repository classes or use TypeORM/Mongoose repositories for DB access (like Spring Data JPA).

---

## 2. **Entities, Models, Enums, and Types**

- **Entities/Models**:  
  - Store in a folder like `src/user/entities/user.entity.ts` or `src/entities/`.
  - Used with ORMs (TypeORM, Sequelize, etc.) to map to DB tables.

- **Enums**:  
  - Place in `src/common/enums/` or within the relevant module.

- **Types/Interfaces**:  
  - Place in `src/common/types/` or `src/user/types/`.
  - Useful for DTOs, request/response shapes, etc.
  - In backend, you often use entities/models directly for type safety.

---

## 3. **Module Communication & Dependency Injection**

- **Injecting Services**:  
  - Use Nest’s dependency injection (constructor injection, like Spring).
  - To use a service from another module, export it in the provider module and import that module where needed.

**Example:**
```typescript
// user.module.ts
@Module({
  providers: [UserService],
  exports: [UserService], // Export to make available to other modules
})
export class UserModule {}

// auth.module.ts
@Module({
  imports: [UserModule], // Import to use UserService
})
export class AuthModule {}
```

---

## 4. **Typical Folder Structure**

```
src/
  user/
    user.controller.ts
    user.service.ts
    user.module.ts
    entities/
      user.entity.ts
    dto/
      create-user.dto.ts
    enums/
      user-role.enum.ts
  auth/
    ...
  common/
    enums/
    types/
    guards/
  main.ts
```

---

## 5. **Request Flow Example**

1. **Request** hits a route in a **Controller**.
2. **Controller** calls a method in a **Service**.
3. **Service** may use a **Repository** (or ORM entity) to access the DB.
4. **Service** returns data to the **Controller**, which sends a response.

---

## 6. **Best Practices**

- Always export providers you want to use in other modules.
- Use DTOs for validation and type safety.
- Use `@Injectable()` for services/providers.
- Use the CLI to generate modules, controllers, services, guards, etc. for consistency.

---

## 📚 References

- [NestJS Performance Techniques](https://docs.nestjs.com/techniques/performance)
- [NestJS CLI Documentation](https://docs.nestjs.com/cli/overview)
- [Fastify Platform Adapter](https://docs.nestjs.com/techniques/performance#fastify)