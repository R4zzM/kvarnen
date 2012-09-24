var DataStorage = function() {

	var self = this;

	var employees = [];
	var roles = [];
	var dayTemplates = [];

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

};

DataStorage.instance = null;

DataStorage.getInstance = function () {
	if (!DataStorage.instance) {
		DataStorage.instance = new DataStorage();
	} 
	return DataStorage.instance;
};