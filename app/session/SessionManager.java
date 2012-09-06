package session;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import play.Logger;

import engine.EngineController;

public class SessionManager {

	private String sessionsDirPath = null;
	
	public static SessionManager instance = null;
	
	public synchronized static SessionManager getInstance() {
		if (instance == null) {
			instance = new SessionManager();
		}
		return instance;
	}
	
	private SessionManager() {
		if (System.getProperty("os.name").startsWith("Windows")) {
			sessionsDirPath = "/Users/erasmat/tmp/www/kvarnen/sessions/";
		} else { // Unix / Linux
			sessionsDirPath = "/home/rasmus/tmp/www/kvarnen/sessions/";
		}
		Logger.debug("SessionManager(): Using session path: " + sessionsDirPath);
	}
	
	public EngineController newSession() throws Exception {
		
		EngineController ec = new EngineController();
		File sessionDir = new File(sessionsDirPath + ec.getSessionId() + "/");
		
		if (!sessionDir.mkdir()) {
			throw new Exception("Could not create session directory. Permissions?");
		}
		
		saveObject(ec);
		
		return ec;
	}
	
	// Returns the Engine Controller that has been associated with the session or null if it doesn't exist.
	public EngineController getSession(String sessionId) {
		
		EngineController engineController = null;
		File sessionDir = new File(sessionsDirPath + sessionId);
		
		if (sessionDir.exists()) {	
			File engineControllerPath = new File(sessionsDirPath + sessionId + "enginecontroller.kva");
			try {
				FileInputStream fis = new FileInputStream(engineControllerPath);
				ObjectInputStream in = new ObjectInputStream(fis);
				engineController = (EngineController)in.readObject();
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("Exception when reading object. msg: " + e.getMessage());
			}
		}
		return engineController;
	}
	
	// TODO: should be more robust in a production system
	public void saveSession(EngineController engineController) throws Exception {
		String sessionId = engineController.getSessionId();
		File sessionDir = new File(sessionsDirPath + sessionId);
		
		// create the folder if it doesn't exist (but it should)
		if (!sessionDir.exists()) {
			if (!sessionDir.mkdir()) {
				throw new Exception("Could not create session directory. Permissions?");
			}
		}
		
		saveObject(engineController);
	}
	
	private void saveObject(EngineController ec) throws Exception {
		// write the new object
		File engineControllerPath = new File(sessionsDirPath + ec.getSessionId() + "/" + "enginecontroller.kva");
		try {
			FileOutputStream fos = new FileOutputStream(engineControllerPath);
			ObjectOutputStream out = new ObjectOutputStream(fos);
			out.writeObject(ec);
		} catch (Exception e) {
			throw e;
		}
	}
}
