var ViewManager = function() {

	var self = this;

	this.showRoleAddForm = function() {

		self.hideAllForms();

		$("input#roleFormNameInput").val("");
		$("div#employeesWithRole").empty();

		var employees = DataStorage.getInstance().getEmployees();
		$.each(employees, function (idx, employee) {
			var checkbox = Util.createCheckboxElement(employee.name, employee.uid, 'off');
			$("div#employeesWithRole").append(checkbox);
		});

		$("form#addRoleForm").show();
		$("div#addRoleButton").show();
		$("div#updateRoleButton").hide();
	};

	this.showRoleUpdateForm = function(uid) {
		
		self.hideAllForms();

		console.log("roleUid: " + uid);

		// Set the form values
		$("input#roleUid").val(uid);
		$("input#roleFormNameInput").val(DataStorage.getInstance().getRole(uid).name);
		$("div#employeesWithRole").empty();

		// add the employee with role checkbuttons and set checked state
		var roleObject = DataStorage.getInstance().getRole(uid);
		var employees = DataStorage.getInstance().getEmployees();
		console.log("associatedEmployees: " + roleObject.employeeUids);
		$.each(employees, function (idx, employee) {
			var checkbox;
			console.log("employeeUid: " + employee.uid);
			if ($.inArray(employee.uid, roleObject.employeeUids) >= 0) {
				checkbox = Util.createCheckboxElement(employee.name, employee.uid, 'on');
				$("div#employeesWithRole").append(checkbox);
			} else {
				checkbox = Util.createCheckboxElement(employee.name, employee.uid, 'off');
				$("div#employeesWithRole").append(checkbox);
			}
		});

		// Show / Hide part of forms
		$("form#addRoleForm").show();
		$("div#addRoleButton").hide();
		$("div#updateRoleButton").show();
	};

	this.showEmployeeAddForm = function() {
		self.hideAllForms();

		$("input#employeeNameInput").val("");
		$("select#minHoursPerDay").val(0);
		$("select#maxHoursPerDay").val(0);
		$("select#minHoursPerWeek").val(0);
		$("select#maxHoursPerWeek").val(0);

		$("form#addEmployeeForm").show();
		$("div#addEmployeeButton").show();
		$("div#updateEmployeeButton").hide();
	};

	this.showEmployeeUpdateForm = function(uid) {
		self.hideAllForms();

		console.log("Uid: " + uid);

	  // Set the form values
	  $("input#employeeUid").val(uid);
	  $("input#employeeNameInput").val(DataStorage.getInstance().getEmployee(uid).name);
	  $("select#minHoursPerDay").val(DataStorage.getInstance().getEmployee(uid).minHoursDay);
	  $("select#maxHoursPerDay").val(DataStorage.getInstance().getEmployee(uid).maxHoursDay);
	  $("select#minHoursPerWeek").val(DataStorage.getInstance().getEmployee(uid).minHoursWeek);
	  $("select#maxHoursPerWeek").val(DataStorage.getInstance().getEmployee(uid).maxHoursWeek);

	  // Show / Hide part of forms 
	  $("form#addEmployeeForm").show();
	  $("div#addEmployeeButton").hide();
	  $("div#updateEmployeeButton").show();
	};

	this.showDayTemplateAddForm = function() {
		self.hideAllForms();

		$("input#templateNameInput").val("");

		$("tbody#positionTableBody").empty();

		var addPositionRow = Util.createPosTableAddRow();
		$("tbody#positionTableBody").append(addPositionRow);

		$("form#templateForm").show();
		$("div#addDayTemplateButton").show();
		$("div#updateTemplateButton").hide();
	};

	this.showDayTemplateUpdateForm = function(uid) {
		self.hideAllForms();

		console.log("Uid: " + uid);

		$("input#dayTemplateUid").val(uid);
		var dayTemplate = DataStorage.getInstance().getDayTemplate(uid);
		$("input#templateNameInput").val(DataStorage.getInstance().getDayTemplate(uid).name);

	  // reset and populate position table.
	  $("tbody#positionTableBody").empty();      

	  var roleName;
	  var roleUid;
	  var startTime;
	  var endTime;
	  for (var idx in dayTemplate.positions) {
	  	console.log("requiredRoleUid: " + dayTemplate.positions[idx].requiredRoleUid);
	  	console.log("startTime: " + dayTemplate.positions[idx].startTime);
	  	console.log("endTime: " + dayTemplate.positions[idx].endTime);
	  	roleName = DataStorage.getInstance().getRole(dayTemplate.positions[idx].requiredRoleUid).name;
	  	requiredRoleUid = dayTemplate.positions[idx].requiredRoleUid;
	  	startTime = dayTemplate.positions[idx].startTime;
	  	endTime = dayTemplate.positions[idx].endTime;
	  	var row = Util.createPosTableRow(roleName, requiredRoleUid, startTime, endTime);
	  	$("tbody#positionTableBody").append(row);      
	  }

	  // append the "add position row"
	  var addPositionRow = Util.createPosTableAddRow();
	  $("tbody#positionTableBody").append(addPositionRow);
	  
	  $("form#templateForm").show();
	  $("div#addDayTemplateButton").hide();
	  $("div#updateTemplateButton").show();
	};


	this.showErrorAlert = function(message) {
		self.hideAllAlerts();
		$("#alertError").html(message);
		$("#alertError").fadeIn();

	  // remove message after timeout
	  setTimeout(function () {
	  	$("#alertError").fadeOut("slow");
	  }, 5000);
	};

	this.showSuccessAlert = function(message) {
		self.hideAllAlerts();
		$("#alertSuccess").html(message);
		$("#alertSuccess").fadeIn("fast");

	  // remove the message
	  setTimeout(function () {
	  	$("#alertSuccess").fadeOut("slow");
	  }, 2000);
	};

	this.hideAllForms = function() {
		$("#addEmployeeForm").hide();
		$("#addRoleForm").hide();
		$("#templateForm").hide();
	};

	this.hideAllAlerts = function() {
		$("#alertSuccess").hide();
		$("#alertError").hide();
	};

	this.insertPosTableRow = function() {
		var roleName = $("select#positionRoleSelect").val();
		var roleUid = $("select#positionRoleSelect option:selected").attr('id');
		var startHour = $("select#positionStartTimeSelect").val();
		var endHour = $("select#positionEndTimeSelect").val();

		var row = Util.createPosTableRow(roleName, roleUid, startHour, endHour);
		$(row).insertBefore("tr#permanentPositionAddRow");
	};

	this.removePosTableRow = function(row) {
		$(row).remove();
	};
};

// Singleton
ViewManager.instance = null;

ViewManager.getInstance = function() {
	if(!ViewManager.instance) {
		ViewManager.instance = new ViewManager();
	}
	return ViewManager.instance;
};