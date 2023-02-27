const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
);

function init() {
    inquirer
        .prompt({
            type: 'list',
            name: 'menuChoice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View all Departments', 'Add Department', 'Exit']
        })
        .then((answer) => {
            switch (answer.menuChoice) {
                case 'View All Employees':
                    viewEmployees();
                    break;

                // case 'Add Employee':
                //     addEmployee();
                //     break;

                // case 'Update Employee Role':
                //     updateEmployeeRole();
                //     break;

                // case 'View All Roles':
                //     viewRoles();
                //     break;

                // case 'Add Role':
                //     addRole();
                //     break;

                // case 'View all Departments':
                //     viewDepartments();
                //     break;

                // case 'Add Department':
                //     addDepartment();
                //     break;

                // case 'Exit':
                //     db.end();
                //     break;
            }
        });
}

function viewEmployees() {
    console.log('Viewing all employees...\n');
    db.query(`SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

init();