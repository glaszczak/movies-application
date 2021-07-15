module.exports = {
  type: 'postgres',
  host: process.env.DOCKER_DB_HOST,
  port: process.env.DOCKER_DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.{js,ts}'],
  retryAttempts: 1,
  retryDelay: 3000,
  autoLoadEntities: true,
  synchronize: true,
};

