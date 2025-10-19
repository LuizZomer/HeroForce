# 🌐 Full Stack Project Overview

Este projeto é composto por duas aplicações — um Frontend e um Backend — que funcionam em conjunto.

O objetivo deste guia é ensinar como executar o projeto completo do zero em seu ambiente local.

🧭 Para mais detalhes sobre o Frontend: [frontend/README.md](frontend/README.md)

🧭 Para mais detalhes sobre o Backend: [backend/README.md](backend/README.md)

## 🚀 Passo a Passo para Rodar o Projeto

### 1️⃣ Clonar o Repositório

```
git clone https://github.com/LuizZomer/HeroForce.git
cd HeroForce
```

### 2️⃣ Configurar .env do backend

Acesse a pasta do backend e crie a .env com base na .env.example:

```
cd backend
```

Considerações:

- Se você colocar NODE_ENV como production ele não irá criar as tabelas automaticamente, a recomendação é ser development
- Na .env.example tanto DB_HOST quanto DB_PORT já estão recomendando o padrão para conectar no container postgres

### 3️⃣ Subir o Backend com Docker

Inicie o container:

```
docker-compose up --build
```

ou 

```
docker-compose up -d --build # Para não prender o terminal
```

Isso irá:

- Criar o banco de dados PostgreSQL
- Criar e rodar o container da API NestJS
- Configurar a rede entre os serviços

#### Atenção

Caso você já tenha criado um container com alguma credencial e tente alterá-la criando outro, pode se deparar com o seguinte erro:

```
ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
error: password authentication failed for user "user"
```

Isso ocorre porque o PostgreSQL dentro do Docker mantém as credenciais no volume persistente.
Mesmo que você altere as variáveis de ambiente (DB_USERNAME, DB_PASSWORD, DB_DATABASE) no .env, o container continuará tentando usar os dados antigos já gravados.

📘 Consulte a documentação de resolução em:

[Resolução](docs/postgres-volume-credential-problem.md)

### 4️⃣ Rodar a Seed do Banco de Dados

Com o container do backend em execução, abra outro terminal e rode:

```
npm run seed
```



💡 Esse comando popula o banco de dados com dados iniciais para facilitar os testes.

### 5️⃣ Configurar .env do frontend 

Agora vá até a pasta do frontend e crie a .env com base na .env.example:

```
cd ../frontend
```

### 6️⃣ Subir o Frontend com Docker

Inicie o container:

```
docker-compose up --build
```

### Após seguir todos os passos:

- O backend estará ativo com banco de dados configurado.
- O frontend consumirá a API automaticamente.
- O sistema estará disponível localmente, pronto para uso e desenvolvimento.

