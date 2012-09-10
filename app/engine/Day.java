package engine;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import engine.uid.OutOfUidsException;

import JaCoP.constraints.Alldifferent;
import JaCoP.constraints.GCC;
import JaCoP.constraints.Stretch;
import JaCoP.constraints.XeqC;
import JaCoP.constraints.XgtC;
import JaCoP.core.IntVar;
import JaCoP.core.IntervalDomain;
import JaCoP.core.Store;

/**
 * The Schedule for a single day.
 * @author rasmus
 *
 */
public class Day implements Serializable {

	private static final long serialVersionUID = 2225960607844064195L;

	// How many hours should the "matrix schedule" have?
	private static final int NUMBER_OF_HOURS_IN_SCHEDULE = 24;

	// Represents the day
	private Date day = null; 

	// The last matrix template schedule that was generated. Used to map position id to the user assigned to the position.
	private int[][] latestTemplateSchedule = null;

	// The populated schedule
	private IntVar[][] populatedSchedule = null;

	// A list with references to all the variables.
	private ArrayList<IntVar> populatedScheduleVariables = null;

	// All the positions that need to be filled.
	private List<Position> positions = null;

	// Id that will be given to the next position that is created
//	private int nextPositionId;

	// The store.
	private Store store = null;

	private EngineController ec = null;
	
	public Day(EngineController ec, Store store, final Date day) {
		this.store = store;
		this.ec = ec;
		this.day = day;
		this.positions = new ArrayList<Position>();
//		nextPositionId = 1;
	}

	/* (non-Javadoc)
	 * @see Day#newPosition(Skill, java.util.Date, java.util.Date)
	 */
	public Position newPosition(Skill skill, Date startTime, Date endTime) throws OutOfUidsException {
		int uid = ec.getUidManager().generatePositionUid();
		Position position = new Position(skill, uid, startTime, endTime);
		positions.add(position);
//		nextPositionId++;
		return position;
	}

	/* (non-Javadoc)
	 * @see Day#removePosition(Position)
	 */
	public void removePosition(Position position) {
		positions.remove(position);
	}

	/* (non-Javadoc)
	 * @see Day#getAllPositions()
	 */
	public List<Position> getAllPositions() {
		return positions;
	}

	/* (non-Javadoc)
	 * @see Day#getVariables()
	 */
	public ArrayList<IntVar> getVariables() {
		return populatedScheduleVariables;
	}

	/* (non-Javadoc)
	 * @see Day#getTemplateSchedule()
	 */
	public int[][] getTemplateSchedule() {

		int[][] templateSchedule = new int[NUMBER_OF_HOURS_IN_SCHEDULE][positions.size()];

		// populate schedule of integers with positions
		Calendar startTime = Calendar.getInstance();
		Calendar endTime = Calendar.getInstance();
		for (int i = 0; i < positions.size(); i++) {

			startTime.setTime(positions.get(i).getStart());
			endTime.setTime(positions.get(i).getEnd());

			int startHour = startTime.get(Calendar.HOUR_OF_DAY);
			int endHour = endTime.get(Calendar.HOUR_OF_DAY);

			for (int j = startHour; j< endHour; j++) {
				templateSchedule[j][i] = positions.get(i).getId();
			}
		}

		latestTemplateSchedule = templateSchedule;

		return templateSchedule;
	}

	/* (non-Javadoc)
	 * @see Day#getPopulatedSchedule()
	 */
	public IntVar[][] getPopulatedSchedule() {
		return populatedSchedule;
	}

	private IntVar[][] initPopulatedSchedule() {
		populatedScheduleVariables = new ArrayList<IntVar>();
		populatedSchedule = new IntVar[NUMBER_OF_HOURS_IN_SCHEDULE][positions.size()];
		int min = 0;
		int max = 0;
		for (int i = 0; i < populatedSchedule.length; i++) {
			for (int j = 0; j < populatedSchedule[i].length; j++) {
				populatedSchedule[i][j] = new IntVar(store, i + "," + j);
				populatedSchedule[i][j].setDomain(new IntervalDomain(min, max)); // must be done to handle large uids. Probably makes search slower though...
				populatedScheduleVariables.add(populatedSchedule[i][j]);
			}
		}

		return populatedSchedule;
	}

	// Lock the schedule and impose constraints on the store
	/* (non-Javadoc)
	 * @see Day#imposeConstraints()
	 */
	public void imposeConstraints() throws Exception {

		getTemplateSchedule();
		initPopulatedSchedule();

		// must be done before assignment constraint as domains are assigned in this method. 
		imposeSkillRequirementConstraint(populatedSchedule, latestTemplateSchedule);
		if (!store.consistency()) {
			throw new Exception("Exception in createPopulatedSchedule: Store not consistent after imposeSkillRequirementConstraint method.");
		}

		// impose constraints on store
		imposeAssignmentConstraint(populatedSchedule, latestTemplateSchedule);
		if (!store.consistency()) {
			throw new Exception("Exception in createPopulatedSchedule: Store not consistent after imposeUnassignedShouldBeUnassignedConstraint method.");
		}

		imposeOnlyOnePositionAtASingleTimeConstratint(populatedSchedule, latestTemplateSchedule);
		if (!store.consistency()) {
			throw new Exception("Exception in createPopulatedSchedule: Store not consistent after imposeOnlyOnePositionAtASingleTimeConstratint method.");
		}

		imposeDailyWorktimeConstraint(populatedSchedule, latestTemplateSchedule);
		if (!store.consistency()) {
			throw new Exception("Exception in createPopulatedSchedule: Store not consistent after imposeDailyWorktimeConstraint method.");
		}

	}

