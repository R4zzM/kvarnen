var Util = {

// creates an element for the left side selection list
createListElement: function (name, uid, onClickFunction) {
  var listElement = $("<li></li>");
  var anchorElement = $("<a href=\"#\"></a>");
  $(listElement).attr('id', uid);
  $(anchorElement).attr('onClick', onClickFunction);
  $(anchorElement).html(name);
  $(listElement).append(anchorElement);
  return listElement;
},

createCheckboxElement: function (name, uid, checked) {
  var checkboxLabel = $("<label class=\"checkbox\"></label>");
  var checkbox = $("<input class=\"employeeWithRole\" type=\"checkbox\">");
  checkbox.attr('id', new Number(uid).toString());
  if (checked == 'on') {
    $(checkbox).attr('checked', 'on');
  }
  $(checkboxLabel).append(name);
  $(checkboxLabel).append(checkbox);
  return checkboxLabel;
},

createPosTableRow: function (roleName, roleUid, startHour, endHour) {
  var row = $("<tr></tr>");
  $(row).attr('class', 'positionTableDynamicRow');

  var roleCol = $("<td></td");
  $(roleCol).attr('class', 'positionTableRoleCol');
  $(roleCol).attr('id', roleUid);

  $(roleCol).html(roleName);

  var startHourCol = $("<td></td");
  $(startHourCol).attr('class', 'positionTableStartHourCol');
  $(startHourCol).html(startHour);

  var endHourCol = $("<td></td");
  $(endHourCol).attr('class', 'positionTableEndHourCol');
  $(endHourCol).html(endHour);

  var removeButtonCol = $("<td><a class=\"btn btn-small\" href=\"#\"><i class=\"icon-minus-sign\"></i></a></td>");
  $(removeButtonCol).attr('onclick', "ViewManager.getInstance().removePosTableRow(this.parentNode)");

  $(row).append(roleCol);
  $(row).append(startHourCol);
  $(row).append(endHourCol);
  $(row).append(removeButtonCol);

  return row;
},

createPosTableAddRow: function () {
  var permanentAddRow = $("<tr></tr>");
  permanentAddRow.attr('id', 'permanentPositionAddRow');

  var roleSelectorCol = $("<td></td>");
  var roleSelector = $("<select id=\"positionRoleSelect\"></select>");

  var roles = DataStorage.getInstance().getRoles();
  for (var idx in roles) {
    var optionNode = Util.createOptionNode(roles[idx].name, roles[idx].uid);
    $(roleSelector).append(optionNode);
  }

  roleSelectorCol.append(roleSelector);

  var startTimeSelectorCol = $("<td></td>");
  var startTimeSelector = $("<select id=\"positionStartTimeSelect\"></select>");
  var endTimeSelectorCol = $("<td></td>");
  var endTimeSelector = $("<select id=\"positionEndTimeSelect\"></select>");
  var hour;
  for (var i = 0; i < 24; i++) {
    if (i < 9) {
      hour = "0" + i;
    } else {
      hour = i;
    }
    startTimeSelector.append($("<option>" + i + "</option>"));
    endTimeSelector.append($("<option>" + i + "</option>"));
  }

  var addButtonCol = $("<td></td>");
  var button = $("<a class=\"btn btn-small\" href=\"#\" onClick=\"ViewManager.getInstance().insertPosTableRow()\"><i class=\"icon-plus-sign\"></i></a>\"");
  addButtonCol.append(button);


  startTimeSelectorCol.append(startTimeSelector);
  endTimeSelectorCol.append(endTimeSelector);

  permanentAddRow.append(roleSelectorCol);
  permanentAddRow.append(startTimeSelectorCol);
  permanentAddRow.append(endTimeSelectorCol);
  permanentAddRow.append(addButtonCol);

  return permanentAddRow;
},

createOptionNode: function (optionText, id) {
  var optionNode = $("<option></option>");
  $(optionNode).attr('class', 'requiredRoleOption');
  $(optionNode).html(optionText);
  if (id) {
    $(optionNode).attr('id', id);
  }
  return optionNode;
}
}

