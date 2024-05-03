/** @format */

const inquirer = require('inquirer');
const connection = require('../db/db');

// Add a role
function addRole() {
	// Fetch the list of departments from the database
	const query = 'SELECT * FROM department';
	connection.query(query, (err, departments) => {
		if (err) throw err;

		inquirer
			.prompt([
				{
					name: 'title',
					type: 'input',
					message: 'Enter the title of the role:',
				},
				{
					name: 'salary',
					type: 'input',
					message: 'Enter the salary for the role:',
				},
				{
					name: 'departmentId',
					type: 'list',
					message: 'Select the department for the role:',
					choices: departments.map((department) => ({
						name: department.name,
						value: department.id,
					})),
				},
			])
			.then((answers) => {
				const query =
					'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
				connection.query(
					query,
					[answers.title, answers.salary, answers.departmentId],
					(err, res) => {
						if (err) throw err;
						console.log('Role added successfully!');
						// Return to the main menu
					}
				);
			});
	});
}

module.exports = addRole;
