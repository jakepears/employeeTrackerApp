/** @format */

const connection = require('./db/db');

// Execute a query
connection.query('SELECT * FROM employee', (err, results) => {
	if (err) {
		console.error('Error executing query:', err);
		return;
	}
	console.log('Query results:', results);
});
