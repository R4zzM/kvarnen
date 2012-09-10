package engine.uid;

public class OutOfUidsException extends Exception {

	public OutOfUidsException() {
		super();
	}
	
	public OutOfUidsException(String message) {
		super(message);
	}

}
