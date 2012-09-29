var ActiveTemplate = function() {

  var self = this;

  localStorage.employees = [];
  localStorage.roles = [];
  localStorage.dayTemplates = [];

  this.getEmployees = function() {
    return JSON.parse(localStorage.employees);
  };

  this.getEmployee = function(uid) {
    var employees = JSON.parse(localStorage.employees);
    for (var idx in employees) {
      if(employees[idx].uid === uid) {
        return employees[idx];
      }
    }
    return null;
  };

  this.addEmployee = function(employee) {
    var employees = JSON.parse(localStorage.employees);
    employees.push(employee);
    localStorage.employees = employees;
  };

  this.removeEmployee = function (uid) {
    var employees = JSON.parse(localStorage.employees);
    for (var i = 0; i < employees.length; i++) {
      if(employees[i].uid == uid) {
        employees.splice(i,1);
        localStorage.employees = employees;
        break;
      }
    }
  };

  this.updateEmployee = function(newEmployee) {
    self.removeEmployee(newEmployee.uid);
    self.addEmployee(newEmployee);
  };

  this.getRoles = function() {
    return JSON.parse(localStorage.roles);
  };

  this.getRole = function(uid) {
    var roles = JSON.parse(localStorage.roles);
    for (var idx in roles) {
      if(roles[idx].uid == uid) {
        return roles[idx];
      }
    }
    return null;
  };

  this.addRole = function(role) {
    var roles = JSON.parse(localStorage.roles);
    roles.push(role);
    localStorage.roles = roles;
  };

  this.removeRole = function (uid) {
    var roles = JSON.parse(localStorage.roles);
    for (var i = 0; i < roles.length; i++) {
      if(roles[i].uid == uid) {
        roles.splice(i,1);
        localStorage.roles = roles;
        break;
      }
    }
  };

  this.updateRole = function (newRole) {
    self.removeRole(newRole.uid);
    self.addRole(newRole);
  };

  this.getDayTemplates = function() {
    return JSON.parse(localStorage.dayTemplates);
  };

  this.getDayTemplate = function(uid) {
    var dayTemplates = JSON.parse(localStorage.dayTemplates);
    for (var idx in dayTemplates) {
      if(dayTemplates[idx].uid == uid) {
        return dayTemplates[idx];
      }
    }
    return null;
  };

  this.addDayTemplate = function(dayTemplate) {
    var days = localStorage.dayTemplates;
    days.push(dayTemplate);
    localStorage.dayTemplates = days;
  };

};

var TemplateArchive = function () {


};

// Singleton
ActiveTemplate.instance = null;
TemplateArchive.instance = null;

ActiveTemplate.getInstance = function () {
  if (!ActiveTemplate.instance) {
    ActiveTemplate.instance = new ActiveTemplate();
  }
  return ActiveTemplate.instance;
};

TemplateArchive.getInstance = function () {
  if (!TemplateArchive.instance) {
    TemplateArchive.instance = new TemplateArchive();
  }
  return TemplateArchive.instance;
};