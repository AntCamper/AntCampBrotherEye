console.log('Starting application...');

const inquirer = require('inquirer');
const db = require('./db');

console.log('Modules loaded.');

async function mainMenu() {
  try {
    console.log('Entering main menu...');
    const { choice } = await inquirer.prompt({
      name: 'choice',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    });

    switch (choice) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }

    await mainMenu();
  } catch (error) {
    console.error('An error occurred in the main menu:', error);
  }
}

async function viewAllDepartments() {
  const [rows] = await db.query('SELECT * FROM department');
  console.table(rows);
}

async function viewAllRoles() {
  const [rows] = await db.query(`
    SELECT role.id, role.title, department.name AS department, role.salary 
    FROM role 
    JOIN department ON role.department_id = department.id
  `);
  console.table(rows);
}

async function viewAllEmployees() {
  const [rows] = await db.query(`
    SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  console.table(rows);
}

async function addDepartment() {
  const { name } = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'What is the name of the department?'
  });

  await db.query('INSERT INTO department (name) VALUES (?)', [name]);
  console.log(`Added ${name} to departments.`);
}

async function addRole() {
  const [departments] = await db.query('SELECT * FROM department');
  
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'What is the title of the role?'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary for this role?',
      validate: input => !isNaN(input) || 'Please enter a valid number'
    },
    {
      name: 'departmentId',
      type: 'list',
      message: 'Which department does this role belong to?',
      choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
    }
  ]);

  await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  console.log(`Added ${title} to roles.`);
}

async function addEmployee() {
  const [roles] = await db.query('SELECT * FROM role');
  const [employees] = await db.query('SELECT * FROM employee');

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      name: 'firstName',
      type: 'input',
      message: "What is the employee's first name?"
    },
    {
      name: 'lastName',
      type: 'input',
      message: "What is the employee's last name?"
    },
    {
      name: 'roleId',
      type: 'list',
      message: "What is the employee's role?",
      choices: roles.map(role => ({ name: role.title, value: role.id }))
    },
    {
      name: 'managerId',
      type: 'list',
      message: "Who is the employee's manager?",
      choices: [
        { name: 'None', value: null },
        ...employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
      ]
    }
  ]);

  await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  console.log(`Added ${firstName} ${lastName} to employees.`);
}

async function updateEmployeeRole() {
  const [employees] = await db.query('SELECT * FROM employee');
  const [roles] = await db.query('SELECT * FROM role');

  const { employeeId, roleId } = await inquirer.prompt([
    {
      name: 'employeeId',
      type: 'list',
      message: "Which employee's role do you want to update?",
      choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
    },
    {
      name: 'roleId',
      type: 'list',
      message: 'Which role do you want to assign to the selected employee?',
      choices: roles.map(role => ({ name: role.title, value: role.id }))
    }
  ]);

  await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  console.log(`Updated employee's role.`);
}

// Start the application
async function init() {
  console.log('Initializing...');
  try {
    console.log('Connected to the employee_db database.');
    await mainMenu();
    console.log('Main menu completed.');
  } catch (err) {
    console.error('Error in init function:', err);
  }
}

init();
console.log('init() called.');

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
