import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../../../core/entities/*.entity.{ts,js}'],
  synchronize: true,
});
