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

INSERT INTO employee (id) VALUES ("1");
INSERT INTO employee (role_id) VALUES ("1");
INSERT INTO employee (first_name) VALUES ("John");
INSERT INTO employee (last_name) VALUES ("Smith");
INSERT INTO role (title) VALUES ("Engineer");
INSERT INTO role (salary) VALUES ("120000");
INSERT INTO department (name) VALUES ("Engineering");
