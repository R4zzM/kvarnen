var DataStorage = function() {

	var self = this;

	var employees = [];
	var roles = [];
	var dayTemplates = [];
	var weekTemplates = [];

	this.getEmployees = function() {
		return employees;
	};

	this.getEmployee = function(uid) {
		console.log(uid);
		console.log(employees);
		for (var idx in employees) {
			if(employees[idx].uid === uid) {
				return employees[idx];
			}
		}
		return null;
	};

	this.addEmployee = function(employee) {
		employees.push(employee);
	};

	this.removeEmployee = function (uid) {
	  for (var i = 0; i < employees.length; i++) {
	  	if(employees[i].uid == uid) {
	  		employees.splice(i,1);
	  	}
	  }
	};

	this.updateEmployee = function(newEmployee) {
		self.removeEmployee(newEmployee.uid);
		self.addEmployee(newEmployee);
	};

	this.getRoles = function() {
		return roles;
	};

	this.getRole = function(uid) {
		for (var idx in roles) {
			if(roles[idx].uid == uid) {
				return roles[idx];
			}
		}
		return null;
	};

	this.addRole = function(role) {
		roles.push(role);
	};

	this.removeRole = function (uid) {
	  for (var i = 0; i < roles.length; i++) {
	  	if(roles[i].uid == uid) {
	  		roles.splice(i,1);
	  	}
	  }
	};

	this.updateRole = function (newRole) {
		self.removeRole(newRole.uid);
		self.addRole(newRole);
	};

	this.getDayTemplates = function() {
		return dayTemplates;
	};

	this.getDayTemplate = function(uid) {
		for (var idx in dayTemplates) {
			if(dayTemplates[idx].uid == uid) {
				return dayTemplates[idx];
			}
		}
		return null;
	};

	this.addDayTemplate = function(dayTemplate) {
		dayTemplates.push(dayTemplate);
	};

	this.removeDayTemplate = function (uid) {
	  for (var i = 0; i < dayTemplates.length; i++) {
	  	if(dayTemplates[i].uid == uid) {
	  		dayTemplates.splice(i,1);
	  	}
	  }
	};

	this.updateDayTemplate = function (newDayTemplate) {
		self.removeDayTemplate(newDayTemplate.uid);
		self.addDayTemplate(newDayTemplate);
	};

	this.getWeekTemplates = function() {
		return weekTemplates;
	};

	this.getWeekTemplate = function(uid) {
		for (var idx in weekTemplates) {
			if(weekTemplates[idx].uid == uid) {
				return weekTemplates[idx];
			}
		}
		return null;
	};

	this.addWeekTemplate = function(weekTemplate) {
		weekTemplates.push(weekTemplate);
	};

	this.removeWeekTemplate = function (uid) {
	  for (var i = 0; i < weekTemplates.length; i++) {
	  	if(weekTemplates[i].uid == uid) {
	  		weekTemplates.splice(i,1);
	  	}
	  }
	};

	this.updateWeekTemplate = function (newWeekTemplate) {
		self.removeWeekTemplate(newWeekTemplate.uid);
		self.addWeekTemplate(newWeekTemplate);
	};


};

DataStorage.instance = null;

DataStorage.getInstance = function () {
	if (!DataStorage.instance) {
		DataStorage.instance = new DataStorage();
	} 
	return DataStorage.instance;
};