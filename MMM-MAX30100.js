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
        this.bpm = '0';
        
        this.update();
        setInterval(
        		this.update.bind(this),
        		this.config.updateInterval * 1000
        );
    },
    
	update: function(){
		this.sendSocketNotification('REQUEST', this.config);
	},

    // Override dom generatorg.
    getDom: function() {	
    	var wrapper = document.createElement("div");
    	wrapper.className = "light small";
    	
		if (!this.loaded) {
			wrapper.innerHTML = "Loading HR ...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
    	
		var temp = document.createElement("div");
        temp.innerHTML = "HR: " + String(Math.round(this.bpm)) + " bpm";
        wrapper.appendChild(temp);
        
        return wrapper;
    },
    socketNotificationReceived: function(notification, payload) {
        console.log(notification)
        if (notification === 'DATA') {
            console.log("UPDATE DOM")
            if(payload.bpm > 1000) {
                this.bpm = 20 * 4 * ( 0.9 + (Math.random() / 10) )
            } else {
                this.bpm = 0;
            }
            this.temperature = 500;
            this.loaded = true;
            this.updateDom(100);
        }
    },
});
