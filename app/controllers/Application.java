package controllers;

import java.util.List;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;

import engine.Employee;
import engine.EngineController;
import engine.Role;
import engine.uid.OutOfUidsException;
import play.*;
import play.libs.Json;
import play.mvc.*;
import session.SessionManager;

public class Application extends Controller {

	//	private static Logger logger = (Logger) LoggerFactory.getLogger(Application.class);

	private static EngineController engineController = null;

	public static Result init() {

		Logger.debug("init(): START");

		Result result = null;

		if (engineController == null) {
			try {
				engineController = SessionManager.getInstance().newSession(); //TODO: should be redone
				result = ok();
			} catch (Exception e) {
				result = internalServerError(createJsonErrorMessage("Exception when creating session. Msg: " + e.getMessage()));
			}
		} else {
			result = ok();
		}

		Logger.debug("init(): END. Result = " + result.toString());

		return result; 
	}

	public static Result addEmployee() {

		// format
		// {"addemployee" : <employeeInfo>}
		// employeeInfo: {"name" : <value>, "min_hours_day" : <value>, "max_hours_day" : <value>, 
		// "min_hours_week" : <value>, "max_hours_week" : <value>, "skills" : [<skill1>, <skill2>, ... <skillN>]}

		Logger.debug("addEmployee(): START");

		Result result = null;
		JsonNode json = request().body().asJson();

		if (json != null) {

			boolean success = true;

			String name = json.path("name").asText();
			if (name == null || name.equals("")) {
				success = false;
				Logger.error("Parameter error: name. Value: " + name);
				result = badRequest(createJsonErrorMessage("Parameter error: name. Value: " + name));
			}

			int minHoursDay = json.path("minHoursDay").asInt(-1);
			if (minHoursDay == -1) {
				success = false;
				Logger.error("Parameter error: minHoursDay");
				result = badRequest(createJsonErrorMessage("Parameter error: minHoursDay"));
			}

			int maxHoursDay = json.path("maxHoursDay").asInt(-1);
			if (maxHoursDay == -1) {
				success = false;
				Logger.error("Parameter error: maxHoursDay");
				result = badRequest(createJsonErrorMessage("Parameter error: maxHoursDay"));
			}

			int minHoursWeek = json.path("minHoursWeek").asInt(-1);
			if (minHoursWeek == -1) {
				success = false;
				Logger.error("Parameter error: minHoursWeek");
				result = badRequest(createJsonErrorMessage("Parameter error: minHoursWeek"));
			}

			int maxHoursWeek = json.path("maxHoursWeek").asInt(-1);
			if (maxHoursWeek == -1) {
				success = false;
				Logger.error("Parameter error: maxHoursWeek");
				result = badRequest(createJsonErrorMessage("Parameter error: maxHoursWeek"));
			}

			// TODO: handle skills field.

			if (success) {
				Employee newEmployee = null;
				try {
					newEmployee = engineController.getEmployeeDirectory().createNewEmployee(name, minHoursDay, maxHoursDay, minHoursWeek, maxHoursWeek);
					
					// create the response
					ObjectNode response = Json.newObject();
					response.put("uid", newEmployee.getUid());
					result = ok(response);
				} catch (OutOfUidsException e) {
					Logger.error("addEmployee(): Exception caught. Msg: " + e.getMessage());
					result = internalServerError(createJsonErrorMessage(e.getMessage()));
				}
			}

		} else {
			Logger.info("addEmployee(): Malformed Request: " + request().body().asText());
			result = badRequest(createJsonErrorMessage("Malformed request!"));
		}

		Logger.debug("addEmployee(): END. Result = " + result.toString());

		return result;
	}
	
	// TODO: Serious!! This is the same code as in removeSkill. The architecture should probably be rethought...
	public static Result removeEmployee() {
		
		// format
		// {"uid" : <uid>}

		Logger.debug("removeEmployee: START");

		Result result = null;
		JsonNode json = request().body().asJson();
		if (json != null) {

			boolean success = true;

			int uid = json.path("uid").asInt(-1);
			Logger.debug("uid = " + uid);
			if (uid == -1) {
				success = false;
				Logger.debug("removeEmployee: Parameter error: uid. Value: " + uid);
				result = badRequest(createJsonErrorMessage("Parameter error: id. Value: " + uid));
			}

			if (success) {
				engineController.getEmployeeDirectory().removeEmployee(uid); 
				result = ok();
			}

		} else {
			Logger.debug("removeEmployee: Invalid Request. Cannot parse json.");
			result = badRequest(createJsonErrorMessage("Request is invalid"));
		}

		Logger.debug("removeEmployee: END. Result = " + result.toString());

		return result;
		
	}

