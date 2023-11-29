const { createConnection } = require("mysql");
const connection = createConnection({
  host: "aberama.iran.liara.ir",
  user: "root",
  password: "omjS9C0GAVuykcW6YUQX0rce",
  port: 34914,
  database: "pedantic_ride",
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }

  console.log("Connected as id", connection.getConnectionId());
});
