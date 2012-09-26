AppController = function () {

    this.addEmployee = function() {
        var uid = UidGenerator.getInstance().generateUid();
        var employee =
        {
            "uid" : uid,
            "name" : $("input#employeeNameInput").val(),
            "minHoursWeek" : $("select#minHoursPerWeek").val(),
            "maxHoursWeek" : $("select#maxHoursPerWeek").val(),
            "minHoursDay" : $("select#minHoursPerDay").val(),
            "maxHoursDay" : $("select#maxHoursPerDay").val()
        };

        DataStorage.getInstance().addEmployee(employee);
        var listElement = Util.createListElement(employee.name, employee.uid, "ViewManager.getInstance().showEmployeeUpdateForm(" + employee.uid + ")");
        $(listElement).insertAfter("li#employees");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
    };

    this.removeEmployee = function() {
        var uid = $("input#employeeUid").val();

        DataStorage.getInstance().removeEmployee(uid);
        $("li#" + uid).fadeOut("slow", function () {
            $("li#" + uid).remove();
        });
        ViewManager.getInstance().hideAllForms();
    };

    this.updateEmployee = function() {
        var updatedEmployeeInformation =
        {
            "uid" : $("input#employeeUid").val(),
            "name" : $("input#employeeNameInput").val(),
            "minHoursWeek" : $("select#minHoursPerWeek").val(),
            "maxHoursWeek" : $("select#maxHoursPerWeek").val(),
            "minHoursDay" : $("select#minHoursPerDay").val(),
            "maxHoursDay" : $("select#maxHoursPerDay").val()
        };

        DataStorage.getInstance().updateEmployee(updatedEmployeeInformation);
        var oldListElement = $("li#" + updatedEmployeeInformation.uid);
        var newListElement = Util.createListElement(updatedEmployeeInformation.name, updatedEmployeeInformation.uid, "ViewManager.getInstance().showEmployeeUpdateForm(" + updatedEmployeeInformation.uid + ")");
        $(newListElement).hide();

        $(oldListElement).fadeOut("slow", function () {
            $(oldListElement).replaceWith(newListElement);
            $(newListElement).fadeIn("slow");
        });
    };

    this.addRole = function() {
        var employeeUids = [];
        $("input.employeeWithRole").each(function (idx, checkboxObject) {
            if (checkboxObject.checked) {
                employeeUids.push(checkboxObject.id);
            }
        });

        var uid = UidGenerator.getInstance().generateUid();
        var roleObject =
        {
            "uid" : uid,
            "name" : $("input#roleFormNameInput").val(),
            "employeeUids" : employeeUids
        };

        DataStorage.getInstance().addRole(roleObject);
        var listElement = Util.createListElement(roleObject.name, roleObject.uid, "ViewManager.getInstance().showRoleUpdateForm(" + roleObject.uid + ")");
        $(listElement).insertAfter("li#roles");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
    };

    this.removeRole = function() {
        var uid = $("input#roleUid").val();

        DataStorage.getInstance().removeRole(uid);
        $("li#" + uid).fadeOut("slow", function () {
            $("li#" + uid).remove();
        });
        ViewManager.getInstance().hideAllForms();
    };

    this.updateRole = function() {
        var employeeUids = [];
        $("input.employeeWithRole:checked").each(function (idx, checkboxObject) {
            employeeUids.push(checkboxObject.id);
        });

        var updatedRoleInformation =
        {
            "uid" : $("input#roleUid").val(),
            "name" : $("input#roleFormNameInput").val(),
            "employeeUids" : employeeUids
        };

        DataStorage.getInstance().removeRole(updatedRoleInformation);
        var oldListElement = $("li#" + updatedRoleInformation.uid);
        var newListElement = Util.createListElement(updatedRoleInformation.name, updatedRoleInformation.uid, "ViewManager.getInstance().showRoleUpdateForm(" + updatedRoleInformation.uid + ")");

        $(newListElement).hide();
        $(oldListElement).fadeOut("slow", function () {
            $(oldListElement).replaceWith(newListElement);
            $(newListElement).fadeIn("slow");
        });
    };

    this.addDayTemplate = function () {
        var uid = UidGenerator.getInstance().generateUid();
        var templateName = $("input#templateNameInput").val();

        var positions = [];
        $("tr.positionTableDynamicRow").each(function (index, element) {

            var requiredRoleUid = $(element).find(".positionTableRoleCol").attr('id');
            var startTime = $(element).find(".positionTableStartHourCol").text();
            var endTime = $(element).find(".positionTableEndHourCol").text();

            console.log(requiredRoleUid);

            var position = {
                "requiredRoleUid" : requiredRoleUid,
                "startTime" : startTime,
                "endTime" : endTime
            };
            positions.push(position);

        });

        var dayTemplate = {
            "uid" : uid,
            "name" : templateName,
            "positions" : positions
        };

        DataStorage.getInstance().addDayTemplate(dayTemplate);

        var listElement = Util.createListElement(templateName, dayTemplate.uid, "ViewManager.getInstance().showDayTemplateUpdateForm(" + dayTemplate.uid + ")");
        $(listElement).insertAfter("li#daily");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
    };

    this.removeDayTemplate = function() {
        var uid = $("input#dayTemplateUid").val();

        DataStorage.getInstance().removeDayTemplate(uid);
        $("li#" + uid).fadeOut("slow", function () {
            $("li#" + uid).remove();
        });
        ViewManager.getInstance().hideAllForms();
    };

    this.updateDayTemplate = function() {

        var positions = [];
        $("tr.positionTableDynamicRow").each(function (index, element) {

            var requiredRoleUid = $(element).find(".positionTableRoleCol").attr('id');
            var startTime = $(element).find(".positionTableStartHourCol").text();
            var endTime = $(element).find(".positionTableEndHourCol").text();

            var position = {
                "requiredRoleUid" : requiredRoleUid,
                "startTime" : startTime,
                "endTime" : endTime
            };
            positions.push(position);
        });

        var updatedDayTemplate =
        {
            "uid" : $("input#dayTemplateUid").val(),
            "name" : $("input#templateNameInput").val(),
            "positions" : positions
        };

        DataStorage.getInstance().updateDayTemplate(updatedDayTemplate);
        var oldListElement = $("li#" + updatedDayTemplate.uid);
        var newListElement = Util.createListElement(updatedDayTemplate.name, updatedDayTemplate.uid, "ViewManager.getInstance().showDayTemplateUpdateForm(" + updatedDayTemplate.uid + ")");

        $(newListElement).hide();
        $(oldListElement).fadeOut("slow", function () {
            $(oldListElement).replaceWith(newListElement);
            $(newListElement).fadeIn("slow");
        });
    };
};

AppController.instance = null;

AppController.getInstance = function() {
    if(!AppController.instance) {
        AppController.instance = new AppController();
    }
    return AppController.instance;
};