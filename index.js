/** @format */

const inquirer = require('inquirer');
const connection = require('./db/db');
const addRole = require('./utils/addRole');
const addEmployee = require('./utils/addEmployee');
const updateEmployeeRole = require('./utils/updateRole');

// Execute a query
connection.query('SELECT * FROM employee', (err, results) => {
	if (err) {
		console.error('Error executing query:', err);
		return;
	}
	console.log('Query results:', results);
});

// start the application
function startApp() {
	inquirer
		.prompt({
			name: 'action',
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
				'Exit',
			],
		})
		.then((answer) => {
			switch (answer.action) {
				case 'View all departments':
					viewDepartments();
					break;
				case 'View all roles':
					viewRoles();
					break;
				case 'View all employees':
					viewEmployees();
					break;
				case 'Add a department':
					addDepartment();
					break;
				case 'Add a role':
					addRole();
					break;
				case 'Add an employee':
					addEmployee();
					break;
				case 'Update an employee role':
					updateEmployeeRole();
					break;
				case 'Exit':
					connection.end();
					console.log('Goodbye!');
					break;
			}
		});
}

// view all departments
function viewDepartments() {
	const query = 'SELECT * FROM department';
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		startApp();
	});
}

// view all roles
function viewRoles() {
	const query = 'SELECT * FROM role';
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		startApp();
	});
}

// view all employees
function viewEmployees() {
	const query = 'SELECT * FROM employee';
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		startApp();
	});
}

// add a department
function addDepartment() {
	inquirer
		.prompt({
			name: 'departmentName',
			type: 'input',
			message: 'Enter the name of the department:',
		})
		.then((answer) => {
			const query = 'INSERT INTO department (name) VALUES (?)';
			connection.query(query, [answer.departmentName], (err, res) => {
				if (err) throw err;
				console.log('Department added successfully!');
				startApp();
			});
		});
}

// add a role
function callAddRole() {
	addRole();
}

// add an employee
function callAddEmployee() {
	addEmployee();
}

// update an employee role
function callUpdateEmployeeRole() {
	updateEmployeeRole();
}

// Start the application
startApp();
