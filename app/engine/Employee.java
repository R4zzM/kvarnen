package engine;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

public interface Employee extends Serializable {

	public abstract int getUid();

	public abstract String getName();

	public abstract void setName(String name);

	public abstract List<Role> getRoles();

//	public abstract void addRole(Role role);
//
//	public abstract boolean hasRole(Role role);
	
	public abstract int getMinHoursPerDay(); // If scheduled at all...
	
	public abstract int getMaxHoursPerDay();
	
	public abstract int getMinHoursPerWeek();
	
	public abstract int getMaxHoursPerWeek();
	
	public abstract void addVacation(Date from, Date to);

}