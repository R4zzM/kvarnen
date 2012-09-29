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

        DataStorage.getInstance().updateRole(updatedRoleInformation);
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

    this.addWeekTemplate = function () {
        var uid = UidGenerator.getInstance().generateUid();
        var templateName = $("input#weekTemplateName").val();

        var weekTemplate = {
            "uid" : uid,
            "name" : templateName,
            "mondayTemplateUid" : $("select#mondayTemplate option:selected").attr("id"),
            "tuesdayTemplateUid" : $("select#tuesdayTemplate option:selected").attr("id"), 
            "wednesdayTemplateUid" : $("select#wednesdayTemplate option:selected").attr("id"), 
            "thursdayTemplateUid" : $("select#thursdayTemplate option:selected").attr("id"), 
            "fridayTemplateUid" : $("select#fridayTemplate option:selected").attr("id"), 
            "saturdayTemplateUid" : $("select#saturdayTemplate option:selected").attr("id"), 
            "sundayTemplateUid" : $("select#sundayTemplate option:selected").attr("id")
        };

        DataStorage.getInstance().addWeekTemplate(weekTemplate);

        var listElement = Util.createListElement(templateName, weekTemplate.uid, "ViewManager.getInstance().showWeekTemplateUpdateForm(" + weekTemplate.uid + ")");
        $(listElement).insertAfter("li#weekly");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
    };

    this.removeWeekTemplate = function() {
        var uid = $("input#weekTemplateUid").val();

        console.log(uid);

        DataStorage.getInstance().removeWeekTemplate(uid);
        $("li#" + uid).fadeOut("slow", function () {
            $("li#" + uid).remove();
        });
        ViewManager.getInstance().hideAllForms();
    };

    this.updateWeekTemplate = function() {

        var updatedWeekTemplate =
        {
            "uid" : $("input#weekTemplateUid").val(),
            "name" : $("input#weekTemplateName").val(),
            "mondayTemplateUid" : $("select#mondayTemplate option:selected").attr("id"),
            "tuesdayTemplateUid" : $("select#tuesdayTemplate option:selected").attr("id"), 
            "wednesdayTemplateUid" : $("select#wednesdayTemplate option:selected").attr("id"), 
            "thursdayTemplateUid" : $("select#thursdayTemplate option:selected").attr("id"), 
            "fridayTemplateUid" : $("select#fridayTemplate option:selected").attr("id"), 
            "saturdayTemplateUid" : $("select#saturdayTemplate option:selected").attr("id"), 
            "sundayTemplateUid" : $("select#sundayTemplate option:selected").attr("id")
        };

        DataStorage.getInstance().updateWeekTemplate(updatedWeekTemplate);
        var oldListElement = $("li#" + updatedWeekTemplate.uid);
        var newListElement = Util.createListElement(updatedWeekTemplate.name, updatedWeekTemplate.uid, "ViewManager.getInstance().showWeekTemplateUpdateForm(" + updatedWeekTemplate.uid + ")");

        $(newListElement).hide();
        $(oldListElement).fadeOut("slow", function () {
            $(oldListElement).replaceWith(newListElement);
            $(newListElement).fadeIn("slow");
        });
    };

    this.saveCurrentTemplate = function () {

      var templateName = $("input#templateName").val();

      var employees = DataStorage.getInstance().getEmployees();
      var roles = DataStorage.getInstance().getRole();
      var days = DataStorage.getInstance().getDayTemplates();
      var weeks = DataStorage.getInstance().getWeekTemplates();

      var data = {
        "employees" : employees,
        "roles" : roles,
        "days" : days,
        "weeks" : weeks
      };

      var template = {
        "name" : templateName,
        "data" : data
      };

      var request = $.ajax ({
        url: 'savetemplate',
        type: 'POST',
        dataType: 'application/json',
        data: template
      });

      request.success = function () {
        ViewManager.getInstance().showSuccessAlert("Mallen har sparats!");
      };

      request.error = function () {
        ViewManager.getInstance().showErrorAlert("Sparning misslyckades!");
      };

    };

    this.loadAllTemplatesFromServer = function (uid) {

    };

};

AppController.instance = null;

AppController.getInstance = function() {
    if(!AppController.instance) {
        AppController.instance = new AppController();
    }
    return AppController.instance;
};