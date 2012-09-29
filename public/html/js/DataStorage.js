var ActiveTemplate = function() {

  var self = this;

  this.uidCounter = 0;

  if (localStorage.uidCounter) {
    self.uidCounter = parseInt(localStorage.uidCounter, 10);
  }

  if (!localStorage.employees) {
    localStorage.employees = JSON.stringify([]);
  }
  
  if (!localStorage.roles) {
    localStorage.roles = JSON.stringify([]);
  }
  
  if (!localStorage.dayTemplates) {
    localStorage.dayTemplates = JSON.stringify([]);
  }
  
  if (!localStorage.weeks) {
    localStorage.weeks = JSON.stringify([]);
  }

  this.nextUid = function() {
    self.uidCounter++;
    localStorage.uidCounter = self.uidCounter;
    return self.uidCounter;
  };

  this.getEmployees = function() {
    return JSON.parse(localStorage.employees);
  };

  this.getEmployee = function(uid) {
    var employees = JSON.parse(localStorage.employees);
    for (var idx in employees) {
      console.log("employees[idx].uid: " + employees[idx].uid);
      console.log("uid: " + uid);
      if(parseInt(employees[idx].uid, 10) == uid) {
        var retval = employees[idx];
        retval.uid = parseInt(employees[idx].uid, 10);
        return retval;
      }
    }
    return null;
  };

  this.addEmployee = function(employee) {
    if (!employee.uid) {
      employee.uid = self.nextUid();
    }
    var employees = JSON.parse(localStorage.employees);
    employees.push(employee);
    localStorage.employees = JSON.stringify(employees);
    return employee.uid;
  };

  this.removeEmployee = function (uid) {
    var employees = JSON.parse(localStorage.employees);
    for (var i = 0; i < employees.length; i++) {
      if(parseInt(employees[i].uid, 10) == uid) {
        employees.splice(i,1);
        localStorage.employees = JSON.stringify(employees);
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
      if(parseInt(roles[idx].uid, 10) == uid) {
        var retval = roles[idx];
        retval.uid = parseInt(roles[idx].uid, 10);
        return retval;
      }
    }
    return null;
  };

  this.addRole = function(role) {
    if (!role.uid) {
      role.uid = self.nextUid();
    }
    var roles = JSON.parse(localStorage.roles);
    roles.push(role);
    localStorage.roles = JSON.stringify(roles);
    return role.uid;
  };

  this.removeRole = function (uid) {
    var roles = JSON.parse(localStorage.roles);
    for (var i = 0; i < roles.length; i++) {
      if(parseInt(roles[i].uid, 10) == uid) {
        roles.splice(i,1);
        localStorage.roles = JSON.stringify(roles);
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
      if(parseInt(dayTemplates[idx].uid, 10) == uid) {
        var retval = dayTemplates[idx];
        retval.uid = parseInt(dayTemplates[idx].uid, 10);
        return retval;
      }
    }
    return null;
  };

  this.addDayTemplate = function(dayTemplate) {
    if (!dayTemplate.uid) {
      dayTemplate.uid = self.nextUid();
    }
    var days = JSON.parse(localStorage.dayTemplates);
    days.push(dayTemplate);
    localStorage.dayTemplates = JSON.stringify(days);
    return dayTemplate.uid;
  };

  this.removeDayTemplate = function (uid) {
    var days = JSON.parse(localStorage.dayTemplates);
    for (var i = 0; i < days.length; i++) {
      if(parseInt(days[i].uid, 10) == uid) {
        days.splice(i,1);
        localStorage.dayTemplates = JSON.stringify(days);
        break;
      }
    }
  };

  this.updateDayTemplate = function (newDayTemplate) {
    self.removeDayTemplate(newDayTemplate.uid);
    self.addDayTemplate(newDayTemplate);
  };

  this.getWeekTemplates = function() {
    return JSON.parse(localStorage.weeks);
  };

  this.getWeekTemplate = function(uid) {
    var weeks = JSON.parse(localStorage.weeks);
    for (var idx in weeks) {
      if(parseInt(weeks[idx].uid, 10) == uid) {
        var retval = weeks[idx];
        retval.uid = parseInt(weeks[idx].uid, 10);
        return retval;
      }
    }
    return null;
  };

  this.addWeekTemplate = function(week) {
    if (!week.uid) {
      week.uid = self.nextUid();
    }
    var weeks = JSON.parse(localStorage.weeks);
    weeks.push(week);
    localStorage.weeks = JSON.stringify(weeks);
    return week.uid;
  };

  this.removeWeekTemplate = function (uid) {
    var weeks = JSON.parse(localStorage.weeks);
    for (var i = 0; i < weeks.length; i++) {
      if(parseInt(weeks[i].uid, 10) == uid) {
        weeks.splice(i,1);
        localStorage.weeks = JSON.stringify(weeks);
        break;
      }
    }
  };

  this.updateWeekTemplate = function (newWeek) {
    self.removeWeekTemplate(newWeek.uid);
    self.addWeekTemplate(newWeek);
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