var Client = function () {

  // Singleton design pattern junk
  if (arguments.callee.instance) {
    return arguments.callee.instance;
  }
  arguments.callee.instance = this;

  // variables
  var employees = [];
  var roles = [];

  //methods
  this.init = function(responseHandler) {
    var httpRequest = XMLHttpRequest();

    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          responseHandler(true);
        } else {
          responseHandler(false);
        }
      }
    };

    httpRequest.open('GET', 'http://localhost:9000/init', true);
    httpRequest.send(null); 
  };

  this.getEmployee = function(id) {
    for each (var employee in employees) {
      if(employee.id === id) {
        return employee;
      }
    }
    return null;
  };

  this.addEmployee = function(employeeObject, responseHandler) {

    var httpRequest = XMLHttpRequest();

    // take care of the http reponse
    httpRequest.onreadystatechange = function() {

      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {

          // Set the id of the contact
          JSON.parse(httpRequest.responseText, function (key, value) {
            if (key === "id") {
             employeeObject.id = value;
           }
         });

          // Add to list of all contacts 
          employees.push(employeeObject);
          responseHandler(true, employeeObject.id);
        } else {
          responseHandler(false);
        }
      }
    };

    httpRequest.open('POST', 'http://localhost:9000/addemployee', true); // TODO: localhost. 
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(employeeObject));
  };

  this.updateEmployee = function(employeeObject, responseHandler) {

  };

  this.removeEmployee = function(employeeObject, responseHandler) {

  };

  this.getRole = function(id) {
    for each (var role in roles) {
      if(role.id === id) {
        return role;
      }
    }
    return null;
  };

  this.addRole = function(roleObject, responseHandler) {

    var httpRequest = XMLHttpRequest();

    // Response handler
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {

          // Set the id of the contact
          JSON.parse(httpRequest.responseText, function (key, value) {
            if (key === "id") {
             roleObject.id = value;
           }
         });

          // Add to list of all contacts
          roles.push(roleObject);

          responseHandler(true, roleObject.id);
        } else {
          responseHandler(false);
        }
      }
    };

    httpRequest.open('POST', 'http://localhost:9000/addskill', true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(roleObject));
  };

  this.updateRole = function(roleObject, responseHandler) {

  };

  this.removeRole = function(roleObject, responseHandler) {

    var httpRequest = XMLHttpRequest();

     // Response handler
     httpRequest.onreadystatechange = function() {
       if (httpRequest.readyState === 4) {
         if (httpRequest.status === 200) {

         // Remove role from list
         for (var i = 0; i < roles.length; i++) {
           if(roles[i].id === roleObject.id) {
             roles.splice(i,i);
           }
         }

         responseHandler(true, roleObject.id);
       } else {
         responseHandler(false);
       }
     }
   }

   httpRequest.open('POST', 'http://localhost:9000/removeskill', true);
   httpRequest.setRequestHeader('Content-Type', 'application/json');
   httpRequest.send(JSON.stringify(requestData));
 };

};

Client.getInstance = function() {
  var client = new Client();
  return client;
};

// function getSkillsFromServer() {

//   var httpRequest = XMLHttpRequest();
//   httpRequest.onreadystatechange = function() {
//     if (httpRequest.readyState === 4) {

//     }
//   };
//   httpRequest.open('GET', 'http://localhost:9000/skills', true);
//   httpRequest.send(null);  

// }

//   function getEmployeesFromServer() { 

//   var httpRequest = XMLHttpRequest();
//   httpRequest.onreadystatechange = function() {
//     if (httpRequest.readyState === 4) {
//       // printIntoSpanNode(httpRequest.responseText, "employeePrintArea"); //TODO change
//     }
//   };
//   httpRequest.open('GET', 'http://localhost:9000/employees', true);
//   httpRequest.send(null);  
//   }
