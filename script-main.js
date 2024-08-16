document.addEventListener('DOMContentLoaded', function () {
    var hourSelect = document.getElementById('hour-select');
    var minuteSelect = document.getElementById('minute-select');
    var ampmSelect = document.getElementById('ampm-select');
    var currentTimeDisplay = document.getElementById('current-time');
    var setAlarmButton = document.getElementById('set-alarm');
    var alarmSound = document.getElementById('alarm-sound');
    var alarmTime = null;
    var alarmInterval = null;
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
        if (alarmInterval) {
            clearInterval(alarmInterval);
        }
        if (alarmSound) {
            alarmSound.play();
        }
        alert('Alarm ringing! Monsoon Melody is playing.');
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
    // Initialize options and event listeners
    populateOptions();
    setAlarmButton.addEventListener('click', setAlarm);
    // Initial call to set up the time display
    updateTime();
    setInterval(updateTime, 1000); // Update time every second
});
