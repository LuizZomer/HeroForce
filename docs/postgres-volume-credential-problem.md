#### Resolução

1. Parar os containers em execução

```
docker-compose down
```

2. Remover o volume do PostgreSQL

Liste os volumes existentes para identificar o correto:

```
docker volume ls
```

Geralmente, no nosso caso, o volume se chama backend_pg_data.

Execute o comando abaixo para removê-lo:

```
docker volume rm backend_pg_data
```

⚠️ Atenção: isso apagará todos os dados do banco.
Utilize apenas em ambiente de desenvolvimento ou quando não precisar manter os dados existentes.

3. Recriar e subir os containers

```
docker-compose up -d --build
```
