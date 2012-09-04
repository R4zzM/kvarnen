package engine;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class SkillDirectory implements Serializable {

//	public static SkillDirectory instance = null;

	private static final long serialVersionUID = 5351924136181947002L;

	private List<SkillImpl> allSkills = null;

	private int nextSkillId;
	
	public SkillDirectory() {
		allSkills = new ArrayList<SkillImpl>();
		nextSkillId = 1;
	}

//	public static SkillDirectory getInstance() {
//		if (instance == null) {
//			instance = new SkillDirectory();
//		}
//		return instance;
//	}

	public Skill createNewSkill(String name) {
		SkillImpl skill = new SkillImpl(name, nextSkillId);
		allSkills.add(skill);
		nextSkillId++;
		return (Skill)skill;
	}

	public void removeSkill(String name) {
		SkillImpl skill = null;
		for (int i = 0; i < allSkills.size(); i++) {
			skill = allSkills.get(i);
			if (skill.getName().equals(name)) {
				allSkills.remove(skill);
			}
		}
	}

	public void removeSkill(int id) {
		SkillImpl skill = null;
		for (int i = 0; i < allSkills.size(); i++) {
			skill = allSkills.get(i);
			if (skill.getId() == id) {
				allSkills.remove(skill);
			}
		}
	}

	/**
	 * Returns an array of employee ids that has a certain skill.
	 * @param skillId
	 * @return
	 */
	public int[] getEmployeeIdsForSkillId(int skillId) {
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

	public Skill addEmployeeToSkill(Employee employee, Skill skill) throws Exception {

		//Check that employee is still in directory
		if (!allSkills.contains(skill)) {
			throw new Exception("Exception in addEmployeeToSkill: no such skill exist in directory");
		}

		SkillImpl skillImpl = null;
		for (int i = 0; i < allSkills.size(); i++) {
			if (allSkills.get(i).equals(skill)) {
				skillImpl = allSkills.get(i);
			}
		}

		skillImpl.addEmployee(employee);

		return skillImpl;

	}
	
	private Skill getSkill(int skillId) {
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

		public void setId(int id) {
			this.id = id;
		}
		
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