	// If a timeslot is unassigned in the template it should be so in the populated schedule as well.
	// If a timeslot is has a skill assigned to it should have an employee in the populated schdule.
	private void imposeAssignmentConstraint(IntVar[][] populatedSchedule, int[][] templateSchedule) {
		for (int i = 0; i < populatedSchedule.length; i++) {
			for (int j = 0; j < populatedSchedule[i].length; j++) {
				if (templateSchedule[i][j] == 0) {
					store.impose(new XeqC(populatedSchedule[i][j], 0));
				} else {
					store.impose(new XgtC(populatedSchedule[i][j], 0));
				}
			}
		}
	}

	// A person that is assigned to a timeslot must have the required skill
	private void imposeSkillRequirementConstraint(IntVar[][] populatedSchedule, int[][] templateSchedule) throws Exception {
		for (int i = 0; i < populatedSchedule.length; i++) {
			for (int j = 0; j < populatedSchedule[i].length; j++) {
				if (templateSchedule[i][j] != 0) {
					int[] employeesWithSkill = ec.getSkillDirectory().getAssociatedEmployees(templateSchedule[i][j]);
					Arrays.sort(employeesWithSkill); // required by JaCoP addDom() method.
					for (int k = 0;  k < employeesWithSkill.length; k++) {
						populatedSchedule[i][j].addDom(employeesWithSkill[k], employeesWithSkill[k]); // The domain is the potential employees. 
					}
				}
			}
		}
	}

	// An employee can only be in one position at a single time.
	private void imposeOnlyOnePositionAtASingleTimeConstratint(IntVar[][] populatedSchedule, int[][] templateSchedule) {
		ArrayList<IntVar> row = new ArrayList<IntVar>(); // JaCoP takes an ArrayList<> as a constructor argument, instead of the List<>...
		for (int i = 0; i < populatedSchedule.length; i++) {
			for (int j = 0; j < populatedSchedule[i].length; j++) {
				if (templateSchedule[i][j] > 0) {
					row.add(populatedSchedule[i][j]);
				}
			}
			store.impose(new Alldifferent(row));
			row.clear();
		}
	}
	
	// min and max hours per day that an employee can work. Hours are scheduled after eachother.
	private void imposeDailyWorktimeConstraint(IntVar[][] populatedSchedule, int[][] templateSchedule) {
		
		if (positions.size() > 0) {
			
			for (int i = 0; i < populatedSchedule[0].length; i++) {
				
				IntVar[] hourVariables = new IntVar[populatedSchedule.length];
				for (int j = 0; j < hourVariables.length; j++) {
					hourVariables[j] = populatedSchedule[j][i];
				}
				
				int[] employeeIds = new int[ec.getEmployeeDirectory().nEmployees() + 1]; // +1 for unscheduled positions
				int[] allMinHoursPerDay = new int[ec.getEmployeeDirectory().nEmployees() + 1]; // +1 for unscheduled positions
				int[] allMaxHoursPerDay = new int[ec.getEmployeeDirectory().nEmployees() + 1]; // +1 for unscheduled positions
				
				employeeIds[0] = 0;
				allMinHoursPerDay[0] = 0;
				allMaxHoursPerDay[0] = 23;
				
				List<Employee> employees = ec.getEmployeeDirectory().getAllEmployees();
				for (int j = 0; j < employees.size(); j++) {
					Employee employee = employees.get(j);
					int id = employee.getId();
					int minHoursPerDay = employee.getMinHoursPerDay();
					int maxHoursPerDay = employee.getMaxHoursPerDay();
					employeeIds[j + 1] = id;
					allMinHoursPerDay[j + 1] = minHoursPerDay;
					allMaxHoursPerDay[j + 1] = maxHoursPerDay;
				}
				
				store.imposeDecomposition(new Stretch(employeeIds, allMinHoursPerDay, allMaxHoursPerDay, hourVariables));
			}
		}
	}

	// Debug
	/* (non-Javadoc)
	 * @see Day#printTemplateSchedule()
	 */
	public void printTemplateSchedule() {

		System.out.println("Template schedule:");

		if (latestTemplateSchedule == null) {
			System.out.println("NULL");
		} else {
			for (int i = 0; i < latestTemplateSchedule.length; i++) {
				for (int j = 0; j < latestTemplateSchedule[i].length; j++) {
					System.out.print(latestTemplateSchedule[i][j] + " ");
				}
				System.out.print("\n");
			}
		}
	}

	// Debug
	public void printTemplateWithDomains() {

		System.out.println("Template schedule with possible domains:");

		if (latestTemplateSchedule == null) {
			System.out.println("NULL");
		} else {
			for (int i = 0; i < latestTemplateSchedule.length; i++) {
				for (int j = 0; j < latestTemplateSchedule[i].length; j++) {
					System.out.print(populatedSchedule[i][j].domain + " ");
				}
				System.out.print("\n");
			}
		}
	}


	// Debug 
	/* (non-Javadoc)
	 * @see Day#printPopulatedSchedule()
	 */
	public void printPopulatedSchedule() {

		System.out.println("Populated schedule:");

		if (populatedSchedule == null) {
			System.out.println("NULL");
		} else {
			for (int i = 0; i < populatedSchedule.length; i++) {
				for (int j = 0; j < populatedSchedule[i].length; j++) {
					System.out.print(populatedSchedule[i][j].value() + " ");
				}
				System.out.print("\n");
			}
		}	
	}
}
