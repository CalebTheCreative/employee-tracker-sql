// Dependencies
// =============================================================
const mysql = require("mysql");
const inquirer = require("inquirer");
// const consoleTable = require("console.table");

// MySQL Server Initiation
// =============================================================
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Hookem13",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    mainMenu();
});

// Questions
// =============================================================
function mainMenu() {
    inquirer
        .prompt({
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
        }).then(function (answer) {
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

// Function to add an employee
function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'First Name: '
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'Last Name: '
                },
                {
                    name: 'empRole',
                    type: 'list',
                    message: 'Role: ',
                    choices: function () {
                        let options = [];

                        for (let i = 0; i < res.length; i++) {
                            options.push(res[i].title);
                        }

                        return options;
                    }
                }
            ]).then(function (answer) {
                let query = "SELECT * FROM role WHERE ?";
                let query2 = "INSERT INTO employee SET ?";

                connection.query(query, { title: answer.empRole }, function (err, res) {
                    if (err) throw err;
                    connection.query(query2, {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: res[0].id
                    });
                    console.log("\nEmployee successfully added!");
                });
                mainMenu();
            });
    });
}

// function searchEmployee() {

// }

// function updateRole() {

// }

function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'roleName',
                    type: 'input',
                    message: 'New Role Title: '
                },
                {
                    name: 'roleSalary',
                    type: 'input',
                    message: 'New Role Salary: '
                },
                {
                    name: 'roleDept',
                    type: 'list',
                    message: 'New Role Department: ',
                    choices: function () {
                        let options = [];

                        for (let i = 0; i < res.length; i++) {
                            options.push(res[i].name);
                        }

                        return options;
                    }
                }
            ]).then(function (answer) {
                let query = "SELECT * FROM department WHERE ?";
                let query2 = "INSERT INTO role SET ?";

                connection.query(query, { name: answer.roleDept }, function (err, res) {
                    if (err) throw err;
                    connection.query(query2, {
                        title: answer.roleName,
                        salary: parseInt(answer.roleSalary),
                        department_id: parseInt(res[0].id)
                    });

                    console.log("\nRole successfully added!");
                });
                mainMenu();
            });
    });
};

function addDept() {
    inquirer
        .prompt({
            name: 'deptName',
            type: 'input',
            message: 'New Department Name: '
        }).then(function(answer) {
            let query = "INSERT INTO department SET ?";

            connection.query(query, { name: answer.deptName }, function(err){
                if (err) throw err;
            });

            console.log("\nDepartment successfully added!");
            mainMenu();
        });

};

function viewEmployees() {
    let query = "SELECT * employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee_db.employee LEFT JOIN role on role.id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

}

// function viewRoles() {

// }

// function viewDepts() {

// }

// function finish() {
//     connection.end();
// }