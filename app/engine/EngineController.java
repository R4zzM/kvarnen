package engine;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import JaCoP.constraints.Alldifferent;
import JaCoP.constraints.XeqC;
import JaCoP.constraints.XgtC;
import JaCoP.core.IntVar;
import JaCoP.core.Store;
import JaCoP.search.DepthFirstSearch;
import JaCoP.search.IndomainMin;
import JaCoP.search.IndomainRandom;
import JaCoP.search.InputOrderSelect;
import JaCoP.search.LargestMin;
import JaCoP.search.MinDomainOverDegree;
import JaCoP.search.MostConstrainedDynamic;
import JaCoP.search.MostConstrainedStatic;
import JaCoP.search.Search;
import JaCoP.search.SelectChoicePoint;
import JaCoP.search.SimpleSelect;
import JaCoP.search.SmallestDomain;
import JaCoP.search.TimeOutListener;
import JaCoP.set.constraints.EinA;

public class EngineController implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String sessionId = null;
	
	private EmployeeDirectory employeeDirectory = null;
	private SkillDirectory skillDirectory = null;
	
	public EngineController() {
		sessionId = generateSessionId();
		employeeDirectory = new EmployeeDirectory();
		skillDirectory = new SkillDirectory();
	}
	
	public EngineController(String sessionId) {
		this.sessionId = sessionId;
		employeeDirectory = new EmployeeDirectory();
		skillDirectory = new SkillDirectory();
	}
	
	public EmployeeDirectory getEmployeeDirectory() {
		return employeeDirectory;
	}
	
	public SkillDirectory getSkillDirectory() {
		return skillDirectory;
	}
	
	public String getSessionId() {
		return sessionId;
	}
	
	public static void main (String[] args) {
		new EngineController().simpleTest();
	}
	
	// TODO: temp method.
	public void simpleTest() {
		// Create some data.
		Employee catharina = employeeDirectory.createNewEmployee("Catharina Johansson", 0, 12 ,0, 120);
		Employee julia = employeeDirectory.createNewEmployee("Julia Collinius", 4, 10, 20, 60);
		Employee ida = employeeDirectory.createNewEmployee("Ida Collinius", 4, 10, 20, 70);
		Employee hans = employeeDirectory.createNewEmployee("Hans Johansson", 0, 12, 0, 40);
		
		Skill kitchen = skillDirectory.createNewSkill("Kitchen");
		Skill cafe = skillDirectory.createNewSkill("Cafe");
		Skill washing = skillDirectory.createNewSkill("Washing");
		
		// skills to employees
		julia.addSkill(cafe);
		julia.addSkill(washing);
		
		ida.addSkill(cafe);
		ida.addSkill(washing);
		
		catharina.addSkill(kitchen);
		catharina.addSkill(cafe);
		catharina.addSkill(washing);
		
		hans.addSkill(washing);
		
		// employees to skills
		kitchen.addEmployee(catharina);
		
		cafe.addEmployee(julia);
		cafe.addEmployee(ida);
		cafe.addEmployee(catharina);
		
		washing.addEmployee(julia);
		washing.addEmployee(ida);
		washing.addEmployee(catharina);
		washing.addEmployee(hans);
		
		System.out.println(catharina);
		System.out.println(julia);
		System.out.println(ida);
		System.out.println(hans);
		
		System.out.println(kitchen);
		System.out.println(cafe);
		System.out.println(washing);

		Store store = new Store();
		Date today = new Date();
		
		Week week = new Week(this, store);
		
		Calendar startTime = Calendar.getInstance();
		Calendar endTime = Calendar.getInstance();
		
		startTime.set(Calendar.HOUR_OF_DAY, 8);
		endTime.set(Calendar.HOUR_OF_DAY, 12);
		week.tuesday().newPosition(kitchen, startTime.getTime(), endTime.getTime());
		week.wednesday().newPosition(kitchen, startTime.getTime(), endTime.getTime());
		week.thursday().newPosition(kitchen, startTime.getTime(), endTime.getTime());
		week.friday().newPosition(kitchen, startTime.getTime(), endTime.getTime());
		week.saturday().newPosition(kitchen, startTime.getTime(), endTime.getTime());
		week.sunday().newPosition(kitchen, startTime.getTime(), endTime.getTime());
		
		startTime.set(Calendar.HOUR_OF_DAY, 8);
		endTime.set(Calendar.HOUR_OF_DAY, 16);
		week.tuesday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.wednesday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.thursday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.friday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.saturday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.sunday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		
		startTime.set(Calendar.HOUR_OF_DAY, 12);
		endTime.set(Calendar.HOUR_OF_DAY, 16);
		week.tuesday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.wednesday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.thursday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.friday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.saturday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		week.sunday().newPosition(cafe, startTime.getTime(), endTime.getTime());
		
		startTime.set(Calendar.HOUR_OF_DAY, 14);
		endTime.set(Calendar.HOUR_OF_DAY, 18);
		week.tuesday().newPosition(washing, startTime.getTime(), endTime.getTime());
		week.wednesday().newPosition(washing, startTime.getTime(), endTime.getTime());
		week.thursday().newPosition(washing, startTime.getTime(), endTime.getTime());
		week.friday().newPosition(washing, startTime.getTime(), endTime.getTime());
		week.saturday().newPosition(washing, startTime.getTime(), endTime.getTime());
		week.sunday().newPosition(washing, startTime.getTime(), endTime.getTime());
		
		// prepare schedule
		boolean success = true;
		try {
			week.monday().imposeConstraints();
			week.tuesday().imposeConstraints();
			week.wednesday().imposeConstraints();
			week.thursday().imposeConstraints();
			week.friday().imposeConstraints();
			week.saturday().imposeConstraints();
			week.sunday().imposeConstraints();
			week.imposeWeeklyWorktimeConstraint();
		} catch (Exception e) {
			success = false;
			System.out.println("dailySchedule.lockAndImposeConstraints() failed with exception: " + e.getMessage());
			e.printStackTrace();
		}
		
		if (success){
			List<IntVar> allVariables = week.getVariables();
			
//			week.tuesday().printTemplateWithDomains();
			
			// Search for a solution. 
			Search<IntVar> search = new DepthFirstSearch<IntVar>();
			search.setTimeOut(10);

			// TODO: Make sure that the variables are suited for the selection process so that the schedule generation is fast!!!!
			SelectChoicePoint<IntVar> select = new SimpleSelect<IntVar>(allVariables.toArray(new IntVar[1]), new SmallestDomain<IntVar>(), new MostConstrainedDynamic<IntVar>(), new IndomainRandom<IntVar>());
			boolean result = search.labeling(store, select);
			if (result) {
				week.printTemplate();
				week.printPopulatedSchedule();
			} else {
				System.out.println("No solutions found! :(");
			}
		}
	}
	
	// TODO: Should be more robust in a production system (cryptograpic identifier typ md5).
	private String generateSessionId() {
		int digit1 = (int)(Math.random()*10);
		int digit2 = (int)(Math.random()*10);
		int digit3 = (int)(Math.random()*10);
		int digit4 = (int)(Math.random()*10);
		
		return new String(String.valueOf(digit1) + String.valueOf(digit2) + String.valueOf(digit3) + String.valueOf(digit4));
	}
}
