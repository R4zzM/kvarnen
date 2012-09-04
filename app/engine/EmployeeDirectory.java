package engine;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * A directory that keeps track of all employees that has been created.
 * @author erasmat
 *
 */
public class EmployeeDirectory implements Serializable {

//	private static EmployeeDirectory instance = null;
	
	private static final long serialVersionUID = -6076501613861408850L;

	private int nextEmployeeId;
	
	private List<EmployeeImpl> allEmployees = null;
	
	// Singleton
	public EmployeeDirectory() {
		allEmployees = new ArrayList<EmployeeImpl>();
		nextEmployeeId = 1;
	}
	
//	public static EmployeeDirectory getInstance() {
//		if (instance == null) {
//			instance = new EmployeeDirectory();
//		}
//		return instance;
//	}
	
	/**
	 * Creates a new employee, adds it to the directory and returns it to the caller.
	 * @param name
	 * @throws Exception
	 */
	public Employee createNewEmployee(String name, int minHoursPerDay, int maxHoursPerDay, int minHoursPerWeek, int maxHoursPerWeek) {
		EmployeeImpl employee = new EmployeeImpl(name, nextEmployeeId, minHoursPerDay, maxHoursPerDay, minHoursPerWeek, maxHoursPerWeek);
		allEmployees.add(employee);
		nextEmployeeId++;
		return employee;
	}
	
	/**
	 * Removes an employee by name if it exists. If not it silently returns.
	 * @param name
	 * @throws Exception
	 */
	public void removeEmployee(String name) {
		Employee employee = null;
		for (int i = 0; i < allEmployees.size(); i++) {
			employee = allEmployees.get(i);
			if (employee.getName().equals(name)) {
				allEmployees.remove(employee);
			}
		}
	}
	
	/**
	 * Removes an employee by id if it exists. If not it silently returns.
	 * @param id
	 * @throws Exception
	 */
	public void removeEmployee(int id) {
		Employee employee = null;
		for (int i = 0; i < allEmployees.size(); i++) {
			employee = allEmployees.get(i);
			if (employee.getId() == id) {
				allEmployees.remove(employee);
			}
		}
	}
	
	/**
	 * Fetches an employee by id from the directory.
	 * @param id
	 * @return
	 */
	public Employee getById(int id) {
		Employee employee = getEmployee(id);
		return employee;
	}
	
	/**
	 * Fetches an employee by name from the directory.
	 * @param name
	 * @return
	 */
	public Employee getByName(String name) {
		Employee employee = null;
		for (int i = 0; i < allEmployees.size(); i++) {
			if (allEmployees.get(i).getName().equals(name)) {
				employee = allEmployees.get(i);
			}
		}
		return employee;
	}
	
	public Employee addSkillToEmployee(Skill skill, Employee employee) throws Exception {
		
		//Check that employee is still in directory
		if (!allEmployees.contains(employee)) {
			throw new Exception("Exception in addSkillToEmployee: no such employee exist in directory");
		}
		
		EmployeeImpl employeeImpl = null;
		for (int i = 0; i < allEmployees.size(); i++) {
			if (allEmployees.get(i).equals(employee)) {
				employeeImpl = allEmployees.get(i);
			}
		}
		
		employeeImpl.addSkill(skill);
		
		return employeeImpl;
	}
	
	public int peekNextId() {
		return nextEmployeeId;
	}
	
	public int nEmployees() {
		return allEmployees.size();
	}
	
	// Returns a copy of the list of employees
	public List<Employee> getAllEmployees() {
		List<Employee> employees = new ArrayList<Employee>();
		for (int i = 0; i < allEmployees.size(); i++) {
			Employee employee = (Employee) allEmployees.get(i);
			employees.add(employee);
		}
		return employees;
	}
	
	// Returns all employees that does not have vacation for the day of the date.
	// TODO: implement
	public List<Employee> getAvailableEmployees(Date day) {
		
		return null;
	}
	
	private Employee getEmployee(int id) {
		Employee employee = null;
		for (int i = 0; i < allEmployees.size(); i++) {
			employee = allEmployees.get(i);
			if (employee.getId() == id) {
				break;
			}
		}
		return employee;
	}
	
	private class EmployeeImpl implements Employee {

		private static final long serialVersionUID = -4328012514899645639L;
		
		private int id;
		private String name = null;
		private int minHoursPerDay;
		private int maxHoursPerDay;
		private int minHoursPerWeek;
		private int maxHoursPerWeek;
		private List<Skill> skills = null;
		
		public EmployeeImpl(String name, int id, int minHoursPerDay, int maxHoursPerDay, int minHoursPerWeek, int maxHoursPerWeek) {
			this.name = name;
			this.id = id;
			this.minHoursPerDay = minHoursPerDay;
			this.maxHoursPerDay = maxHoursPerDay;
			this.minHoursPerWeek = minHoursPerWeek;
			this.maxHoursPerWeek = maxHoursPerWeek;
			skills = new ArrayList<Skill>();
		}

		@Override
		public int getId() {
			return id;
		}

		@Override
		public String getName() {
			return name;
		}

		@Override
		public void setName(String name) {
			this.name = name;
		}

		@Override
		public List<Skill> getSkills() {
			return skills;
		}
		
		@Override
		public boolean hasSkill(Skill skill) {
			return skills.contains(skill);
		}
		
		public void setId (int id) {
			this.id = id;
		}
		
		public void addSkill(Skill skill) {
			if (!skills.contains(skill)) {
				skills.add(skill);
			}
		}
		
		@Override
		public int getMinHoursPerWeek() {
			return minHoursPerWeek;
		}

		@Override
		public int getMaxHoursPerWeek() {
			return maxHoursPerWeek;
		}
		
		@Override
		public String toString() {
			StringBuffer sb = new StringBuffer();
			sb.append("Name: " + name + "(" + id + ") --- Skills: ");
			for (int i = 0; i < skills.size(); i++) {
				sb.append(skills.get(i).getName());
				sb.append("(" + skills.get(i).getId() + ")");
				if (i < skills.size() - 1) {
					sb.append(", ");
				}
			}
			return sb.toString();
		}

		@Override
		public int getMinHoursPerDay() {
			return minHoursPerDay;
		}

		@Override
		public int getMaxHoursPerDay() {
			return maxHoursPerDay;
		}

		@Override
		public void addVacation(Date from, Date to) {
			// TODO Auto-generated method stub
			
		}
		
	}
	
	
}
