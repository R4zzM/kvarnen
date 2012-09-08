var Client = function () {

  // Singleton design pattern junk
  if (arguments.callee.instance) {
    return arguments.callee.instance;
  }

  // instance variables
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

  };

  // should be last in class
  arguments.callee.instance = this;

};

Client.getInstance = function() {
  var client = new Client();
  return client;
};

// function init() {
//   var httpRequest = XMLHttpRequest();
//   httpRequest.onreadystatechange = function() {
//     if (httpRequest.readyState === 4) {
//       if (!httpRequest.status === 200) {
//         alert('Init request failed!');
//       } 
//     }
//   };
//   httpRequest.open('GET', 'http://localhost:9000/init', true);
//   httpRequest.send(null);    
// }

// function sendAddEmployeeRequest() {
//   var firstName = document.getElementById("employeeFirstNameInput").value;
//   var minHoursWeek = document.getElementById("minHoursPerWeek").value;
//   var maxHoursWeek = document.getElementById("maxHoursPerWeek").value;
//   var minHoursDay = document.getElementById("minHoursPerDay").value;
//   var maxHoursDay = document.getElementById("maxHoursPerDay").value;

//   var employeeObject = {"name" : firstName, "minHoursWeek" : minHoursWeek, "maxHoursWeek" : maxHoursWeek, "minHoursDay" : minHoursDay, "maxHoursDay" : maxHoursDay, "skills" : []};
//   var jsonRequestObject = {"addemployee" : employeeObject};

//   var httpRequest = XMLHttpRequest();

//   // response handler
//   httpRequest.onreadystatechange = function() {

//     if (httpRequest.readyState === 4) {
//       if (httpRequest.status === 200) {

//         // Set the id of the contact
//         JSON.parse(httpRequest.responseText, function (key, value) {
//           if (key === "id") {
//              employeeObject.id = value;
//           }
//         });

//         // Add to list of all contacts 
//         employees.push(employeeObject);

//         // add clickable entry in the list
//         $("<li><a href=\"#\" onClick=\"showEmployeeUpdateForm(" + employeeObject.id + ")\">" + firstName + "</a></li>").insertAfter("li#employees"); // TODO: add onClick attribute.
//       } else {
//         alert('Non-200 response received!'); // TODO add nice twitter bootstrap error message.
//       }
//     }
//   };

//   httpRequest.open('POST', 'http://localhost:9000/addemployee', true); // TODO: localhost. 
//   httpRequest.setRequestHeader('Content-Type', 'application/json');
//   httpRequest.send(JSON.stringify(jsonRequestObject));
// }

// function sendAddSkillRequest() {
//   var skillName = document.getElementById("skillFormNameInput").value;
//   var skillObject = {"name" : skillName};
//   var jsonRequestObject = {"addskill" : skillObject};
//   var httpRequest = XMLHttpRequest();

//   // Response handler
//   httpRequest.onreadystatechange = function() {
//     if (httpRequest.readyState === 4) {
//       if (httpRequest.status === 200) {

//         // Set the id of the contact
//         JSON.parse(httpRequest.responseText, function (key, value) {
//           if (key === "id") {
//              skillObject.id = value;
//           }
//         });

//         // Add to list of all contacts
//          skills.push(skillObject);

//         // add clickable entry in the list
//         $("<li id=\"skill-" + skillObject.id + "\"><a href=\"#\" onClick=\"showSkillUpdateForm(" + skillObject.id + ")\">" + skillName + "</a></li>").insertAfter("li#skills");

//       } else {
//         alert('There was a problem with the request.'); // TODO!
//       }
//     }
//   };

//   httpRequest.open('POST', 'http://localhost:9000/addskill', true);
//   httpRequest.setRequestHeader('Content-Type', 'application/json');
//   httpRequest.send(JSON.stringify(jsonRequestObject));
// }

// function removeSkill(id) {
//   var jsonData = {"id" : id};

//   var httpRequest = XMLHttpRequest();

//   // Response handler
//   httpRequest.onreadystatechange = function() {
//     if (httpRequest.readyState === 4) {
//       if (httpRequest.status === 200) {

//         // Remove skill
//         removeSkill(id);

//         // Remove clickable entry in the list
//         $("li#skill-"+id).remove();

//       } else {
//         alert('There was a problem with the request.'); // TODO!
//       }
//     }
// }
// }

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

// // function getSkill(id) {
// //   for each (var skill in skills) {
// //     if(skill.id === id) {
// //       return skill;
// //     }
// //   }
// //   return null;
// // }

// function removeSkill(id) {
//   for (var i = 0; i < skills.length; i++) {
//     if(skill.id === id) {
//       skills.splice(1,1);
//     }
//   }
// }

// // function getEmployee(id) {
// //   for each (var employee in employees) {
// //     if(employee.id === id) {
// //       return employee;
// //     }
// //   }
// //   return null;
// // }