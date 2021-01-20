USE employee_db;

INSERT INTO role (title, salary, department_id)
VALUES ("Cashier", 15000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Cashier", 18000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service Associate", 16000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 45000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Social Media", 20000, 3);

INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO department (name)
VALUES ("Retail");

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Adam", "West", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Brad", "Pitt", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Chris", "Pratt", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Dwayne", "Johnson", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Edward", "Norton", 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Frank", "Sinatra", 6);


