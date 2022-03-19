Module.register("MMM-MAX30100",{
    // Default module config.
    defaults: {
    	sensorPIN: 2,
        updateInterval: 2, // Seconds
    },
    
	// Define start sequence.
    start: function() {
		Log.info("Starting module: " + this.name);
		
		this.loaded = false;
        this.temperature = '';
        this.humidity= '';
        
        this.update();
        setInterval(
        		this.update.bind(this),
        		this.config.updateInterval * 1000);
    },
    
	update: function(){
		this.sendSocketNotification('REQUEST', this.config);
	},

    // Override dom generator.
    getDom: function() {	
    	
    	var wrapper = document.createElement("div");
    	wrapper.className = "light small";
    	
		if (!this.loaded) {
			wrapper.innerHTML = "Loading ...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
    	
		var temp = document.createElement("div");
        temp.innerHTML = "" + this.bpm + " bpm";
        wrapper.appendChild(temp);
        
        return wrapper;
    },
    

    socketNotificationReceived: function(notification, payload) {
    if (notification === 'DATA') {
        if(payload.bpm > 500) {
            this.bpm = 20 * 4 * ( 0.9 + (Math.random() / 10) )
        } else {
            this.bpm = 0;
        }
        this.temperature = payload.bpm;
        this.loaded = 1;
        this.updateDom();
    }
    },
});
