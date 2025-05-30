import mysql from "mysql2";

const connection: mysql.Connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "expense_tracker_db",
});

export function getUserByUsername(username: string) {
  connection.query(
    `SELECT * from USERS where username = "${username}" limit 1`,
    (err, results, fields) => {
      if (err) {
        console.log("Error in fetching data", err);
      } else {
        return results;
      }
    }
  );
}

export function getUserByEmail(email: string) {
  connection.query(
    `SELECT * from USERS where email = "${email}" limit 1`,
    (err, results, fields) => {
      if (err) {
        console.log("Error in fetching data", err);
      } else {
        return results;
      }
    }
  );
}

export function addNewUser(
  username: string,
  email: string,
  encryptedPassword: string
) {
  connection.query(
    `INSERT INTO USERS (username, email, password) values 
    ("${username}", "${email}", "${encryptedPassword}")`,
    (err, results, fields) => {
      if (err) {
        console.log("Error in inputting new user", err);
      } else {
        return "Successfully added user";
      }
    }
  );
}

