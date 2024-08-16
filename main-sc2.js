document.addEventListener('DOMContentLoaded', function () {
    var hourSelect = document.getElementById('hour-select');
    var minuteSelect = document.getElementById('minute-select');
    var ampmSelect = document.getElementById('ampm-select');
    var currentTimeDisplay = document.getElementById('current-time');
    var setAlarmButton = document.getElementById('set-alarm');
    var snoozeButton = document.getElementById('snooze-alarm');
    var stopButton = document.getElementById('stop-alarm');
    var alarmSound = document.getElementById('alarm-sound');
    var alarmTime = null;
    var alarmInterval = null;
    var snoozeTimeout = null;
    // Hide snooze and stop buttons initially
    snoozeButton.style.display = 'none';
    stopButton.style.display = 'none';
    // Populate hours and minutes options
    function populateOptions() {
        for (var i = 1; i <= 12; i++) {
            var hourOption = document.createElement('option');
            hourOption.value = String(i).padStart(2, '0');
            hourOption.textContent = String(i).padStart(2, '0');
            hourSelect.appendChild(hourOption);
        }
        for (var i = 0; i < 60; i++) {
            var minuteOption = document.createElement('option');
            minuteOption.value = String(i).padStart(2, '0');
            minuteOption.textContent = String(i).padStart(2, '0');
            minuteSelect.appendChild(minuteOption);
        }
    }
    // Update current time display
    function updateTime() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeDisplay.textContent = "".concat(hours, ":").concat(minutes, ":").concat(seconds);
        if (alarmTime && "".concat(hours, ":").concat(minutes) === alarmTime) {
            triggerAlarm();
        }
    }
    // Trigger alarm function
    function triggerAlarm() {
        console.log('Alarm triggered');
        if (alarmInterval) {
            clearInterval(alarmInterval);
        }
        if (snoozeTimeout) {
            clearTimeout(snoozeTimeout);
        }
        if (alarmSound) {
            alarmSound.play();
        }
        snoozeButton.style.display = 'block'; // Show snooze button
        stopButton.style.display = 'block'; // Show stop button
        snoozeButton.disabled = false;
        stopButton.disabled = false;
        alert('Alarm ringing! Monsoon Melody is playing. 20s');
    }
    // Set alarm function
    function setAlarm() {
        var hour = hourSelect.value;
        var minute = minuteSelect.value;
        var ampm = ampmSelect.value;
        if (hour && minute && ampm) {
            alarmTime = "".concat(hour, ":").concat(minute);
            if (ampm === 'PM' && hour !== '12') {
                alarmTime = "".concat(String(Number(hour) + 12).padStart(2, '0'), ":").concat(minute);
            }
            else if (ampm === 'AM' && hour === '12') {
                alarmTime = "00:".concat(minute);
            }
            alert("Alarm set for ".concat(hour, ":").concat(minute, " ").concat(ampm));
        }
        else {
            alert('Please select a valid time.');
        }
        if (alarmInterval) {
            clearInterval(alarmInterval);
        }
        alarmInterval = setInterval(updateTime, 1000);
    }
    // Snooze alarm function
    function snoozeAlarm() {
        console.log('Snooze button clicked');
        if (alarmSound) {
            alarmSound.pause();
            alarmSound.currentTime = 0; // Reset sound to the beginning
        }
        snoozeButton.disabled = true;
        stopButton.disabled = true;
        snoozeTimeout = setTimeout(function () {
            triggerAlarm();
        }, 5 * 60 * 1000); // Snooze for 5 minutes
    }
    // Stop alarm function
    function stopAlarm() {
        console.log('Stop button clicked');
        if (alarmSound) {
            alarmSound.pause();
            alarmSound.currentTime = 0; // Reset sound to the beginning
        }
        if (alarmInterval) {
            clearInterval(alarmInterval);
        }
        if (snoozeTimeout) {
            clearTimeout(snoozeTimeout);
        }
        snoozeButton.disabled = true;
        stopButton.disabled = true;
        snoozeButton.style.display = 'none'; // Hide snooze button
        stopButton.style.display = 'none'; // Hide stop button
        alarmTime = null;
        alert('Alarm stopped.');
    }
    // Initialize options and event listeners
    populateOptions();
    setAlarmButton.addEventListener('click', setAlarm);
    snoozeButton.addEventListener('click', snoozeAlarm);
    stopButton.addEventListener('click', stopAlarm);
    // Initial call to set up the time display
    updateTime();
    setInterval(updateTime, 1000); // Update time every second
});
