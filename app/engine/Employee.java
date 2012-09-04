package engine;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

public interface Employee extends Serializable {

	public abstract int getId();

	public abstract String getName();

	public abstract void setName(String name);

	public abstract List<Skill> getSkills();

	public abstract void addSkill(Skill skill);

	public abstract boolean hasSkill(Skill skill);
	
	public abstract int getMinHoursPerDay(); // If scheduled at all...
	
	public abstract int getMaxHoursPerDay();
	
	public abstract int getMinHoursPerWeek();
	
	public abstract int getMaxHoursPerWeek();
	
	public abstract void addVacation(Date from, Date to);

}