var mysql = require("mysql");
var inquirer = require("inquirer");
//const functions = require("functions");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",


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
    connection.query("SELECT * FROM employee", function (err, employeeList) {
        if (err) throw err;
        //console.log(results);

        inquirer
            .prompt({
                name: "initialchoice",
                type: "list",
                message: "Would you like to do?",
                choices: ["View all employees", "View all employees by Department", "View all employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View all roles", "Add Department", "Add Role", "Delete Department", "Delete Role", "View Department Budget", "Finish Entering Data"]
            })
            .then(function (answer) {
                // based on their answer, either call the bid or the post functions
                //console.log(answer);
                if (answer.initialchoice === "View all employees") {
                    viewAllEmployees();
                    function viewAllEmployees() {
                        console.table(employeeList)

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

                                        return employeeList.map((manager) => ({
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

                                        return employeeList.map((manager) => ({
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

                                        return employeeList.map((employee) => ({
                                            name: employee.last_name

                                        }))

                                    },
                                    message: "Please enter the employee's last name"
                                }

                            ])
                            .then(function (answer) {
                                var query = "DELETE FROM employee WHERE (employee.last_name = ?)";

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
                                    name: "secondNameUpdateRole",
                                    type: "list",
                                    choices: function () {

                                        return employeeList.map((employee) => ({
                                            name: employee.last_name

                                        }))

                                    },
                                    message: "Please enter the employee's last name"
                                },
                                {
                                    name: "newrole",
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
                                    message: "Please choose their NEW role"
                                },
                            ])
                            .then(function (answer) {
                                connection.query(
                                    "UPDATE employee SET ? WHERE ?",
                                    [
                                        {
                                            role_id: answer.newrole
                                        },
                                        {
                                            last_name: answer.secondNameUpdateRole
                                        }
                                    ],
                                    function (error) {
                                        if (error) throw err;
                                        console.log("Role successfully update!");
                                        start();
                                    }
                                );


                            });



                    };
                }

                else if (answer.initialchoice === "Update Employee Manager") {
                    updateEmployeeManager();
                    function updateEmployeeManager() {
                        inquirer
                            .prompt([
                                {
                                    name: "secondNameUpdateManager",
                                    type: "list",
                                    choices: function () {

                                        return employeeList.map((employee) => ({
                                            name: employee.last_name

                                        }))

                                    },
                                    message: "Please enter the employee's last name"
                                },
                                {
                                    name: "newManager",
                                    type: "list",
                                    choices: function () {

                                        return employeeList.map((manager) => ({
                                            name: manager.last_name,
                                            value: manager.id
                                        }))

                                    },


                                    message: "Please enter the employee's NEW manager"
                                }
                            ])
                            .then(function (answer) {
                                console.log(answer.newManager);
                                console.log(answer.secondNameUpdateManager);
                                connection.query(
                                    "UPDATE employee SET ? WHERE ?",
                                    [
                                        {
                                            manager_id: answer.newManager
                                        },
                                        {
                                            last_name: answer.secondNameUpdateManager
                                        }
                                    ],
                                    function (error) {
                                        if (error) throw err;
                                        console.log("Manager successfully update!");
                                        start();
                                    }
                                );


                            });



                    };
                }

                // "View all roles"
                else if (answer.initialchoice === "View all roles") {
                    viewAllRoles();
                    function viewAllRoles() {
                        connection.query("SELECT * FROM role", function (err, results) {
                            console.table(results);
                            start();
                        });
                    };
                }

                //"Add Department", 
                else if (answer.initialchoice === "Add Department") {
                    addDepartment();
                    function addDepartment() {

                        inquirer
                            .prompt([

                                {
                                    name: "newDepartment",
                                    type: "input",
                                    message: "Please enter the name of the new department"
                                }
                            ])
                            .then(function (answer) {
                                connection.query(
                                    "INSERT INTO department SET ?",
                                    {
                                        name: answer.newDepartment

                                    },

                                );
                                console.log("You successfully created a new department");
                                start();
                            });



                    };
                }

                //"Add Role", 
                else if (answer.initialchoice === "Add Role") {
                    addRole();
                    function addRole() {

                        inquirer
                            .prompt([

                                {
                                    name: "newRole",
                                    type: "input",
                                    message: "Please enter the name of the new role"
                                }
                            ])
                            .then(function (answer) {
                                connection.query(
                                    "INSERT INTO role SET ?",
                                    {
                                        title: answer.newRole

                                    },

                                );
                                console.log("You successfully created a new role");
                                start();
                            });



                    };
                }
                //"Delete Department", 
                else if (answer.initialchoice === "Delete Department") {
                    deleteDepartment();
                    function deleteDepartment() {
                        connection.query("SELECT * FROM department", function (err, results) {
                            if (err) throw err;
                            inquirer
                                .prompt([

                                    {
                                        name: "deleteDepartment",
                                        type: "list",
                                        choices: function () {

                                            return results.map((department) => ({
                                                name: department.name

                                            }));

                                        },


                                        message: "Please select the department you wish to delete"
                                    }
                                ])
                                .then(function (answer) {
                                    var query = "DELETE FROM department WHERE (department.name = ?)";


                                    connection.query(query, [answer.deleteDepartment], function (err, res) {
                                        console.log("You successfully deleted: " + answer.deleteDepartment);
                                        start();

                                    });
                                });

                        });

                    };
                }
                //"Delete Role", 
                else if (answer.initialchoice === "Delete Role") {
                    deleteRole();
                    function deleteRole() {
                        connection.query("SELECT * FROM role", function (err, results) {
                            if (err) throw err;
                            inquirer
                                .prompt([

                                    {
                                        name: "deleteRole",
                                        type: "list",
                                        choices: function () {

                                            return results.map((role) => ({
                                                name: role.title

                                            }));

                                        },


                                        message: "Please select the role you wish to delete"
                                    }
                                ])
                                .then(function (answer) {
                                    var query = "DELETE FROM role WHERE (role.name = ?)";


                                    connection.query(query, [answer.deleteRole], function (err, res) {
                                        console.log("You successfully deleted: " + answer.deleteRole);
                                        start();

                                    });
                                });

                        });

                    };
                }

                //"View Department Budget", 
                else if (answer.initialchoice === "View Department Budget") {
                    viewDepartmentBudget();
                    function viewDepartmentBudget() {
                        connection.query("SELECT * FROM department", function (err, results) {
                            if (err) throw err;
                            inquirer
                                .prompt([

                                    {
                                        name: "viewDepartmentForBudget",
                                        type: "list",
                                        choices: function () {

                                            return results.map((department) => ({
                                                name: department.name,
                                                // value: department.id


                                            }));

                                        },


                                        message: "Please select the department for which you would like the budget"
                                    }
                                ])
                                .then(function (answer) {
                                    var query = "SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary";
                                    query += " FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) WHERE (department.name = ?) ORDER BY employee.last_name";

                                    //console.log(query);
                                    //console.log(answer.manager);

                                    connection.query(query, [answer.viewDepartmentForBudget], function (err, res) {


                                        console.table(res);


                                        var totalSalary = 0;
                                        for (var i = 0; i < res.length; i++) {
                                            totalSalary = totalSalary + (res[i].salary);
                                        }

                                        // console.log(totalSalary);
                                        console.log("The total budget for " + answer.viewDepartmentForBudget + " department is: $" + totalSalary);

                                    });

                                    start();
                                });

                        });
                    };
                }

                else console.log("Thankyou for using this CMS");
                //process.exit(1);




            });


    });











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




