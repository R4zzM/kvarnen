package engine;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.avaje.ebeaninternal.server.lib.util.NotFoundException;

import engine.uid.OutOfUidsException;

/**
 * A directory that keeps track of all employees that has been created.
 * @author erasmat
 *
 */
public class EmployeeDirectory implements Serializable {
	
	private static final long serialVersionUID = -6076501613861408850L;

	private EngineController ec = null;
	
	private List<EmployeeImpl> allEmployees = null;
	
	public EmployeeDirectory(EngineController ec) {
		this.ec = ec;
		allEmployees = new ArrayList<EmployeeImpl>();
	}
	
	/**
	 * Creates a new employee, adds it to the directory and returns it to the caller.
	 * @param name
	 * @throws Exception
	 */
	public Employee createNewEmployee(String name, int minHoursPerDay, int maxHoursPerDay, int minHoursPerWeek, int maxHoursPerWeek) throws OutOfUidsException {
		int uid = ec.getUidManager().generateEmployeeUid();
		EmployeeImpl employee = new EmployeeImpl(name, uid, minHoursPerDay, maxHoursPerDay, minHoursPerWeek, maxHoursPerWeek);
		allEmployees.add(employee);
		return employee;
	}
	
	public Employee updateEmployee(int uid, String name, int minHoursPerDay, int maxHoursPerDay, int minHoursPerWeek, int maxHoursPerWeek) throws UidNotFoundException {
		EmployeeImpl employee = (EmployeeImpl) getEmployee(uid);
		if (employee == null) {
			throw new UidNotFoundException("Employee does not exist!");
		}
		employee.setName(name);
		employee.setMinHoursPerDay(minHoursPerDay);
		employee.setMaxHoursPerDay(maxHoursPerDay);
		employee.setMinHoursPerWeek(minHoursPerWeek);
		employee.setMaxHoursPerWeek(maxHoursPerWeek);
		return employee;
	}
	
	/**
	 * Removes an employee by id if it exists. If not it silently returns.
	 * @param uid
	 * @throws Exception
	 */
	public Employee removeEmployee(int uid) {
		Employee employee = null;
		for (int i = 0; i < allEmployees.size(); i++) {
			employee = allEmployees.get(i);
			if (employee.getUid() == uid) {
				allEmployees.remove(employee);
			}
		}
		return employee;
	}
	
//	public Employee addRoleToEmployee(Role role, Employee employee) throws Exception {
//		
//		//Check that employee is still in directory
//		if (!allEmployees.contains(employee)) {
//			throw new Exception("Exception in addSkillToEmployee: no such employee exist in directory");
//		}
//		
//		EmployeeImpl employeeImpl = null;
//		for (int i = 0; i < allEmployees.size(); i++) {
//			if (allEmployees.get(i).equals(employee)) {
//				employeeImpl = allEmployees.get(i);
//			}
//		}
//		
//		employeeImpl.addRole(role);
//		
//		return employeeImpl;
//	}
	
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
	
	public Employee getEmployee(int id) {
		Employee employee = null;
		for (int i = 0; i < allEmployees.size(); i++) {
			employee = allEmployees.get(i);
			if (employee.getUid() == id) {
				break;
			}
		}
		return employee;
	}
	
	private class EmployeeImpl implements Employee {

		private static final long serialVersionUID = -4328012514899645639L;
		
		private int uid;
		private String name = null;
		private int minHoursPerDay;
		private int maxHoursPerDay;
		private int minHoursPerWeek;
		private int maxHoursPerWeek;
		private List<Role> roles = null;
		
		public EmployeeImpl() {
			roles = new ArrayList<Role>();
		}
		
		public EmployeeImpl(String name, int id, int minHoursPerDay, int maxHoursPerDay, int minHoursPerWeek, int maxHoursPerWeek) {
			this.name = name;
			this.uid = id;
			this.minHoursPerDay = minHoursPerDay;
			this.maxHoursPerDay = maxHoursPerDay;
			this.minHoursPerWeek = minHoursPerWeek;
			this.maxHoursPerWeek = maxHoursPerWeek;
			roles = new ArrayList<Role>();
		}

		@Override
		public int getUid() {
			return uid;
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
		public List<Role> getRoles() {
			return roles;
		}
		
//		@Override
//		public boolean hasRole(Role role) {
//			return roles.contains(role);
//		}
//		
//		public void addRole(Role role) {
//			if (!roles.contains(role)) {
//				roles.add(role);
//			}
//		}
		
		@Override
		public int getMinHoursPerWeek() {
			return minHoursPerWeek;
		}
		
		public void setMinHoursPerWeek(int hours) {
			this.minHoursPerWeek = hours;
		}

		@Override
		public int getMaxHoursPerWeek() {
			return maxHoursPerWeek;
		}
		
		public void setMaxHoursPerWeek(int hours) {
			this.maxHoursPerWeek = hours;
		}

		@Override
		public int getMinHoursPerDay() {
			return minHoursPerDay;
		}
		
		public void setMinHoursPerDay(int hours) {
			this.minHoursPerDay = hours;
		}

		@Override
		public int getMaxHoursPerDay() {
			return maxHoursPerDay;
		}
		
		public void setMaxHoursPerDay(int hours) {
			this.maxHoursPerDay = hours;
		}

		@Override
		public void addVacation(Date from, Date to) {
			// TODO Auto-generated method stub
			
		}
		
		@Override
		public boolean equals(Object o) {
			if (o == null) {
				return false;
			}
			
			if (!(o instanceof EmployeeImpl)) {
				return false;
			}
			
			EmployeeImpl employee = (EmployeeImpl)o;
			
			if (this.uid != employee.getUid()) {
				return false;
			}
			
			return true;
		}
		
		@Override
		public String toString() {
			StringBuffer sb = new StringBuffer();
			sb.append("Name: " + name + "(" + uid + ") --- Skills: ");
			for (int i = 0; i < roles.size(); i++) {
				sb.append(roles.get(i).getName());
				sb.append("(" + roles.get(i).getUid() + ")");
				if (i < roles.size() - 1) {
					sb.append(", ");
				}
			}
			return sb.toString();
		}
		
	}
	
	
}
