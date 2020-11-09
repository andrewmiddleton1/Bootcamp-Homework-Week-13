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
        console.log(results);

        inquirer
            .prompt({
                name: "initialchoice",
                type: "list",
                message: "Would you like to do?",
                choices: ["View all employees", "View all employees by Department", "View all employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View all roles"]
            })
            .then(function (answer) {
                // based on their answer, either call the bid or the post functions
                console.log(answer);
                // if (answer.initialchoice === "View all employees") {
                //     viewAllEmployees();
                // }
                // else if (answer.initialchoice === "View all employees by Department") {
                //     viewAllEmployeesByDepartment();
                // }
                // else if (answer.initialchoice === "View all employees by Manager") {
                //     viewAllEmployeesByManager();
                // }
                if (answer.initialchoice === "Add Employee") {
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
                                    choices: ["Salesperson", "Sales Lead", "Software Engineer", "Lead Engineer", "Accountant", "Lawyer", "Legal Team Lead"],
                                    message: "Please choose a number corresponding to the role"
                                },
                                {
                                    name: "manager",
                                    type: "rawlist",
                                    choices: function () {
                                        var managerArray = [];
                                        for (var i = 0; i < results.length; i++) {
                                            managerArray.push(results[i].last_name);
                                        }
                                        return managerArray;
                                    },
                                    message: "Please enter the employee's manager"
                                }
                            ])
                            .then(function (answer) {

                                switch (answer.role) {
                                    case "Salesperson": "1";
                                        break;

                                    case "Sales Lead": "2";
                                        break;

                                    case "Software Engineer": "3";
                                        break;

                                    case "Lead Engineer": "4";
                                        break;

                                    case "Accountant": "5";
                                        break;

                                    case "Lawyer": "6";
                                        break;

                                    case "Legal Team Lead": "7";
                                        break;

                                }
                                // when finished prompting, insert a new item into the db with that info
                                connection.query(
                                    "INSERT INTO employee SET ?",
                                    {
                                        first_name: answer.firstName,
                                        last_name: answer.secondName,
                                        role_id: answer.role

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
                    // }
                    // else if (answer.initialchoice === "Remove Employee") {
                    //     removeEmployee();
                    // }
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
            });
    }
    )
};