	//	public static Result updateEmployee() {
	//		
	//		// format
	//		// {"addemployee" : <employeeInfo>}
	//		// employeeInfo: {"name" : <value>, "min_hours_day" : <value>, "max_hours_day" : <value>, 
	//		// "min_hours_week" : <value>, "max_hours_week" : <value>, "skills" : [<skill1>, <skill2>, ... <skillN>]}
	//		
	//		Logger.debug("addEmployee(): START");
	//		
	//		Result result = null;
	//		JsonNode json = request().body().asJson();
	//		if (json != null) {
	//			JsonNode employeeInfo = json.path("addemployee");
	//		    if(employeeInfo != null) {
	//		      
	//		    	boolean success = true;
	//		    	
	//				String name = employeeInfo.path("name").asText();
	//				if (name == null) {
	//					success = false;
	//					Logger.error("Parameter error: name. Value: " + name);
	//					result = badRequest("Parameter error: name. Value: " + name);
	//				}
	//				
	//				int minHoursDay = employeeInfo.path("minHoursDay").asInt(-1);
	//				if (minHoursDay == -1) {
	//					success = false;
	//					Logger.error("Parameter error: minHoursDay");
	//					result = badRequest("Parameter error: minHoursDay");
	//				}
	//				
	//				int maxHoursDay = employeeInfo.path("maxHoursDay").asInt(-1);
	//				if (maxHoursDay == -1) {
	//					success = false;
	//					Logger.error("Parameter error: maxHoursDay");
	//					result = badRequest("Parameter error: maxHoursDay");
	//				}
	//				
	//				int minHoursWeek = employeeInfo.path("minHoursWeek").asInt(-1);
	//				if (minHoursWeek == -1) {
	//					success = false;
	//					Logger.error("Parameter error: minHoursWeek");
	//					result = badRequest("Parameter error: minHoursWeek");
	//				}
	//				
	//				int maxHoursWeek = employeeInfo.path("maxHoursWeek").asInt(-1);
	//				if (maxHoursWeek == -1) {
	//					success = false;
	//					Logger.error("Parameter error: maxHoursWeek");
	//					result = badRequest("Parameter error: maxHoursWeek");
	//				}
	//		    	
	//				// TODO: handle skills field.
	//				
	//				if (success) {
	//					Employee newEmployee = engineController.getEmployeeDirectory().createNewEmployee(name, minHoursDay, maxHoursDay, minHoursWeek, maxHoursWeek);
	//					
	//					// create the response
	//					ObjectNode response = Json.newObject();
	//					response.put("id", newEmployee.getId());
	//					
	//					result = ok(response);
	//				}
	//		    	
	//		    } else {
	//		    	Logger.error("Missing parameter: addemployee");
	//		    	return badRequest("Missing parameter: addemployee");
	//		    }
	//		} else {
	//			Logger.error("Request is invalid");
	//			result = badRequest("Request is invalid");
	//		}
	//		
	//		Logger.debug("addEmployee(): END. Result = " + result.toString());
	//		
	//		return result;
	//	}

	public static Result getEmployees() {
		Logger.debug("getEmployees(): START");
		Result result = null;
		EngineController ec = engineController; //TODO: should be obtained via session manager
		ObjectNode jsonResponse = getEmployeesJsonResponse(ec);
		result = ok(jsonResponse);
		Logger.debug("getEmployees(): END. Result = " + result.toString());
		return ok(jsonResponse);  
	}

	public static Result getSkills() {
		Logger.debug("getSkills(): START");
		Result result = null;
		EngineController ec = engineController; //TODO: should be obtained via session manager
		ObjectNode jsonResponse = getSkillsJsonReponse(ec);
		result = ok(jsonResponse);
		Logger.debug("getSkills(): END. Result = " + result.toString());
		return result;
	}

	public static Result addSkill() {

		// format
		// {"addskill" : <skillInfo>}
		// skillInfo: {"name" : <value>, "employees" : [<employee1>, <employee2>, ... <employeeN>]}

		Logger.debug("addSkill: START");

		Result result = null;
		JsonNode json = request().body().asJson();
		if (json != null) {

			boolean success = true;

			String name = json.path("name").asText();
			Logger.debug("name = " + name);
			if (name == null || name.equals("")) {
				success = false;
				result = badRequest(createJsonErrorMessage("Parameter error: name. Value: " + name));
			}

			if (success) {
				try {
					Role skill = engineController.getSkillDirectory().createNewRole(name);

					ObjectNode response = Json.newObject();
					response.put("uid", skill.getUid());
					result = ok(response);

				} catch (OutOfUidsException e) {
					Logger.error("addSkill: Exception caught. Msg:" + e.getMessage());
					result = internalServerError(createJsonErrorMessage(e.getMessage()));
				}
							}

			// TODO: handle employees field.

		} else {
			result = badRequest(createJsonErrorMessage("Request is malformed"));
		}

		Logger.debug("addSkill: END. Result = " + result.toString());

		return result;
	}

