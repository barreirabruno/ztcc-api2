module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker123",
  database: "postgres",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true
}