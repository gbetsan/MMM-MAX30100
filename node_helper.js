'use strict';

/* Magic Mirror
 * Module: MMM-PIR-Sensor
 *
 * By Benjamin Angst 
 * MIT Licensed.
*/

const NodeHelper = require('node_helper');
const exec = require('child_process').exec;

module.exports = NodeHelper.create({
		 start: function () {
			 console.log('Heart rate helper started ...');
		 },
		 
		 // Subclass socketNotificationReceived received.
		 socketNotificationReceived: function(notification, payload) {
		   const self = this;
		   if (notification === 'REQUEST') {
			   const self = this
			   this.config = payload
			   
			   // execute external DHT Script
			   exec("sudo python ./modules/MMM-MAX30100/read_sensor.py " + this.config.sensorPIN, (error, stdout) => {
			   if (error) {
				    console.error(`exec error: ${error}`);
				    return;
				}
			   	  // var arr = stdout.split(",");

				  console.log("Log: " + parseInt(stdout));
				  // Send BPM
		          self.sendSocketNotification('DATA', {
						bpm: parseInt(stdout),
						temp: 100
				  });
			 });
		   }
		 }
 
});
