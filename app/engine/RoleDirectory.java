package engine;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import engine.uid.OutOfUidsException;

public class RoleDirectory implements Serializable {

	private static final long serialVersionUID = 5351924136181947002L;

	private EngineController ec = null;
	
	private List<RoleImpl> allRoles = null;
	
	public RoleDirectory(EngineController ec) {
		this.ec = ec;
		allRoles = new ArrayList<RoleImpl>();
	}

	public Role createNewRole(String name, List<Employee> employees) throws OutOfUidsException {
		int uid = ec.getUidManager().generateRoleUid();
		RoleImpl role = new RoleImpl(name, uid, employees);
		allRoles.add(role);
		return (Role)role;
	}

	public Role removeRole(int id) {
		RoleImpl role = null;
		for (int i = 0; i < allRoles.size(); i++) {
			role = allRoles.get(i);
			if (role.getUid() == id) {
				allRoles.remove(role);
				break;
			}
		}
		return role;
	}
	
	// TODO: implement (sometime in the future...)
	public Role updateRole(Role role) {
		return null;
	}

	/**
	 * Returns an array of employee ids that has a certain skill.
	 * @param roleId
	 * @return
	 */
	public int[] getAssociatedEmployees(int roleId) {
		int[] employeeIds = null;
		Role role = getRole(roleId);
		if (role != null) {
			List<Employee> employees = role.getEmployees();
			employeeIds = new int[employees.size()];
			for (int i = 0; i < employees.size(); i++) {
				employeeIds[i] = employees.get(i).getUid();
			}
		} 
		return employeeIds;
	}

	public Role associateEmployeeWithSkill(int employeeId, int roleId) throws Exception {

		Employee employee = ec.getEmployeeDirectory().getEmployee(employeeId);
		if (employee == null) {
			throw new Exception("Employee does not exist!");
		}
		
		Role role = getRole(roleId);
		if (role == null) {
			throw new Exception("Role does not exist!");
		}

		role.addEmployee(employee);

		return role;
	}
	
	public Role getRole(int roleId) {
		Role role = null;
		for (int i = 0; i < allRoles.size(); i++) {
			role = allRoles.get(i);
			if (role.getUid() == roleId) {
				break;
			}
		}
		return role;
	}
	
	public List<Role> getAllRoles() {
		List<Role> roles = new ArrayList<Role>();
		for (int i = 0; i < allRoles.size(); i++) {
			Role role = (Role) allRoles.get(i);
			roles.add(role);
		}
		return roles;
	}

	private class RoleImpl implements Role {

		private static final long serialVersionUID = -4272299637776647066L;
		
		private String name = null;
		private int uid;
		private List<Employee> employees = null;

		public RoleImpl(String name, int uid) {
			this(name, uid, new ArrayList<Employee>());
		}
		
		public RoleImpl(String name, int uid, List<Employee> employees) {
			this.uid = uid;
			this.name = name;
			this.employees = employees;
		}

		@Override
		public void addEmployee(Employee employee) {
			if (!employees.contains(employee)) {
				employees.add(employee);
			}
		}

		@Override
		public void removeEmployee(Employee employee) {
			employees.remove(employee);
		}

		@Override
		public List<Employee> getEmployees() {
			return employees;
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
		public int getUid() {
			return uid;
		}
		
		@Override
		public String toString() {
			StringBuffer sb = new StringBuffer();
			sb.append("Skill: " + name + " --- Employees: ");
			for (int i = 0; i < employees.size(); i++) {
				sb.append(employees.get(i).getName() + "(" + employees.get(i).getUid() + ")");
				if (i < employees.size() - 1) {
					sb.append(", ");
				}
			}
			return sb.toString();
		}
	}

}
