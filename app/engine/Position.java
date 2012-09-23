package engine;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;


public class Position implements Serializable {

	private static final long serialVersionUID = -7774061094243002475L;
	
	private Role role = null;
	private Date start = null;
	private Date end = null;
	private Employee assignedEmployee = null;
	private int uid;
	
	public Position (Role role, int uid, Date start, Date end) {
		this.role = role;
		this.uid = uid;
		this.start = start;
		this.end = end;
	}

	public Date getStart() {
		return start;
	}

	public int getStartHour() {
		Calendar startTime = Calendar.getInstance();
		startTime.setTime(start);
		return startTime.get(Calendar.HOUR_OF_DAY);
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getEnd() {
		return end;
	}
	
	public int getEndHour() {
		Calendar endTime = Calendar.getInstance();
		endTime.setTime(end);
		return endTime.get(Calendar.HOUR_OF_DAY);
	}

	public void setEnd(Date end) {
		this.end = end;
	}
	
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
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
		return uid;
	}

}
