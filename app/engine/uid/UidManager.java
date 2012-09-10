package engine.uid;

import java.io.Serializable;

public class UidManager implements Serializable {

	private static final long serialVersionUID = 5548568109144775925L;
	
	private static final int BIT_EMPLOYEE = (1 << 30);
	private static final int BIT_ROLE = (1 << 29);
	private static final int BIT_POSITION = (1 << 29);

	private static final int MAX_UID = (1 << 25);

	private int counter;


	public UidManager() {
		counter = 0;
	}

	public int generateEmployeeUid() throws OutOfUidsException {
		int uid = 0;
		if (counter < MAX_UID) {
			uid = ++counter;
			uid |= BIT_EMPLOYEE;
		} else {
			throw new OutOfUidsException("Out of UIDs");
		}
		return uid;
	}

	public int generateRoleUid() throws OutOfUidsException {
		int uid = 0;
		if (counter < MAX_UID) {
			uid = ++counter;
			uid |= BIT_ROLE;
		} else {
			throw new OutOfUidsException("Out of UIDs");
		}
		return uid;
	}
	
	public int generatePositionUid() throws OutOfUidsException {
		int uid = 0;
		if (counter < MAX_UID) {
			uid = ++counter;
			uid |= BIT_POSITION;
		} else {
			throw new OutOfUidsException("Out of UIDs");
		}
		return uid;
	}

	public static boolean isEmployeeUid(int uid) {
		if ((uid & BIT_EMPLOYEE) > 0) {
			return true;
		} else {
			return false;
		}
	}

	public static boolean isRoleUid(int uid) {
		if ((uid & BIT_ROLE) > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	public static boolean isPositionUid(int uid) {
		if ((uid & BIT_ROLE) > 0) {
			return true;
		} else {
			return false;
		}
	}
}
