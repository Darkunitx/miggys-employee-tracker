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

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

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

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employee\'s first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employee\'s last name?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the employee\'s role ID?'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is the employee\'s manager ID?'
            }
        ])
        .then((answer) => {
            db.query(`INSERT INTO employee SET ?`,
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`Employee added!\n`);
                    init();
                }
            );
        });
}

function updateEmployeeRole() {

    db.query(`SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeList = res.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        });

        db.query(`SELECT * FROM role`, (err, res) => {
            if (err) throw err;
            console.table(res);
            roleList = res.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            });

            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee would you like to update?',
                        choices: employeeList
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s new role?',
                        choices: roleList
                    }
                ])
                .then((answer) => {
                    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
                        [
                            answer.role,
                            answer.employee
                        ],
                        (err, res) => {
                            if (err) throw err;
                            console.log(`Employee updated!\n`);
                            init();
                        }
                    );
                });
        });
    });
}


init();