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

	public Role createNewRole(int uid, List<Employee> employees) throws OutOfUidsException {
//		int uid = ec.getUidManager().generateRoleUid();
		RoleImpl role = new RoleImpl(uid, employees);
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
	
	public Role updateRole(int uid, String name, List<Employee> associatedEmployees) throws UidNotFoundException {
		RoleImpl role = (RoleImpl)getRole(uid);
		if (role == null) {
			throw new UidNotFoundException("Role not found for uid = " + uid + "!");
		}
		role.setName(name);
		role.updateAssociatedEmployees(associatedEmployees);
		return role;
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

		role.associateEmployee(employee);

		return role;
	}
	
	public int[] deassociateEmployeeFromAllRoles(int employeeUid) {
		List<Integer> affectedRoles = new ArrayList<Integer>();
		for (Role role : allRoles) {
			if (deassociateEmployeeFromRole(employeeUid, role.getUid())) {
				affectedRoles.add(new Integer(role.getUid()));
			}
		}
		
		int[] affectedRolesArray = new int[affectedRoles.size()];
		for (int i = 0; i < affectedRoles.size(); i++) {
			affectedRolesArray[i] = affectedRoles.get(i).intValue();
		}
		return affectedRolesArray;
	}
	
	public boolean deassociateEmployeeFromRole(int employeeUid, int roleUid) {
		RoleImpl roleImpl = (RoleImpl)getRole(roleUid);
		Employee employee = ec.getEmployeeDirectory().getEmployee(employeeUid);
		boolean deassociated = roleImpl.deassociateEmployee(employee);
		return deassociated;
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
		private List<Employee> associatedEmployees = null;

		public RoleImpl(int uid) {
			this(uid, new ArrayList<Employee>());
		}
		
		public RoleImpl(int uid, List<Employee> associatedEmployees) {
			this.uid = uid;
			this.name = name;
			this.associatedEmployees = associatedEmployees;
		}

		@Override
		public void associateEmployee(Employee employee) {
			if (!associatedEmployees.contains(employee)) {
				associatedEmployees.add(employee);
			}
		}

		@Override
		public boolean deassociateEmployee(Employee employee) {
			boolean retval = false;
			if (associatedEmployees.contains(employee)) {
				associatedEmployees.remove(employee);
				retval = true;
			}
			return retval;
		}
		
		public void updateAssociatedEmployees(List<Employee> associatedEmployees) {
			this.associatedEmployees.clear();
			this.associatedEmployees.addAll(associatedEmployees);
		}

		@Override
		public List<Employee> getEmployees() {
			return associatedEmployees;
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
			for (int i = 0; i < associatedEmployees.size(); i++) {
				sb.append(associatedEmployees.get(i).getName() + "(" + associatedEmployees.get(i).getUid() + ")");
				if (i < associatedEmployees.size() - 1) {
					sb.append(", ");
				}
			}
			return sb.toString();
		}
	}

}
