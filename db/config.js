import pkg from "pg";

const { Pool } = pkg;

const client = new Pool({
  user: "postgres",
  database: "bot",
  port: 5432,
  host: "localhost",
  password: "0007",
});

client.connect();

export default client;
