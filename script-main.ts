document.addEventListener('DOMContentLoaded', () => {
        const hourSelect = document.getElementById('hour-select') as HTMLSelectElement;
        const minuteSelect = document.getElementById('minute-select') as HTMLSelectElement;
        const ampmSelect = document.getElementById('ampm-select') as HTMLSelectElement;
        const currentTimeDisplay = document.getElementById('current-time') as HTMLHeadingElement;
        const setAlarmButton = document.getElementById('set-alarm') as HTMLButtonElement;
        const alarmSound = document.getElementById('alarm-sound') as HTMLAudioElement;
    
        let alarmTime: string | null = null;
        let alarmInterval: NodeJS.Timeout | null = null;
    
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
    
        // Initialize options and event listeners
        populateOptions();
        setAlarmButton.addEventListener('click', setAlarm);
    
        // Initial call to set up the time display
        updateTime();
        setInterval(updateTime, 1000); // Update time every second
    });
    