document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const monthYearDisplay = document.getElementById('monthYear');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const today = currentDate.getDate();
    const todayMonth = currentDate.getMonth();
    const todayYear = currentDate.getFullYear();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // store events
    const events = {};

    function renderCalendar() {
        calendar.innerHTML = '';
        monthYearDisplay.textContent = `${months[currentMonth]} ${currentYear}`;

        // Render the day headers
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let day of daysOfWeek) {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-header');
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        }

        // Get the first day of the month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        // Get the number of days in the month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Render empty cells for days before the first of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day');
            calendar.appendChild(emptyCell);
        }

        // Render the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day');
            dayCell.textContent = day;

            // Highlight the current date
            if (day === today && currentMonth === todayMonth && currentYear === todayYear) {
                dayCell.classList.add('current-day');
            }

            // check for events on this day
            const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
            if (events[dateKey]) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.textContent = events[dateKey];

                //add event listener to delete event
                eventDiv.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteEvent(dateKey);
                });

                dayCell.appendChild(eventDiv);
            }

            // add event listener to add events
            dayCell.addEventListener('click', () => addEvent(dateKey));

            calendar.appendChild(dayCell);
        }
    }

    function changeMonth(direction) {
        if (direction === 'prev') {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
        } else if (direction === 'next') {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        }
        renderCalendar();
    }

    function addEvent(dateKey) {
        const eventText = prompt('Enter event details:');
        if (eventText) {
            events[dateKey] = eventText;
            renderCalendar();
        }
    }

    function deleteEvent(dateKey) {
        const confirmDelete = confirm('Do you really want to delete this event?');
        if (confirmDelete) {
            delete events[dateKey];
            renderCalendar();
        }
    }

    prevMonthButton.addEventListener('click', () => changeMonth('prev'));
    nextMonthButton.addEventListener('click', () => changeMonth('next'));

    renderCalendar();
});