	public static Result updateSkill() {

		// format
		// {"name" : <name>, "employees" : [<employee1>, <employee2>, ... <employeeN>]}

		Logger.debug("updateSkill: START");

		Result result = null;
		JsonNode json = request().body().asJson();
		if (json != null) {

			boolean success = true;

			String name = json.path("name").asText();
			Logger.debug("name = " + name);
			if (name == null) {
				success = false;
				result = badRequest(createJsonErrorMessage("Parameter error: name. Value: " + name));
			}

			if (success) {
				// TODO!!! Add update skill method!!
				//				Skill skill = engineController.getSkillDirectory().updateSkill(name); 
				result = ok();
			}

			// TODO: handle employees field.

		} else {
			result = badRequest(createJsonErrorMessage("Malformed request!"));
		}

		Logger.debug("updateSkill: END. Result = " + result.toString());

		return result;
	}

	public static Result removeSkill() {

		// format
		// {"uid" : <uid>}

		Logger.debug("removeSkill: START");

		Result result = null;
		JsonNode json = request().body().asJson();
		if (json != null) {

			boolean success = true;

			int uid = json.path("uid").asInt(-1);
			Logger.debug("uid = " + uid);
			if (uid == -1) {
				success = false;
				Logger.debug("removeSkill: Parameter error: id. Value: " + uid);
				result = badRequest(createJsonErrorMessage("Parameter error: id. Value: " + uid));
			}

			if (success) {
				engineController.getSkillDirectory().removeRole(uid); 
				result = ok();
			}

		} else {
			Logger.debug("removeSkill: Invalid Request. Cannot parse json.");
			result = badRequest(createJsonErrorMessage("Request is invalid"));
		}

		Logger.debug("removeSkill: END. Result = " + result.toString());

		return result;
	}

	private static ObjectNode getEmployeesJsonResponse(EngineController engineController) {

		// The format of the json reponse:
		// {"employees" : [ {employeeInfo1}, {employeeInfo2}, ... {employeeInfoN}] 
		// employeeInfoN: {"name" : <value>, "min_hours_day" : <value>, "max_hours_day" : <value>, 
		// "min_hours_week" : <value>, "max_hours_week" : <value>, "skills" : [<skill1>, <skill2>, ... <skillN>]}
		ObjectNode employees = Json.newObject();
		ArrayNode employeeInfoArray = Json.newObject().arrayNode();

		List<Employee> employeeList = engineController.getEmployeeDirectory().getAllEmployees();
		for (int i = 0; i < employeeList.size(); i++) {

			// Get the data.
			String name = employeeList.get(i).getName();
			int minHoursDay = employeeList.get(i).getMinHoursPerDay();
			int maxHoursDay = employeeList.get(i).getMaxHoursPerDay();
			int minHoursWeek = employeeList.get(i).getMinHoursPerWeek();
			int maxHoursWeek = employeeList.get(i).getMaxHoursPerWeek();
			List<Role> skills =  employeeList.get(i).getRoles();

			// Create employeeInfo json structure
			ObjectNode employeeInfo = Json.newObject();
			ArrayNode employeeSkillsArray = Json.newObject().arrayNode();

			// fill in the skills array
			for (int j = 0; j < skills.size(); j++) {
				employeeSkillsArray.add(skills.get(j).getName());
			}

			employeeInfo.put("name", name);
			employeeInfo.put("minHoursDay", minHoursDay);
			employeeInfo.put("maxHoursDay", maxHoursDay);
			employeeInfo.put("minHoursWeek", minHoursWeek);
			employeeInfo.put("maxHoursWeek", maxHoursWeek);
			employeeInfo.put("skills", employeeSkillsArray);

			employeeInfoArray.add(employeeInfo);
		}

		employees.put("employees", employeeInfoArray);

		return employees;
	}

	private static ObjectNode getSkillsJsonReponse(EngineController ec) {

		// The format of the json response:
		// skills: {"skills" : [<skillInfo1>, <skillInfo2>, ... <skillInfoN>]}
		// skillInfo: {"skill" : <value>, "employees" : [<employee1>, ... <employeeN>]}
		ObjectNode skills = Json.newObject();
		ArrayNode skillInfoArray = Json.newObject().arrayNode();

		List<Role> skillList = engineController.getSkillDirectory().getAllRoles();
		for (int i = 0; i < skillList.size(); i++) {

			List<Employee> employeesWithSkill = skillList.get(i).getEmployees();

			// Create skillInfo json structure
			ObjectNode skillInfo = Json.newObject();
			ArrayNode skillEmployeesArray = Json.newObject().arrayNode();

			// fill in the skills array
			for (int j = 0; j < employeesWithSkill.size(); j++) {
				skillEmployeesArray.add(employeesWithSkill.get(j).getName());
			}

			skillInfo.put("name", skillList.get(i).getName());
			skillInfo.put("employees", skillEmployeesArray);

			skillInfoArray.add(skillInfo);
		}

		skills.put("skills", skillInfoArray);

		return skills;
	}
	
	// Simple method to packet an error message as JSON.
	private static String createJsonErrorMessage(String errorMsg) {
		
		String errorMessage = "{\"errorMsg\" : \"" + errorMsg + "\"}";
		return errorMessage;
	}
}