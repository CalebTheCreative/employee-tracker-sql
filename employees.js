// Dependencies
// =============================================================
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// MySQL Server Initiation
// =============================================================
const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "employee_db"
  });