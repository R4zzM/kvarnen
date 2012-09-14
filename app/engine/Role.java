package engine;
import java.io.Serializable;
import java.util.List;

public interface Role extends Serializable {

	public abstract void associateEmployee(Employee employee);

	public abstract boolean deassociateEmployee(Employee employee);

	public abstract List<Employee> getEmployees();

	public abstract String getName();

	public abstract void setName(String name);

	public abstract int getUid();

}