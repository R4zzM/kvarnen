var Client = function () {

  // Singleton design pattern junk
  if (arguments.callee.instance) {
    return arguments.callee.instance;
  }
  arguments.callee.instance = this;

  // variables
  var employees = [];
  var roles = []; 

  //public methods
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

  this.getEmployee = function(uid) {
    for each (var employee in employees) {
      if(employee.uid === uid) {
        return employee;
      }
    }
    return null;
  };

  this.getEmployees = function() {
    return employees;
  };

  this.addEmployee = function(employeeObject, responseHandler) {

    var httpRequest = XMLHttpRequest();

    // take care of the http reponse
    httpRequest.onreadystatechange = function() {

      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {

          employeeObject.uid = getIdFromJsonBody(httpRequest.responseText);

          // Add to list of all contacts 
          employees.push(employeeObject);
          responseHandler(true, employeeObject);
        } else {
          var errorMsg = getErrorMessage(httpRequest.responseText);
          responseHandler(false, errorMsg);
        }
      }
    };

    httpRequest.open('POST', 'http://localhost:9000/addemployee', true); // TODO: localhost. 
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(employeeObject));
  };

  this.updateEmployee = function(employeeObject, responseHandler) {
    var httpRequest = XMLHttpRequest();

    // take care of the http reponse
    httpRequest.onreadystatechange = function() { 

      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {

          var employeeObjectResponse = JSON.parse(httpRequest.responseText); // should be the same as the object that was sent.
          removeEmployee(employeeObject.uid);

          // Add to list of all contacts 
          employees.push(employeeObjectResponse);
          responseHandler(true, employeeObjectResponse);
        } else {
          var errorMsg = getErrorMessage(httpRequest.responseText);
          responseHandler(false, errorMsg);
        }
      }
    };

    httpRequest.open('POST', 'http://localhost:9000/updateemployee', true); // TODO: localhost. 
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(employeeObject));
  };

  this.removeEmployee = function(requestData, responseHandler) {
    var httpRequest = XMLHttpRequest();

     // Response handler
     httpRequest.onreadystatechange = function() {
       if (httpRequest.readyState === 4) {
         if (httpRequest.status === 200) {

         // Remove role from list
         removeEmployee(requestData.uid);
         
         responseHandler(true, requestData.uid);
       } else {
         var errorMsg = getErrorMessage(httpRequest.responseText);
         responseHandler(false, errorMsg);
       }
     }
   };

   httpRequest.open('POST', 'http://localhost:9000/removeemployee', true);
   httpRequest.setRequestHeader('Content-Type', 'application/json');
   httpRequest.send(JSON.stringify(requestData));
  };

  this.getRole = function(uid) {
    for each (var role in roles) {
      if(role.uid === uid) {
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

          //roleObject.uid = getIdFromJsonBody(httpRequest.responseText);
          var addedRoleObject = JSON.parse(httpRequest.responseText);
          // Add to list of all contacts
          roles.push(addedRoleObject);
          responseHandler(true, addedRoleObject);        
          } else { // Non 200-reponse
          var errorMsg = getErrorMessage(httpRequest.responseText);
          responseHandler(false, errorMsg);
        }
      }
    };

    httpRequest.open('POST', 'http://localhost:9000/addrole', true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(roleObject));
  };

  this.updateRole = function(roleObject, responseHandler) {
    var httpRequest = XMLHttpRequest();

    // take care of the http reponse
    httpRequest.onreadystatechange = function() { 

      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {

          var roleObjectResponse = JSON.parse(httpRequest.responseText); // should be the same as the object that was sent. Should be verified...
          removeRole(roleObject.uid);

          // Add to list of all roles 
          roles.push(roleObjectResponse);
          responseHandler(true, roleObjectResponse);
        } else {
          var errorMsg = getErrorMessage(httpRequest.responseText);
          responseHandler(false, errorMsg);
        }
      }
    };

    httpRequest.open('POST', 'http://localhost:9000/updaterole', true); // TODO: localhost. 
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(roleObject));
  };

  this.removeRole = function(roleObject, responseHandler) {

    var httpRequest = XMLHttpRequest();

     // Response handler
     httpRequest.onreadystatechange = function() {
       if (httpRequest.readyState === 4) {
         if (httpRequest.status === 200) {

         // Remove role from list
         for (var i = 0; i < roles.length; i++) {
           if(roles[i].uid === roleObject.uid) {
             roles.splice(i,i);
           }
         }

         responseHandler(true, roleObject.uid);
       } else {
         var errorMsg = getErrorMessage(httpRequest.responseText);
         responseHandler(false, errorMsg);
       }
     }
   }

   httpRequest.open('POST', 'http://localhost:9000/removerole', true);
   httpRequest.setRequestHeader('Content-Type', 'application/json');
   httpRequest.send(JSON.stringify(roleObject));
 };

 var removeEmployee = function (uid) {
  // Remove role from list
  for (var i = 0; i < employees.length; i++) {
    if(employees[i].uid == uid) {
      employees.splice(i,1);
    }
   }         
 }  

 var removeRole = function (uid) {
  // Remove role from list
  for (var i = 0; i < roles.length; i++) {
    if(roles[i].uid == uid) {
      roles.splice(i,1);
    }
   }  
 }

  // private methods (TODO: intended, this is probably not best practice)
 var getErrorMessage = function(jsonData) {

    // parse the response to get the error message
    var errorMsg;
    JSON.parse(jsonData, function (key, value) {
       if (key === "errorMsg") {
        errorMsg = value;
      }
    });
    return errorMsg;
 };

  var getIdFromJsonBody = function(jsonData) {

    // parse the response to get the uid
    var uid;
    JSON.parse(jsonData, function (key, value) {
       if (key === "uid") {
        uid = value;
      }
    });
    return uid;
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
