    function addEmployee() {

      // Parse the DOM
      var employeeObject = 
      {
        "name" : $("input#employeeNameInput").val(), 
        "minHoursWeek" : $("select#minHoursPerWeek").val(), 
        "maxHoursWeek" : $("select#maxHoursPerWeek").val(), 
        "minHoursDay" : $("select#minHoursPerDay").val(), 
        "maxHoursDay" : $("select#maxHoursPerDay").val() 
      };

      client.addEmployee(employeeObject, function (success, data) {

        if (success) {
          var addedEmployee = data;

          var listElement = createListElement(addedEmployee.name, addedEmployee.uid, "showEmployeeUpdateForm(" + addedEmployee.uid + ")");
          
          // make it fade into the sidebar
          $(listElement).insertAfter("li#employees");
          $(listElement).hide();
          $(listElement).fadeIn("slow");
        } else {          
          var error = data;
          showErrorAlert("Tilläggning av person misslyckades! Felmeddelande: " + error);
        }
      });
    }