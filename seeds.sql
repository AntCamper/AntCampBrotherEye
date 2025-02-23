USE employee_db;

INSERT INTO department (name) VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Andy', 'Bernard', 1, NULL),
('Michael', 'Scott', 2, 1),
('Oscar', 'Martinez', 3, NULL),
('Kevin', 'Malone', 4, 3),
('Jim', 'Halpert', 5, NULL),
('Pam', 'Beesly', 6, NULL),
('Barry', 'Allen', 7, 6);
