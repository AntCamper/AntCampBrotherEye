
## Description
This is a command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL. It allows business owners to view and manage the departments, roles, and employees in their company, helping them to organize and plan their business.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Database Schema](#database-schema)
- [Technologies Used](#technologies-used)

## Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the necessary dependencies.
4. Set up your MySQL database using the provided schema.sql file.
5. (Optional) Seed your database with sample data using the seeds.sql file.
6. Update the database connection details in the `db.js` file.

## Usage
1. Navigate to the project directory in your terminal.
2. Run the application by typing `node index.js`.
3. Use the arrow keys to navigate through the menu and select the desired action.
4. Follow the prompts to view, add, or update information in the database.

## Features
- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update an employee's role


## Database Schema
The database consists of three tables:
- `department`: Stores department names and IDs
- `role`: Stores role titles, salaries, and the associated department
- `employee`: Stores employee information including first name, last name, role, and manager

## Technologies Used
- Node.js
- Inquirer.js
- MySQL
