var UidGenerator = function () {

	var self = this;

	this.counter = 0;

	this.generateUid = function () {
		self.counter++;
		var uid = self.counter;
		return uid; 
	};

};

UidGenerator.instance = null;

UidGenerator.getInstance = function () {

	if (!UidGenerator.instance) {
		UidGenerator.instance = new UidGenerator();
	}
	return UidGenerator.instance;
}