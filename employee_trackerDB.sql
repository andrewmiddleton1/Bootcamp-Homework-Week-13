DROP DATABASE IF EXISTS employee_trackerDB;

CREATE database employee_trackerDB;
USE employee_trackerDB;
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INT,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);


INSERT INTO role (title, salary) VALUES ("Salesperson", "60000");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO employee (first_name, last_name, role_id) VALUES ("John", "Smith", 1);
INSERT INTO role (title, salary) VALUES ("Sales Lead", "80000");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO role (title, salary) VALUES ("Software Engineer", "90000");
INSERT INTO department (name) VALUES ("IT");
INSERT INTO role (title, salary) VALUES ("Lead Engineer", "150000");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO role (title, salary) VALUES ("Accountant", "100000");
INSERT INTO department (name) VALUES ("Administration");
INSERT INTO role (title, salary) VALUES ("Lawyer", "90000");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO role (title, salary) VALUES ("Legal Team Lead", "150000");
INSERT INTO department (name) VALUES ("Legal");
