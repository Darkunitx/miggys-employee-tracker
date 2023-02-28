const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the Employee database.`)
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

                case 'View All Roles':
                    viewRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'View all Departments':
                    viewDepartments();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'Exit':
                    db.end();
                    break;
            }
        });
}

function viewEmployees() {
    console.log('Viewing all employees...\n');
    db.query(`SELECT role_id AS ID, first_name, last_name, title, department_name, salary, manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department on role.department_id = department.id ORDER BY role.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}


function addEmployee() {
    db.query(`SELECT * FROM role`, (err, roles) => {
        if (err) throw err;
        roles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id
            }
        });

        db.query(`SELECT * FROM employee`, (err, employees) => {
            if (err) throw err;
            employees = employees.map((employee) => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }
            });

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
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s role?',
                        choices: roles
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the employee\'s manager?',
                        choices: employees
                    }
                ])
                .then((answer) => {
                    db.query(`INSERT INTO employee SET ?`,
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: answer.role,
                            manager_id: answer.manager_id
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(`Employee added!\n`);
                            init();
                        }
                    );
                });
        });
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

function viewRoles() {
    console.log('Viewing all roles...\n');
    db.query(`SELECT * FROM role JOIN department on role.department_id = department.id ORDER BY role.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function addRole() {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        departmentList = res.map(department => {
            return {
                name: department.department_name,
                value: department.id
            }
        });

        db.query(`SELECT * FROM role`, (err, res) => {
            if (err) throw err;
            roleList = res.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            });

            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the name of the role?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'What department is the role in?',
                        choices: departmentList
                    }
                ])
                .then((answer) => {
                    db.query(`INSERT INTO role SET ?`,
                        {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: answer.department
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(`Role added!\n`);
                            init();
                        }
                    );
                });
        });
    });

}

function viewDepartments() {
    console.log('Viewing all departments...\n');
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'What is the name of the department?'
            }
        ])
        .then((answer) => {
            db.query(`INSERT INTO department SET ?`,
                {
                    department_name: answer.department_name
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`Department added!\n`);
                    init();
                }
            );
        });
}

init();