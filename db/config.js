import pkg from "pg";

const { Pool } = pkg;

const client = new Pool({
    connectionString:
      "postgres://bot_o128_user:jDtrMZdLHHDNiq1FgBrmhJehyYTfVW5D@dpg-ckjoaocl4vmc73a627v0-a.oregon-postgres.render.com/bot_o128",
    ssl: {
      rejectUnauthorized: false,
      ca: "",
    },
  });
  
  client.on('error', (err) => {
    console.log(err.message)
 });

  
  export default client;