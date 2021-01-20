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
                    break;
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

// Function to change role of an employee
function updateRole() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer
            .prompt({
                name: 'searchName',
                type: 'list',
                message: 'Which employee are you updating?',
                choices: function () {
                    let options = [];

                    for (let i = 0; i < res.length; i++) {
                        options.push(res[i].last_name);
                    }

                    return options;
                }

            }).then(function(answer) {
                query2 = "SELECT * FROM role"
                
                connection.query(query2, function (err, res) {
                    if (err) throw err;
                    inquirer
                        .prompt({
                            name: 'searchRole',
                            type: 'list',
                            message: 'Updated Role?',
                            choices: function () {
                                let options = [];
            
                                for (let i = 0; i < res.length; i++) {
                                    options.push(res[i].title);
                                }
            
                                return options;
                            }
                        }).then(function (answer2) {
                            let newRole = answer2.searchRole;

                            connection.query("SELECT * FROM role WHERE title = ?", [newRole], function(err, res) {
                                if (err) throw err;
                                let query5 = "UPDATE employee SET role_id ? WHERE last_name ?";
                                connection.query(query5, [res[0].id, answer.searchName], function (err, res, fields) {
                                    console.log("Role updated");
                                });
                                mainMenu();
                            });
                        });

                });
            })
            
    });
}

// Function to create a new role
function addRole() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
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

// Function to add a new department
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

// Function to view all employees
function viewEmployees() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

};

// Function to view all roles
function viewRoles() {
    let query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`;
    
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

};

// Function to view all departments
function viewDepts() {
    let query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;`;

    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};

// Terminal function
function finish() {
    connection.end();
};