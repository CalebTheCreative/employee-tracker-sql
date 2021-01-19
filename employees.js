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

connection.connect(function (err) {
    if (err) throw err;
    mainMenu();
});

function mainMenu() {
    inquirer.prompt({
      name: 'mainOptions',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
          'Add Employee',
          'Search For Employee',
          'Update Employee Role',
          'Add Role',
          'Add Department',
          'View All Employees',
          'View All Roles',
          'View All Departments',
          'Quit'
      ]
    }).then(function(answer) {
        switch (answer.mainOptions) {
            case 'Add Employee':
                addEmployee();
                break;

            case 'Search For Employee':
                searchEmployee();
                break;

            case 'Update Employee Role':
                updateRole();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'Add Department':
                addDept();
                break;

            case 'View All Employees':
                viewEmployees();
                break;

            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Departments':
                viewDepts();
                break;
            case 'Quit':
                finish();
        }
    });
}

function addEmployee() {

}

function searchEmployee() {

}

function updateRole() {

}

function addRole() {

}

function addDept() {

}

function viewEmployees() {

}

function viewRoles() {
    
}

function viewDepts() {

}

