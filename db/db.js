/** @format */

const mysql = require('mysql2');
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: process.env.DB_PASSWORD,
	database: 'employee_tracker_db',
});

// Connect to the database
connection.connect((err) => {
	if (err) {
		console.error('Error connecting to the database:', err);
		return;
	}
	console.log('Connected to the employee_tracker_db database.');
});

// Export the connection
module.exports = connection;
