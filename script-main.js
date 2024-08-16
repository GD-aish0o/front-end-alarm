document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements
    // DOM === Document object model. programming interface for html
    var hourSelect = document.getElementById('hour-select');
    var minuteSelect = document.getElementById('minute-select');
    var ampmSelect = document.getElementById('ampm-select');
    var currentTimeDisplay = document.getElementById('current-time');
    var setAlarmButton = document.getElementById('set-alarm');
    var snoozeButton = document.getElementById('snooze');
    var stopButton = document.getElementById('stop');
    var alarmSound = document.getElementById('alarm-sound');
    // Variables to store the alarm time, interval for checking time, and timeout for snooze
    var alarmTime = null;
    var alarmInterval = null;
    var snoozeTimeout = null;
    // Hide snooze and stop buttons initially
    snoozeButton.style.display = 'none';
    stopButton.style.display = 'none';
    // Function to populate hour and minute select options
    function populateOptions() {
        // Populate hour options (1-12)
        for (var i = 1; i <= 12; i++) {
            var hourOption = document.createElement('option');
            hourOption.value = String(i).padStart(2, '0');
            hourOption.textContent = String(i).padStart(2, '0');
            hourSelect.appendChild(hourOption);
        }
        // Populate minute options (00-59)
        for (var i = 0; i < 60; i++) {
            var minuteOption = document.createElement('option');
            minuteOption.value = String(i).padStart(2, '0');
            minuteOption.textContent = String(i).padStart(2, '0');
            minuteSelect.appendChild(minuteOption);
        }
    }
    // Function to update the current time display every second
    function updateTime() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeDisplay.textContent = "".concat(hours, ":").concat(minutes, ":").concat(seconds);
        // Check if current time matches the alarm time
        if (alarmTime && "".concat(hours, ":").concat(minutes) === alarmTime) {
            triggerAlarm();
        }
    }
    // Function to trigger the alarm
    function triggerAlarm() {
        // Stop checking time when the alarm rings
        if (alarmInterval) {
            clearInterval(alarmInterval);
        }
        // Clear any existing snooze timeouts
        if (snoozeTimeout) {
            clearTimeout(snoozeTimeout);
        }
        // Play the alarm sound
        if (alarmSound) {
            alarmSound.play();
        }
        // Show snooze and stop buttons
        snoozeButton.style.display = 'block';
        stopButton.style.display = 'block';
        // Alert the user that the alarm is ringing
        alert('Alarm ringing! Monsoon Melody is playing.');
    }
    // Function to set the alarm based on user input
    function setAlarm() {
        var hour = hourSelect.value;
        var minute = minuteSelect.value;
        var ampm = ampmSelect.value;
        // Validate that all inputs are selected
        if (hour && minute && ampm) {
            // Convert the selected time to 24-hour format
            alarmTime = "".concat(hour, ":").concat(minute);
            if (ampm === 'PM' && hour !== '12') {
                alarmTime = "".concat(String(Number(hour) + 12).padStart(2, '0'), ":").concat(minute);
            }
            else if (ampm === 'AM' && hour === '12') {
                alarmTime = "00:".concat(minute);
            }
            // Notify the user that the alarm is set
            alert("Alarm set for ".concat(hour, ":").concat(minute, " ").concat(ampm));
        }
        else {
            // Alert the user if any input is missing
            alert('Please select a valid time.');
            return;
        }
        // Clear any existing interval before setting a new one
        if (alarmInterval) {
            clearInterval(alarmInterval);
        }
        // Set an interval to check the time every second
        alarmInterval = setInterval(updateTime, 1000);
    }
    // Function to snooze the alarm for 5 minutes
    function snoozeAlarm() {
        // Pause the alarm sound and reset it to the beginning
        if (alarmSound) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
        // Disable the snooze and stop buttons during the snooze period
        snoozeButton.disabled = true;
        stopButton.disabled = true;
        // Set a timeout to trigger the alarm again after 5 minutes
        snoozeTimeout = setTimeout(function () {
            triggerAlarm();
        }, 5 * 60 * 1000); // Snooze for 5 minutes
        // Notify the user that the alarm is snoozed
        alert('Alarm snoozed for 5 minutes.');
    }
    // Function to stop the alarm
    function stopAlarm() {
        // Pause the alarm sound and reset it to the beginning
        if (alarmSound) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
        // Clear the interval and any snooze timeouts
        if (alarmInterval) {
            clearInterval(alarmInterval);
        }
        if (snoozeTimeout) {
            clearTimeout(snoozeTimeout);
        }
        // Disable the snooze and stop buttons and hide them
        snoozeButton.disabled = true;
        stopButton.disabled = true;
        snoozeButton.style.display = 'none';
        stopButton.style.display = 'none';
        // Reset the alarm time to null
        alarmTime = null;
        // Notify the user that the alarm is stopped
        alert('Alarm stopped.');
    }
    // Initialize the hour and minute options
    populateOptions();
    // Add event listeners for the set, snooze, and stop buttons
    setAlarmButton.addEventListener('click', setAlarm);
    snoozeButton.addEventListener('click', snoozeAlarm);
    stopButton.addEventListener('click', stopAlarm);
    // Initial call to display the current time immediately
    updateTime();
    // Update the time display every second
    setInterval(updateTime, 1000);
});
