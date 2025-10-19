# 🧩 Backend Architecture Overview

Este documento apresenta uma visão geral da arquitetura, padrões e bibliotecas utilizadas no backend deste projeto. O objetivo é fornecer uma referência clara para desenvolvedores que desejam entender ou contribuir com o código.

---

## 🏗️ Arquitetura

O projeto segue o **padrão modular e em camadas inspirado no Domain-Driven Design (DDD)**, implementado sobre o **framework NestJS**.  
A estrutura é pensada para garantir **alta coesão**, **baixo acoplamento** e **facilidade de manutenção**.

### 🧱 Estrutura de Pastas

```
src/
├── app.module.ts
├── main.ts
├── config/
│   └── database/
│       ├── database.config.ts
│       ├── databse.module.ts
│       └── seed/
│           ├── data-source.ts
│           └── data/
├── core/
│   ├── entities/
│   └── object-value/
├── modules/
│   ├── auth/
│   │   ├── domain/
│   │   │   └── use-cases/
│   │   ├── presentation/
│   │   │   └── controllers/
│   │   └── strategies/
│   └── projects/
│       ├── domains/
│       │   └── use-cases/
│       └── presentation/
└── ...
```

### 🧠 Conceitos-Chave

- **Domain**: contém a lógica de negócio pura, expressa através de _use-cases_.
- **Entities / Object Values**: representam objetos de domínio e enums imutáveis.
- **Presentation Layer**: controla as rotas e recebe as requisições HTTP.
- **Strategies (Auth)**: contém a lógica de autenticação via Passport (JWT e Local).
- **Config Layer**: gerencia variáveis de ambiente, conexões e seeds do banco.
- **Core**: núcleo com entidades reutilizáveis e regras globais.

---

## ⚙️ Tecnologias e Bibliotecas

Principais dependências utilizadas:

### 🧩 Produção

- **@nestjs/typeorm & pg** – ORM e driver PostgreSQL.
- **@nestjs/jwt, passport, passport-jwt, passport-local** – Autenticação e segurança.
- **class-validator & class-transformer** – Validação e transformação de DTOs.
- **helmet & cookie-parser** – Middleware de segurança e manipulação de cookies.
- **@nestjs/swagger & swagger-ui-express** – Documentação da API.

### 🧪 Desenvolvimento

- **typescript, ts-node, ts-jest, jest, supertest** – Suporte a TypeScript e testes.
- **eslint, prettier, eslint-config-prettier, eslint-plugin-prettier** – Padronização de código.
- **@nestjs/cli, @swc/core, @swc/cli** – Compilação e scaffolding.

---

### 🧪 Rodar Testes

```bash
npm run test
```

---

## 🗄️ Banco de Dados

O projeto utiliza **TypeORM** com **PostgreSQL**.  
Os scripts de _seed_ estão em:

```
src/config/database/seed/
```

O arquivo `data-source.ts` define a configuração de conexão e inicialização dos dados.

---

## 🔐 Autenticação

A autenticação utiliza **Passport** com duas estratégias:

- **LocalStrategy** → autenticação via email/senha.
- **JwtStrategy** → validação de tokens JWT nas rotas protegidas.

## A assinatura e validação dos tokens estão centralizadas nos _use-cases_ de `auth/domain/use-cases`.
