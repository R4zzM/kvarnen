package engine;

import java.io.Serializable;

public interface Entity extends Serializable {

	public abstract String getName();
	
	public abstract int getUid();
	
}
