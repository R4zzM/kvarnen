AppController = function () {

  $.ajaxSetup({
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  });

  this.init = function() {

    var request = $.ajax({
      type: "GET",
      url: "init"
    });

    request.done(function (requestData) {
      var employeeList = requestData.employees;
      var roleList = requestData.roles;

      var listElement;
      var idx;
      for (idx in employeeList) {
        var employee = employeeList[idx];
        DataStorage.getInstance().addEmployee(employee);
        listElement = createListElement(employee.name, employee.uid, "ViewManager.getInstance().showEmployeeUpdateForm(" + employee.uid + ")");
        $(listElement).insertAfter("li#employees");
      }

      for (idx in roleList) {
        var role = roleList[idx];
        DataStorage.getInstance().addRole(roleList[idx]);
        listElement = createListElement(role.name, role.uid, "ViewManager.getInstance().showRoleUpdateForm(" + role.uid + ")");
        $(listElement).insertAfter("li#roles");
      }
    });

    request.fail(function (requestData) {
      ViewManager.getInstance().showErrorAlert("Kunde inte initiera!");
    });

  };

  this.addEmployee = function() {

    // Parse the DOM
    var employee =
    {
      "name" : $("input#employeeNameInput").val(),
      "minHoursWeek" : $("select#minHoursPerWeek").val(),
      "maxHoursWeek" : $("select#maxHoursPerWeek").val(),
      "minHoursDay" : $("select#minHoursPerDay").val(),
      "maxHoursDay" : $("select#maxHoursPerDay").val()
    };

    var request = $.ajax({
      url: "addemployee",
      data: JSON.stringify(employee)
    });

    request.done(function (responseData) {
        employee.uid = responseData.uid;
        DataStorage.getInstance().addEmployee(employee);
        var listElement = createListElement(employee.name, employee.uid, "ViewManager.getInstance().showEmployeeUpdateForm(" + employee.uid + ")");
        $(listElement).insertAfter("li#employees");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
    });

    request.fail(function (responseData) {
      ViewManager.getInstance().showErrorAlert("Tilläggning av person misslyckades! Felmeddelande: " + responseData.errorMsg);
    });

  };

  this.removeEmployee = function() {

    // Parse the DOM to fetch the employee id
    var requestData =
    {
      "uid" : $("input#employeeUid").val()
    };

    var request = $.ajax({
      url: "removeemployee",
      data: JSON.stringify(requestData)
    });

    request.done(function () {
        DataStorage.getInstance().removeEmployee(requestData.uid);
        $("li#" + requestData.uid).fadeOut("slow", function () {
          $("li#" + requestData.uid).remove();
        });
        ViewManager.getInstance().hideAllForms();
    });

    request.fail(function (responseData) {
      ViewManager.getInstance().showErrorAlert("Borttagning av person misslyckades! Felmeddelande: " + responseData.errorMsg);
    });

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

    var request = $.ajax({
      url: "updateemployee",
      data: JSON.stringify(updatedEmployeeInformation)
    });

    request.done(function (responseData) {
      updatedEmployeeInformation.uid = responseData.uid;
      DataStorage.getInstance().updateEmployee(updatedEmployeeInformation);
      var oldListElement = $("li#" + updatedEmployeeInformation.uid);
      var newListElement = createListElement(updatedEmployeeInformation.name, updatedEmployeeInformation.uid, "ViewManager.getInstance().showEmployeeUpdateForm(" + updatedEmployeeInformation.uid + ")");
      $(newListElement).hide();

      $(oldListElement).fadeOut("slow", function () {
        $(oldListElement).replaceWith(newListElement);
        $(newListElement).fadeIn("slow");
      });
      
      ViewManager.getInstance().showSuccessAlert("Uppdatering av informationen lyckades!");
    });

    request.fail(function (responseData) {
      ViewManager.getInstance().showErrorAlert("Tilläggning av person misslyckades! Felmeddelande: " + responseData.errorMsg);
    });

};

  this.addRole = function() {

      // get all the employees that has the role (= checkbox is checked)
      var employeeUids = [];
      $("input.employeeWithRole").each(function (idx, checkboxObject) {
        if (checkboxObject.checked) {
          employeeUids.push(checkboxObject.id);
        }
      });

      // create request structure
      var roleObject =
      {
        "name" : $("input#roleFormNameInput").val(),
        "employeeUids" : employeeUids
      };

      var request = $.ajax({
        url: "addrole",
        data: JSON.stringify(roleObject)
      });

      request.done(function (responseData) {
        roleObject.uid = responseData.uid;
        DataStorage.getInstance().addRole(responseData);
        var listElement = createListElement(responseData.name, responseData.uid, "ViewManager.getInstance().showRoleUpdateForm(" + responseData.uid + ")");
        $(listElement).insertAfter("li#roles");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
      });

      request.fail(function (responseData) {
        ViewManager.getInstance().showErrorAlert("Tilläggning av roll misslyckades! Felmeddelande: " + responseData.errorMsg);
      });

    };

    this.removeRole = function() {

      var role =
      {
        "uid" : $("input#roleUid").val()
      };

      var request = $.ajax({
        url: "removerole",
        data: JSON.stringify(role)
      });

      request.done(function (responseData) {
        DataStorage.getInstance().removeRole(role.uid);
        $("li#" + role.uid).fadeOut("slow", function () {
          $("li#" + role.uid).remove();
        });
        ViewManager.getInstance().hideAllForms();
      });

      request.fail(function (responseData) {
        ViewManager.getInstance().showErrorAlert("Rollen kunde inte tas bort! Felmeddelande: " + responseData.errorMsg);
      });

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

      var request = $.ajax({
        url: "updaterole",
        data: JSON.stringify(updatedRoleInformation)
      });

      request.done(function (responseData) {
        updatedRoleInformation.uid = responseData.uid;
        DataStorage.getInstance().removeRole(updatedRoleInformation);
        var oldListElement = $("li#" + responseData.uid);
        var newListElement = createListElement(updatedRoleInformation.name, updatedRoleInformation.uid, "ViewManager.getInstance().showRoleUpdateForm(" + updatedRoleInformation.uid + ")");
        $(newListElement).hide();

        $(oldListElement).fadeOut("slow", function () {
          $(oldListElement).replaceWith(newListElement);
          $(newListElement).fadeIn("slow");
        });
        
        ViewManager.getInstance().showSuccessAlert("Uppdatering av informationen lyckades!");
      });

      request.fail(function (responseData) {
        ViewManager.getInstance().showErrorAlert("Uppdatering av roll misslyckades! Felmeddelande: " + responseData.errorMsg);
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

      var request = $.ajax({
        url: "adddaytemplate",
        data: JSON.stringify(dayTemplate)
      });

      request.done(function (responseData) {
        dayTemplate.uid = responseData.uid;
        DataStorage.getInstance().addDayTemplate(dayTemplate);

        var listElement = createListElement(templateName, responseData.uid, "ViewManager.getInstance().showDayTemplateUpdateForm(" + responseData.uid + ")");

        // add it to the list and make it fade in.
        $(listElement).insertAfter("li#daily");
        $(listElement).hide();
        $(listElement).fadeIn("slow");
      });

      request.fail(function (responseData) {
        ViewManager.getInstance().showErrorAlert("Tilläggning av mall misslyckades! Felmeddelande: " + responseData.errorMsg);
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