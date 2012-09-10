package engine;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import engine.uid.OutOfUidsException;

public class SkillDirectory implements Serializable {

	private static final long serialVersionUID = 5351924136181947002L;

	private EngineController ec = null;
	
	private List<SkillImpl> allSkills = null;
	
	public SkillDirectory(EngineController ec) {
		this.ec = ec;
		allSkills = new ArrayList<SkillImpl>();
	}

	public Skill createNewSkill(String name) throws OutOfUidsException {
		int uid = ec.getUidManager().generateRoleUid();
		SkillImpl skill = new SkillImpl(name, uid);
		allSkills.add(skill);
		return (Skill)skill;
	}

	public Skill removeSkill(int id) {
		SkillImpl skill = null;
		for (int i = 0; i < allSkills.size(); i++) {
			skill = allSkills.get(i);
			if (skill.getId() == id) {
				allSkills.remove(skill);
				break;
			}
		}
		return skill;
	}
	
	// TODO: implement (sometime in the future...)
	public Skill updateSkill(Skill skill) {
		return null;
	}

	/**
	 * Returns an array of employee ids that has a certain skill.
	 * @param skillId
	 * @return
	 */
	public int[] getAssociatedEmployees(int skillId) {
		int[] employeeIds = null;
		Skill skill = getSkill(skillId);
		if (skill != null) {
			List<Employee> employees = skill.getEmployees();
			employeeIds = new int[employees.size()];
			for (int i = 0; i < employees.size(); i++) {
				employeeIds[i] = employees.get(i).getId();
			}
		} 
		return employeeIds;
	}

	public Skill associateEmployeeWithSkill(int employeeId, int skillId) throws Exception {

		Employee employee = ec.getEmployeeDirectory().getEmployee(employeeId);
		if (employee == null) {
			throw new Exception("Employee does not exist!");
		}
		
		Skill skill = getSkill(skillId);
		if (skill == null) {
			throw new Exception("Skill does not exist!");
		}

		skill.addEmployee(employee);

		return skill;
	}
	
	public Skill getSkill(int skillId) {
		Skill skill = null;
		for (int i = 0; i < allSkills.size(); i++) {
			skill = allSkills.get(i);
			if (skill.getId() == skillId) {
				break;
			}
		}
		return skill;
	}
	
	public List<Skill> getAllSkills() {
		List<Skill> skills = new ArrayList<Skill>();
		for (int i = 0; i < allSkills.size(); i++) {
			Skill skill = (Skill) allSkills.get(i);
			skills.add(skill);
		}
		return skills;
	}

	private class SkillImpl implements Skill {

		private static final long serialVersionUID = -4272299637776647066L;
		
		private String name = null;
		private int id;
		private List<Employee> employees = null;

		public SkillImpl(String name, int id) {
			this.id = id;
			this.name = name;
			this.employees = new ArrayList<Employee>();
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
		public int getId() {
			return id;
		}
		
		@Override
		public String toString() {
			StringBuffer sb = new StringBuffer();
			sb.append("Skill: " + name + " --- Employees: ");
			for (int i = 0; i < employees.size(); i++) {
				sb.append(employees.get(i).getName() + "(" + employees.get(i).getId() + ")");
				if (i < employees.size() - 1) {
					sb.append(", ");
				}
			}
			return sb.toString();
		}
	}

}
