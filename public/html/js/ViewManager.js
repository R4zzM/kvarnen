var ViewManager = function() {

    var self = this;

    this.showRoleAddForm = function() {

        self.hideAllForms();

        $("input#roleFormNameInput").val("");
        $("div#employeesWithRole").empty();

        var employees = ActiveTemplate.getInstance().getEmployees();
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

        $("input#roleUid").val(uid);
        $("input#roleFormNameInput").val(ActiveTemplate.getInstance().getRole(uid).name);
        $("div#employeesWithRole").empty();

        var roleObject = ActiveTemplate.getInstance().getRole(uid);
        var employees = ActiveTemplate.getInstance().getEmployees();
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

        $("input#employeeUid").val(uid);
        $("input#employeeNameInput").val(ActiveTemplate.getInstance().getEmployee(uid).name);
        $("select#minHoursPerDay").val(ActiveTemplate.getInstance().getEmployee(uid).minHoursDay);
        $("select#maxHoursPerDay").val(ActiveTemplate.getInstance().getEmployee(uid).maxHoursDay);
        $("select#minHoursPerWeek").val(ActiveTemplate.getInstance().getEmployee(uid).minHoursWeek);
        $("select#maxHoursPerWeek").val(ActiveTemplate.getInstance().getEmployee(uid).maxHoursWeek);

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
        var dayTemplate = ActiveTemplate.getInstance().getDayTemplate(uid);
        $("input#templateNameInput").val(ActiveTemplate.getInstance().getDayTemplate(uid).name);

        $("tbody#positionTableBody").empty();

        var roleName;
        var roleUid;
        var startTime;
        var endTime;
        for (var idx in dayTemplate.positions) {
            console.log("requiredRoleUid: " + dayTemplate.positions[idx].requiredRoleUid);
            console.log("startTime: " + dayTemplate.positions[idx].startTime);
            console.log("endTime: " + dayTemplate.positions[idx].endTime);
            roleName = ActiveTemplate.getInstance().getRole(dayTemplate.positions[idx].requiredRoleUid).name;
            requiredRoleUid = dayTemplate.positions[idx].requiredRoleUid;
            startTime = dayTemplate.positions[idx].startTime;
            endTime = dayTemplate.positions[idx].endTime;
            var row = Util.createPosTableRow(roleName, requiredRoleUid, startTime, endTime);
            $("tbody#positionTableBody").append(row);
        }

        var addPositionRow = Util.createPosTableAddRow();
        $("tbody#positionTableBody").append(addPositionRow);

        $("form#templateForm").show();
        $("div#addDayTemplateButton").hide();
        $("div#updateTemplateButton").show();
    };

    this.showAddWeekTemplateForm = function(uid) {
        self.hideAllForms();

        $("input#weekTemplateUid").val(uid);
        $("input#weekTemplateName").val("");

        $("select#mondayTemplate").empty();
        $("select#tuesdayTemplate").empty();
        $("select#wednesdayTemplate").empty();
        $("select#thursdayTemplate").empty();
        $("select#fridayTemplate").empty();
        $("select#saturdayTemplate").empty();
        $("select#sundayTemplate").empty();
        var dayTemplates = ActiveTemplate.getInstance().getDayTemplates();
        $.each(dayTemplates, function (idx, dayTemplate) {
            $("select#mondayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#tuesdayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#wednesdayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#thursdayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#fridayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#saturdayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#sundayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
        });

        $("form#addWeekTemplateForm").show();
        $("div#addWeekTemplateButton").show();
        $("div#updateWeekTemplateButton").hide();
    };

    this.showWeekTemplateUpdateForm = function(uid) {
        self.hideAllForms();

        var weekTemplate = ActiveTemplate.getInstance().getWeekTemplate(uid);

        $("input#weekTemplateUid").val(uid);

        $("input#weekTemplateName").val(weekTemplate.name);

        $("select#mondayTemplate").empty();
        $("select#tuesdayTemplate").empty();
        $("select#wednesdayTemplate").empty();
        $("select#thursdayTemplate").empty();
        $("select#fridayTemplate").empty();
        $("select#saturdayTemplate").empty();
        $("select#sundayTemplate").empty();
        var dayTemplates = ActiveTemplate.getInstance().getDayTemplates();
        $.each(dayTemplates, function (idx, dayTemplate) {
            $("select#mondayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#tuesdayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#wednesdayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#thursdayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#fridayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#saturdayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
            $("select#sundayTemplate").append(Util.createOptionNode(dayTemplate.name, dayTemplate.uid));
        });

        $("select#mondayTemplate").val(ActiveTemplate.getInstance().getDayTemplate(weekTemplate.mondayTemplateUid).name);

        $("select#tuesdayTemplate").val(ActiveTemplate.getInstance().getDayTemplate(weekTemplate.tuesdayTemplateUid).name);

        $("select#wednesdayTemplate").val(ActiveTemplate.getInstance().getDayTemplate(weekTemplate.wednesdayTemplateUid).name);

        $("select#thursdayTemplate").val(ActiveTemplate.getInstance().getDayTemplate(weekTemplate.thursdayTemplateUid).name);

        $("select#fridayTemplate").val(ActiveTemplate.getInstance().getDayTemplate(weekTemplate.fridayTemplateUid).name);

        $("select#saturdayTemplate").val(ActiveTemplate.getInstance().getDayTemplate(weekTemplate.saturdayTemplateUid).name);

        $("select#sundayTemplate").val(ActiveTemplate.getInstance().getDayTemplate(weekTemplate.sundayTemplateUid).name);

        $("form#addWeekTemplateForm").show();
        $("div#addWeekTemplateButton").hide();
        $("div#updateWeekTemplateButton").show();
    };


    this.showErrorAlert = function(message) {
        self.hideAllAlerts();
        $("#alertError").html(message);
        $("#alertError").fadeIn();

        setTimeout(function () {
            $("#alertError").fadeOut("slow");
        }, 5000);
    };

    this.showSuccessAlert = function(message) {
        self.hideAllAlerts();
        $("#alertSuccess").html(message);
        $("#alertSuccess").fadeIn("fast");

        setTimeout(function () {
            $("#alertSuccess").fadeOut("slow");
        }, 2000);
    };

    this.hideAllForms = function() {
        $("#addWeekTemplateForm").hide();
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

ViewManager.instance = null;

ViewManager.getInstance = function() {
    if(!ViewManager.instance) {
        ViewManager.instance = new ViewManager();
    }
    return ViewManager.instance;
};