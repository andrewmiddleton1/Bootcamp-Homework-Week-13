INSERT INTO department (name, id) VALUES ("Sales", 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", "60000", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("John", "Smith", 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", "80000", 1);
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", "90000", 2);
INSERT INTO department (name) VALUES ("IT");
INSERT INTO role (title, salary) VALUES ("Lead Engineer", "150000");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO role (title, salary) VALUES ("Accountant", "100000");
INSERT INTO department (name) VALUES ("Administration");
INSERT INTO role (title, salary) VALUES ("Lawyer", "90000");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO role (title, salary) VALUES ("Legal Team Lead", "150000");
INSERT INTO department (name) VALUES ("Legal");

SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) WHERE (department.name = "Sales") ORDER BY employee.last_name;