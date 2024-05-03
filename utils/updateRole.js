/** @format */

const inquirer = require('inquirer');
const connection = require('../db/db');

// Update an employee role
function updateEmployeeRole() {
	// Fetch the list of employees and roles from the database
	const query = 'SELECT * FROM employee';
	connection.query(query, (err, employees) => {
		if (err) throw err;

		const query = 'SELECT * FROM role';
		connection.query(query, (err, roles) => {
			if (err) throw err;

			inquirer
				.prompt([
					{
						name: 'employeeId',
						type: 'list',
						message: 'Select the employee to update:',
						choices: employees.map((employee) => ({
							name: `${employee.first_name} ${employee.last_name}`,
							value: employee.id,
						})),
					},
					{
						name: 'roleId',
						type: 'list',
						message: 'Select the new role for the employee:',
						choices: roles.map((role) => ({
							name: role.title,
							value: role.id,
						})),
					},
				])
				.then((answers) => {
					const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
					connection.query(
						query,
						[answers.roleId, answers.employeeId],
						(err, res) => {
							if (err) throw err;
							console.log('Employee role updated successfully!');
							// Return to the main menu or perform any other desired action
						}
					);
				});
		});
	});
}

module.exports = updateEmployeeRole;
