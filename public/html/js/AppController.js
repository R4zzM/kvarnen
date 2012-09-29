AppController = function () {

    this.addEmployee = function() {
        var employee =
        {
            "name" : $("input#employeeNameInput").val(),
            "minHoursWeek" : $("select#minHoursPerWeek").val(),
            "maxHoursWeek" : $("select#maxHoursPerWeek").val(),
            "minHoursDay" : $("select#minHoursPerDay").val(),
            "maxHoursDay" : $("select#maxHoursPerDay").val()
        };

        var uid = ActiveTemplate.getInstance().addEmployee(employee);
        var listElement = Util.createListElement(employee.name, uid, "ViewManager.getInstance().showEmployeeUpdateForm(" + uid + ")");
        $(listElement).insertAfter("li#employees");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
    };

    this.addEmployees = function (employees) {
        $.each(employees, function(idx, employee) {
          var listElement = Util.createListElement(employee.name, employee.uid, "ViewManager.getInstance().showEmployeeUpdateForm(" + employee.uid + ")");
          $(listElement).insertAfter("li#employees");
          $(listElement).hide();
          $(listElement).fadeIn("slow");
        });
    };
 
    this.removeEmployee = function() {
        var uid = $("input#employeeUid").val();

        ActiveTemplate.getInstance().removeEmployee(uid);
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

        ActiveTemplate.getInstance().updateEmployee(updatedEmployeeInformation);
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

        var roleObject =
        {
            "name" : $("input#roleFormNameInput").val(),
            "employeeUids" : employeeUids
        };

        var uid = ActiveTemplate.getInstance().addRole(roleObject);
        var listElement = Util.createListElement(roleObject.name, uid, "ViewManager.getInstance().showRoleUpdateForm(" + uid + ")");
        $(listElement).insertAfter("li#roles");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
    };

    this.addRoles = function (roles) {
        $.each(roles, function(idx, role) {
          var listElement = Util.createListElement(role.name, role.uid, "ViewManager.getInstance().showRoleUpdateForm(" + role.uid + ")");
          $(listElement).insertAfter("li#roles");
          $(listElement).hide();
          $(listElement).fadeIn("slow");
        });
    };

    this.removeRole = function() {
        var uid = $("input#roleUid").val();

        ActiveTemplate.getInstance().removeRole(uid);
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

        ActiveTemplate.getInstance().updateRole(updatedRoleInformation);
        var oldListElement = $("li#" + updatedRoleInformation.uid);
        var newListElement = Util.createListElement(updatedRoleInformation.name, updatedRoleInformation.uid, "ViewManager.getInstance().showRoleUpdateForm(" + updatedRoleInformation.uid + ")");

        $(newListElement).hide();
        $(oldListElement).fadeOut("slow", function () {
            $(oldListElement).replaceWith(newListElement);
            $(newListElement).fadeIn("slow");
        });
    };

    this.addDayTemplate = function () {
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
            "name" : templateName,
            "positions" : positions
        };

        var uid = ActiveTemplate.getInstance().addDayTemplate(dayTemplate);

        var listElement = Util.createListElement(templateName, uid, "ViewManager.getInstance().showDayTemplateUpdateForm(" + uid + ")");
        $(listElement).insertAfter("li#daily");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
    };

    this.addDays = function (days) {
        $.each(days, function(idx, day) {
          var listElement = Util.createListElement(day.name, day.uid, "ViewManager.getInstance().showDayTemplateUpdateForm(" + day.uid + ")");
          $(listElement).insertAfter("li#daily");
          $(listElement).hide();
          $(listElement).fadeIn("slow");
        });
    };

    this.removeDayTemplate = function() {
        var uid = $("input#dayTemplateUid").val();

        ActiveTemplate.getInstance().removeDayTemplate(uid);
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

        ActiveTemplate.getInstance().updateDayTemplate(updatedDayTemplate);
        var oldListElement = $("li#" + updatedDayTemplate.uid);
        var newListElement = Util.createListElement(updatedDayTemplate.name, updatedDayTemplate.uid, "ViewManager.getInstance().showDayTemplateUpdateForm(" + updatedDayTemplate.uid + ")");

        $(newListElement).hide();
        $(oldListElement).fadeOut("slow", function () {
            $(oldListElement).replaceWith(newListElement);
            $(newListElement).fadeIn("slow");
        });
    };

    this.addWeekTemplate = function () {
        var templateName = $("input#weekTemplateName").val();

        var weekTemplate = {
            "name" : templateName,
            "mondayTemplateUid" : $("select#mondayTemplate option:selected").attr("id"),
            "tuesdayTemplateUid" : $("select#tuesdayTemplate option:selected").attr("id"),
            "wednesdayTemplateUid" : $("select#wednesdayTemplate option:selected").attr("id"),
            "thursdayTemplateUid" : $("select#thursdayTemplate option:selected").attr("id"),
            "fridayTemplateUid" : $("select#fridayTemplate option:selected").attr("id"),
            "saturdayTemplateUid" : $("select#saturdayTemplate option:selected").attr("id"),
            "sundayTemplateUid" : $("select#sundayTemplate option:selected").attr("id")
        };

        var uid = ActiveTemplate.getInstance().addWeekTemplate(weekTemplate);

        var listElement = Util.createListElement(templateName, uid, "ViewManager.getInstance().showWeekTemplateUpdateForm(" + uid + ")");
        $(listElement).insertAfter("li#weekly");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
    };

    this.addWeeks = function (weeks) {
        $.each(weeks, function(idx, week) {
          var listElement = Util.createListElement(week.name, week.uid, "ViewManager.getInstance().showWeekTemplateUpdateForm(" + week.uid + ")");
          $(listElement).insertAfter("li#weekTemplates");
          $(listElement).hide();
          $(listElement).fadeIn("slow");
        });
    };

    this.removeWeekTemplate = function() {
        var uid = $("input#weekTemplateUid").val();

        console.log(uid);

        ActiveTemplate.getInstance().removeWeekTemplate(uid);
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

        ActiveTemplate.getInstance().updateWeekTemplate(updatedWeekTemplate);
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

      var employees = ActiveTemplate.getInstance().getEmployees();
      var roles = ActiveTemplate.getInstance().getRole();
      var days = ActiveTemplate.getInstance().getDayTemplates();
      var weeks = ActiveTemplate.getInstance().getWeekTemplates();

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