var mysql = require("mysql");
var inquirer = require("inquirer");
//const functions = require("functions");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Gundaroo484",
    database: "employee_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        //console.log(results);

        inquirer
            .prompt({
                name: "initialchoice",
                type: "list",
                message: "Would you like to do?",
                choices: ["View all employees", "View all employees by Department", "View all employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View all roles"]
            })
            .then(function (answer) {
                // based on their answer, either call the bid or the post functions
                //console.log(answer);
                if (answer.initialchoice === "View all employees") {
                    viewAllEmployees();
                    function viewAllEmployees() {
                        console.table(results)

                        start();
                    }
                }
                else if (answer.initialchoice === "View all employees by Department") {
                    viewAllEmployeesByDepartment();
                    function viewAllEmployeesByDepartment() {
                        connection.query("SELECT * FROM department", function (err, results) {
                            if (err) throw err;
                            inquirer
                                .prompt([

                                    {
                                        name: "department",
                                        type: "list",
                                        choices: function () {

                                            return results.map((department) => ({
                                                name: department.name

                                            }));

                                        },


                                        message: "Please select the department you wish to view"
                                    }
                                ])
                                .then(function (answer) {
                                    var query = "SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary";
                                    query += " FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) WHERE (department.name = ?) ORDER BY employee.last_name";

                                    //console.log(query);
                                    //console.log(answer.department);

                                    connection.query(query, [answer.department], function (err, res) {
                                        console.table(res);

                                    });

                                    start();
                                });
                        });
                    }
                }
                else if (answer.initialchoice === "View all employees by Manager") {
                    viewAllEmployeesByManager();

                    function viewAllEmployeesByManager() {

                        inquirer
                            .prompt([

                                {
                                    name: "manager",
                                    type: "list",
                                    choices: function () {

                                        return results.map((manager) => ({
                                            name: manager.last_name,
                                            value: manager.id
                                        }))
                                        // var managerArray = [];
                                        // for (var i = 0; i < results.length; i++) {
                                        //     managerArray.push(results[i].last_name);
                                    },


                                    message: "Please choose the manager"
                                }
                            ])
                            .then(function (answer) {
                                var query = "SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary";
                                query += " FROM employee INNER JOIN role ON (employee.role_id = role.id) WHERE (employee.manager_id = ?) ORDER BY employee.last_name";

                                //console.log(query);
                                //console.log(answer.manager);

                                connection.query(query, [answer.manager], function (err, res) {
                                    console.log("These are the employees who have employee ID: " + answer.manager + "  as their manager")
                                    console.table(res);

                                });

                                start();
                            });



                    }
                }





                else if (answer.initialchoice === "Add Employee") {
                    addEmployee();
                    function addEmployee() {
                        // prompt for info about the item being put up for auction
                        inquirer
                            .prompt([
                                {
                                    name: "firstName",
                                    type: "input",
                                    message: "Please enter the employee's first name?"
                                },
                                {
                                    name: "secondName",
                                    type: "input",
                                    message: "Please enter the employee's second name?"
                                },
                                {
                                    name: "role",
                                    type: "list",
                                    choices: [
                                        {
                                            name: "Salesperson",
                                            value: 1,
                                        },
                                        {
                                            name: "Sales Lead",
                                            value: 2
                                        },
                                        {
                                            name: "Software Engineer",
                                            value: 3,
                                        },
                                        {
                                            name: "Lead Engineer",
                                            value: 4,
                                        },
                                        {
                                            name: "Accountant",
                                            value: 5,
                                        },
                                        {
                                            name: "Lawyer",
                                            value: 6,
                                        },
                                        {
                                            name: "Legal Team Lead",
                                            value: 7,

                                        },
                                    ],
                                    message: "Please choose a role"
                                },
                                {
                                    name: "manager",
                                    type: "list",
                                    choices: function () {

                                        return results.map((manager) => ({
                                            name: manager.last_name,
                                            value: manager.id
                                        }))
                                        // var managerArray = [];
                                        // for (var i = 0; i < results.length; i++) {
                                        //     managerArray.push(results[i].last_name);
                                    },


                                    message: "Please enter the employee's manager"
                                }
                            ])
                            .then(function (answer) {
                                // when finished prompting, insert a new item into the db with that info
                                connection.query(
                                    "INSERT INTO employee SET ?",
                                    {
                                        first_name: answer.firstName,
                                        last_name: answer.secondName,
                                        role_id: answer.role,
                                        manager_id: answer.manager

                                    },
                                    function (err) {
                                        if (err) throw err;
                                        console.log("Your entry was created successfully!");
                                        // re-prompt the user for if they want to bid or post
                                        start();
                                    }
                                );
                            });
                    }
                }
                // 
                else if (answer.initialchoice === "Remove Employee") {
                    removeEmployee();
                    function removeEmployee() {
                        inquirer
                            .prompt([
                                {
                                    name: "secondName",
                                    type: "list",
                                    choices: function () {

                                        return results.map((employee) => ({
                                            name: employee.last_name

                                        }))

                                    },
                                    message: "Please enter the employee's last name"
                                }

                            ])
                            .then(function (answer) {
                                var query = "SELECT employee FROM employee WHERE (employee.last_name = ?)";

                                //console.log(query);
                                //console.log(answer.department);

                                connection.query(query, [answer.secondName], function (err, res) {
                                    console.log("You successfully deleted: " + answer.secondName);
                                    start();

                                });


                            });


                    }

                }


                else if (answer.initialchoice === "Update Employee Role") {
                    updateEmployeeRole();
                    function updateEmployeeRole() {
                        inquirer
                            .prompt([
                                {
                                    name: "secondName",
                                    type: "list",
                                    choices: function () {

                                        return results.map((employee) => ({
                                            name: employee.last_name

                                        }))

                                    },
                                    message: "Please enter the employee's last name"
                                },
                                {
                                    name: "updatedRole",
                                    type: "list",
                                    choices: function () {
                                        connection.query("SELECT * FROM role", function (err, results) {
                                            if (err) throw err;
                                            console.log(results);
                                            console.log(results.title);


                                        });

                                        return results.map((role) => ({
                                            name: role.title

                                        }))
                                    },
                                    message: "Please enter the employee's new role"
                                }

                            ])
                            .then(function (answer) {
                                console.log(answer.updateRole);
                                // var query = "SELECT employee.role_id FROM employee WHERE (employee.last_name = ?) ORDER BY employee.last_name";

                                // //console.log(query);
                                // //console.log(answer.department);

                                // connection.query(query, [answer.secondName], function (err, res) {
                                //     console.log("You successfully deleted: " + answer.secondName);
                                //     start();

                            });


                    };


                }

            });




    });




    // else if (answer.initialchoice === "Update Employee Role") {
    //     updateEmployeeRole();
    // }
    // else if (answer.initialchoice === "Update Employee Manager") {
    //     updateEmployeeManager();
    // }
    // else if (answer.initialchoice === "View all roles") {
    //     viewAllRoles();
    // }
    // else {
    //     connection.end();
    // }


}




