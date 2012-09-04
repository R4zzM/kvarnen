package engine;
import java.io.Serializable;
import java.util.List;

public interface Skill extends Serializable {

	public abstract void addEmployee(Employee employee);

	public abstract void removeEmployee(Employee employee);

	public abstract List<Employee> getEmployees();

	public abstract String getName();

	public abstract void setName(String name);

	public abstract int getId();

}