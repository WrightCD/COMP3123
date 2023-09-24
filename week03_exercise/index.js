//Carl Wright
//100875122
//Lab Week 3

var http = require("http");
//TODO - Use Employee Module here
console.log("Lab 03 -  NodeJs");
var employee = require("./Employee");
console.log(employee);

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081;

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
  } else {
    if (req.url === "/") {
      //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
      res.write("<h1>Welcome to Lab Exercise 03</h1>");
    }

    if (req.url === "/employee") {
      //TODO - Display all details for employees in JSON format
      res.write("<h1>Employees Page<h1>");
      res.write(JSON.stringify(employee));
    }

    if (req.url === "/employee/names") {
      //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
      //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
      res.write("<h1> Employee Names </h1>");
      const sortedEmp = employee.sort((a, b) =>
        a.firstName
          .toLocaleLowerCase()
          .localeCompare(b.firstName.toLocaleLowerCase())
      );

      const empArray = [];
      sortedEmp.forEach((emp) => {
        empArray.push(emp["firstName"] + " " + emp["lastName"]);
      });
      res.write(JSON.stringify(empArray));
    }

    if (req.url === "/employee/totalsalary") {
      //TODO - Display Sum of all employees salary in given JSON format
      //e.g. { "total_salary" : 100 }
      res.write("<h1>Salary Total Page</h1>");
      var salarysum = 0;
      employee.forEach((emp) => {
        salarysum += emp["Salary"];
      });
      let total = [
        {
          total_salary: salarysum,
        },
      ];
      res.write(JSON.stringify(total));
    }
    //res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
