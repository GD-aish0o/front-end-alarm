document.addEventListener('DOMContentLoaded', () => {
    const hourSelect = document.getElementById('hour-select') as HTMLSelectElement;
    const minuteSelect = document.getElementById('minute-select') as HTMLSelectElement;
    const ampmSelect = document.getElementById('ampm-select') as HTMLSelectElement;
    const currentTimeDisplay = document.getElementById('current-time') as HTMLHeadingElement;
    const setAlarmButton = document.getElementById('set-alarm') as HTMLButtonElement;
    const snoozeButton = document.getElementById('snooze-alarm') as HTMLButtonElement;
    const stopButton = document.getElementById('stop-alarm') as HTMLButtonElement;
    const alarmSound = document.getElementById('alarm-sound') as HTMLAudioElement;

    let alarmTime: string | null = null;
    let alarmInterval: NodeJS.Timeout | null = null;
    let snoozeTimeout: NodeJS.Timeout | null = null;

    // Hide snooze and stop buttons initially
    snoozeButton.style.display = 'none';
    stopButton.style.display = 'none';

    // Populate hours and minutes options
    function populateOptions() {
        for (let i = 1; i <= 12; i++) {
            const hourOption = document.createElement('option');
            hourOption.value = String(i).padStart(2, '0');
            hourOption.textContent = String(i).padStart(2, '0');
            hourSelect.appendChild(hourOption);
        }

        for (let i = 0; i < 60; i++) {
            const minuteOption = document.createElement('option');
            minuteOption.value = String(i).padStart(2, '0');
            minuteOption.textContent = String(i).padStart(2, '0');
            minuteSelect.appendChild(minuteOption);
        }
    }

    // Update current time display
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

        if (alarmTime && `${hours}:${minutes}` === alarmTime) {
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
        const hour = hourSelect.value;
        const minute = minuteSelect.value;
        const ampm = ampmSelect.value;

        if (hour && minute && ampm) {
            alarmTime = `${hour}:${minute}`;
            if (ampm === 'PM' && hour !== '12') {
                alarmTime = `${String(Number(hour) + 12).padStart(2, '0')}:${minute}`;
            } else if (ampm === 'AM' && hour === '12') {
                alarmTime = `00:${minute}`;
            }
            alert(`Alarm set for ${hour}:${minute} ${ampm}`);
        } else {
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
        snoozeTimeout = setTimeout(() => {
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

