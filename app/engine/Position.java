package engine;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;


public class Position implements Serializable {

	private static final long serialVersionUID = -7774061094243002475L;
	
	private Skill skill = null;
	private Date start = null;
	private Date end = null;
	private Employee assignedEmployee = null;
	private int id;
	
	public Position (Skill skill, int id, Date start, Date end) {
		this.skill = skill;
		this.id = id;
		this.start = start;
		this.end = end;
	}

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getEnd() {
		return end;
	}

	public void setEnd(Date end) {
		this.end = end;
	}
	
	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}
	
	public int getDurationInHours() {
		Calendar startTime = Calendar.getInstance();
		startTime.setTime(start);
		Calendar endTime = Calendar.getInstance();
		endTime.setTime(end);
		int startHour = startTime.get(Calendar.HOUR_OF_DAY);
		int endHour = endTime.get(Calendar.HOUR_OF_DAY);
		return endHour - startHour;
	}
	
	public void assignEmployee(Employee employee) {
		this.assignedEmployee = employee;
	}
	
	public Employee getAssignedEmployee() {
		return assignedEmployee;
	}
	
	public int getId() {
		return id;
	}

}
