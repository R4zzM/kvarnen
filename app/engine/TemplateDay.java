package engine;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import engine.uid.OutOfUidsException;

public interface TemplateDay extends Serializable {

	public abstract String getName();
	
	public abstract int getUid();
	
	public abstract List<Position> getPositions();
}
