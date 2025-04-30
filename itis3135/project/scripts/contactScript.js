document.addEventListener("DOMContentLoaded", () => {
  //for the calendar 
  const weekdaySlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]; //these are the meeting time slots
    const weekendTimeSlots = ["10:00 AM", "12:00 PM"]; //different time slots for weekend
    const calendarContainer = document.getElementById("calendar-container"); //where the calendar element and script will be
    if (!calendarContainer) return; //if theres no calendar container, it stops executing
    const today = new Date(); //js date function for today
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()); //full date for today, using midnight to signify it starts and ends at 12am
    const currentMonthIndex = today.getMonth(); //todays month
    const currentYear = today.getFullYear(); //todays year
    const monthName = today.toLocaleString("default", { month: "long" }); //makes the month into a word
    const header = document.createElement("h3"); //creates h3 that the header will be in
    header.textContent = `${monthName} ${currentYear}`; //puts the header together
    calendarContainer.appendChild(header); //adds the header to where the calendar is

    const daysOfWeekRow = document.createElement("div"); //makes a div for each row of the calendar
    daysOfWeekRow.classList.add("days-of-week-row"); //gives each row the days-of-week-row class for styling
    calendarContainer.appendChild(daysOfWeekRow); //puts each row where the calendar is
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //array for the days of the week
    daysOfWeek.forEach((dayName) => {
        const colHeader = document.createElement("div"); //makes a div above each column of the calendar
        colHeader.classList.add("day-of-week-header"); //gives each header the day-of-week-header class for styling
        colHeader.textContent = dayName; //putting the name of each day as the column header
        daysOfWeekRow.appendChild(colHeader); //puts the headers above each calendar column
    });

    const firstOfMonth = new Date(currentYear, currentMonthIndex, 1); //the first day of the month
    const lastOfMonth = new Date(currentYear, currentMonthIndex + 1, 0); //the last day of the month
    const totalDaysInMonth = lastOfMonth.getDate(); //the number of days in each month
    const startDayOfWeek = firstOfMonth.getDay(); //the first day of the month
    const totalCells = 35; //maxes out the number of calendar cells to be 35, so theres not a ton of empty ones
    for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
      const dayNum = cellIndex - startDayOfWeek + 1; //finds the date of each day 
      const dayBox = document.createElement("div"); //makes a new div element for each day
      dayBox.classList.add("info-box"); //gives them the info-box class for styling
      let displayYear = currentYear; //each cells year will be the current year
      let displayMonthIndex = currentMonthIndex; //each cells month will be the current month
      let displayDate = dayNum; //each cells day will be its day
      if (dayNum < 1) { //handles previous month
        const prevMonthLastDate = new Date(currentYear, currentMonthIndex, 0).getDate(); //date of the last day of the last month
        displayDate = prevMonthLastDate + dayNum; //displays their dates
        displayMonthIndex = currentMonthIndex - 1; //makes that months index 1 less than the current month
        if (displayMonthIndex < 0) { //we cant go 1 less than january, so it will go to december
          displayMonthIndex = 11;
          displayYear -= 1; //reverts the year to the last decembers year
        }
      } else if (dayNum > totalDaysInMonth) { //handles the end of the month
        displayDate = dayNum - totalDaysInMonth; //displays the date
        displayMonthIndex = currentMonthIndex + 1; //increases month index by 1
        if (displayMonthIndex > 11) { //we can't go 1 more than december, so it will go to the next january
          displayMonthIndex = 0;
          displayYear += 1; //increments the year to the next januarys year
        }
      }
      const cellDateObj = new Date(displayYear, displayMonthIndex, displayDate); //variable for the object for cells date
      const cellMonthName = cellDateObj.toLocaleString("default", { month: "long" }); //turns the month back into a word
      const title = document.createElement("h4"); //makes an h4 for each cell
      title.textContent = `${cellMonthName} ${displayDate}`; //the title will be in this format
      dayBox.appendChild(title); //puts each title on each box
      const isInCurrentMonth = (displayMonthIndex === currentMonthIndex && displayYear === currentYear); //checks if the day is part of the current month
      if (isInCurrentMonth) {
        const isWeekend = cellDateObj.getDay() === 0 || cellDateObj.getDay() === 6; //checks if a day is a weekend day
        const timeSlots = isWeekend ? weekendTimeSlots : weekdaySlots; //ternary that uses different time slots depending on if its a weekend or not
        const slotList = document.createElement("ul"); //puts the time slots in a ul in each box
        timeSlots.forEach((slot) => {
          const li = document.createElement("li"); //each time will be one li
          const link = document.createElement("a"); //they will each link to a contact form
          link.textContent = slot; //changes the text of the link to the slot
          if (cellDateObj >= todayMidnight) {
            link.href = `appointmentForm.html?date=${displayYear}-${displayMonthIndex + 1}-${displayDate}` //the actual link that will have the correct date in it
                        + `&time=${encodeURIComponent(slot)}`; //and the time slot
          } else {
            li.style.pointerEvents = "none"; //the grayed out boxes won't be clickable
            li.style.cursor = "default";
          }
  
          li.appendChild(link); //puts the link on each time slot li
          slotList.appendChild(li); //puts each time slot li into the ul
        });
        dayBox.appendChild(slotList); //puts each time slots ul into the cell
      }
      if (cellDateObj < todayMidnight) { //makes the previous days grayed out
        dayBox.style.opacity = 0.5;
      }
      if (!isInCurrentMonth) { //makes all days not in the current month grayed out
        dayBox.style.opacity = 0.5;
      }
      calendarContainer.appendChild(dayBox); //puts each box in the calendar container
    }

    //for the map
    const pins = document.querySelectorAll(".map-container .pin"); //variable for each pin on the map, which are the places to meet for appointments
    const tooltip = document.getElementById("map-tooltip"); //the message popup for each location

    pins.forEach((pin) => {
      pin.addEventListener("mouseenter", (e) => { //will happen when the mouse hovers over the pin
        const rect = pin.getBoundingClientRect(); //gets the position of each pin
        const mapRect = pin.closest(".map-container").getBoundingClientRect(); //gets the position of the map on the content box its in
        tooltip.textContent = pin.dataset.location; //puts the message content to be the location name
        tooltip.style.tip = `${rect.top - mapRect.top - 20}px`; //sets the position of the tooltip from the top
        tooltip.style.left = `${rect.left - mapRect.left + 70}px`; //sets the position of the tooltop from the left
        tooltip.style.display = "block";
      });
      pin.addEventListener("mouseleave", () => {
        tooltip.style.display = "none"; //the tooltip disappears when the users mouse leaves the pin
      });
    });
  });
  