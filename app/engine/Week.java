package engine;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import JaCoP.constraints.GCC;
import JaCoP.core.IntVar;
import JaCoP.core.Store;


public class Week implements Serializable {

	private static final long serialVersionUID = 1493675123887886402L;

	private static final int DAYS_IN_WEEK = 7;
	
	public static final int DAY_MONDAY = 0;
	public static final int DAY_TUESDAY = 1;
	public static final int DAY_WEDNESDAY = 2;
	public static final int DAY_THURSDAY = 3;
	public static final int DAY_FRIDAY = 4;
	public static final int DAY_SATURDAY = 5;
	public static final int DAY_SUNDAY = 6;
	
	private Day[] days = null;
	
	private Store store = null;
	
	private EngineController ec = null;
	
	public Week(EngineController ec, Store store) {
		// TODO: Fix Date!!
		this.ec = ec;
		this.store = store;
		this.days = new Day[DAYS_IN_WEEK];
		this.days[DAY_MONDAY] = new Day(ec, store, new Date());
		this.days[DAY_TUESDAY] = new Day(ec, store, new Date());
		this.days[DAY_WEDNESDAY] = new Day(ec, store, new Date());
		this.days[DAY_THURSDAY] = new Day(ec, store, new Date());
		this.days[DAY_FRIDAY] = new Day(ec, store, new Date());
		this.days[DAY_SATURDAY] = new Day(ec, store, new Date());
		this.days[DAY_SUNDAY] = new Day(ec, store, new Date());
	}
	
	public Day getSchedule(int day) {
		return days[day];
	}
	
	public Day monday() {
		return days[DAY_MONDAY];
	}
	
	public Day tuesday() {
		return days[DAY_TUESDAY];
	}
	
	public Day wednesday() {
		return days[DAY_WEDNESDAY];
	}
	
	public Day thursday() {
		return days[DAY_THURSDAY];
	}
	
	public Day friday() {
		return days[DAY_FRIDAY];
	}
	
	public Day saturday() {
		return days[DAY_SATURDAY];
	}
	
	public Day sunday() {
		return days[DAY_SUNDAY];
	}
	
	public void imposeWeeklyWorktimeConstraint() {
		
		List<Employee> employees = ec.getEmployeeDirectory().getAllEmployees();
		
		// list of counters does not need to be sorted to work with gcc constraint. It is implicity...
		ArrayList<IntVar> counters = new ArrayList<IntVar>();
		counters.add(new IntVar(store, "unassigned", 0, Integer.MAX_VALUE)); // unassigned. There could be infinite of these
		for (int i = 0; i < employees.size(); i++) {
			Employee employee = employees.get(i);
			counters.add(new IntVar(store, employee.getName(), employee.getMinHoursPerWeek(), employee.getMaxHoursPerWeek()));
		}
		
		ArrayList<IntVar> compositeVariableList = getVariables();
		store.impose(new GCC(compositeVariableList, counters));
	}
	
	public ArrayList<IntVar> getVariables() {
		ArrayList<IntVar> compositeVariableList = new ArrayList<IntVar>();
		for (int i = 0; i < days.length; i++) {
			Day dailySchedule = days[i];
			List<IntVar> variables = dailySchedule.getVariables();
			for (int j = 0; j < variables.size(); j++) {
				compositeVariableList.add(variables.get(j));
			}
		}
		return compositeVariableList;
	}
	
	// Debug
	public void printPopulatedSchedule() {
		
		IntVar[][] monday = days[DAY_MONDAY].getPopulatedSchedule();
		IntVar[][] tuesday = days[DAY_TUESDAY].getPopulatedSchedule();
		IntVar[][] wednesday = days[DAY_WEDNESDAY].getPopulatedSchedule();
		IntVar[][] thursday = days[DAY_THURSDAY].getPopulatedSchedule();
		IntVar[][] friday = days[DAY_FRIDAY].getPopulatedSchedule();
		IntVar[][] saturday = days[DAY_SATURDAY].getPopulatedSchedule();
		IntVar[][] sunday = days[DAY_SUNDAY].getPopulatedSchedule();
		
		System.out.println("Populated schedule:");
		for (int i = 0; i < monday.length; i++) {
			
			if (monday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < monday[i].length; j++) {
					System.out.print(monday[i][j].value());
				}
			}
			
			System.out.print("-");
			
			if (tuesday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < tuesday[i].length; j++) {
					System.out.print(tuesday[i][j].value());
				}
			}
			
			System.out.print("-");
			
			if (wednesday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < wednesday[i].length; j++) {
					System.out.print(wednesday[i][j].value());
				}
			}
			
			System.out.print("-");
			
			if (thursday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < thursday[i].length; j++) {
					System.out.print(thursday[i][j].value());
				}
			}
			
			System.out.print("-");
			
			if (friday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < friday[i].length; j++) {
					System.out.print(friday[i][j].value());
				}
			}
			
			System.out.print("-");
			
			if (saturday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < saturday[i].length; j++) {
					System.out.print(saturday[i][j].value());
				}
			}
			
			System.out.print("-");
			
			if (sunday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < sunday[i].length; j++) {
					System.out.print(sunday[i][j].value());
				}
			}
			
			System.out.println();	
		}
	}
	
	// Debug
	public void printTemplate() {
		
		int[][] monday = days[DAY_MONDAY].getTemplateSchedule();
		int[][] tuesday = days[DAY_TUESDAY].getTemplateSchedule();
		int[][] wednesday = days[DAY_WEDNESDAY].getTemplateSchedule();
		int[][] thursday = days[DAY_THURSDAY].getTemplateSchedule();
		int[][] friday = days[DAY_FRIDAY].getTemplateSchedule();
		int[][] saturday = days[DAY_SATURDAY].getTemplateSchedule();
		int[][] sunday = days[DAY_SUNDAY].getTemplateSchedule();
		
		System.out.println("Template schedule:");
		for (int i = 0; i < monday.length; i++) {
			
			if (monday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < monday[i].length; j++) {
					System.out.print(monday[i][j]);
				}
			}
			
			System.out.print("-");
			
			if (tuesday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < tuesday[i].length; j++) {
					System.out.print(tuesday[i][j]);
				}
			}
			
			System.out.print("-");
			
			if (wednesday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < wednesday[i].length; j++) {
					System.out.print(wednesday[i][j]);
				}
			}
			
			System.out.print("-");
			
			if (thursday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < thursday[i].length; j++) {
					System.out.print(thursday[i][j]);
				}
			}
			
			System.out.print("-");
			
			if (friday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < friday[i].length; j++) {
					System.out.print(friday[i][j]);
				}
			}
			
			System.out.print("-");
			
			if (saturday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < saturday[i].length; j++) {
					System.out.print(saturday[i][j]);
				}
			}
			
			System.out.print("-");
			
			if (sunday[i].length == 0) {
				System.out.print("*");
			} else {
				for (int j = 0; j < sunday[i].length; j++) {
					System.out.print(sunday[i][j]);
				}
			}
			
			System.out.println();	
		}
	}
}
