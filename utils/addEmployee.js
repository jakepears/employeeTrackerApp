/** @format */

const inquirer = require('inquirer');
const connection = require('../db/db');

// Add an employee
function addEmployee() {
	// Fetch the list of roles and employees from the database
	const query = 'SELECT * FROM role';
	connection.query(query, (err, roles) => {
		if (err) throw err;

		const query = 'SELECT * FROM employee';
		connection.query(query, (err, employees) => {
			if (err) throw err;

			inquirer
				.prompt([
					{
						name: 'firstName',
						type: 'input',
						message: "Enter the employee's first name:",
					},
					{
						name: 'lastName',
						type: 'input',
						message: "Enter the employee's last name:",
					},
					{
						name: 'roleId',
						type: 'list',
						message: "Select the employee's role:",
						choices: roles.map((role) => ({
							name: role.title,
							value: role.id,
						})),
					},
					{
						name: 'managerId',
						type: 'list',
						message: "Select the employee's manager:",
						choices: [
							{ name: 'None', value: null },
							...employees.map((employee) => ({
								name: `${employee.first_name} ${employee.last_name}`,
								value: employee.id,
							})),
						],
					},
				])
				.then((answers) => {
					const query =
						'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
					connection.query(
						query,
						[
							answers.firstName,
							answers.lastName,
							answers.roleId,
							answers.managerId,
						],
						(err, res) => {
							if (err) throw err;
							console.log('Employee added successfully!');
						}
					);
				});
		});
	});
}

module.exports = addEmployee;
