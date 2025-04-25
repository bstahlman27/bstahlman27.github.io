document.addEventListener("DOMContentLoaded", () => {
    const weekdaySlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
    const weekendTimeSlots = ["10:00 AM", "12:00 PM"];
    const calendarContainer = document.getElementById("calendar-container");
    if (!calendarContainer) return;
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const currentMonthIndex = today.getMonth();
    const currentYear = today.getFullYear();
    const monthName = today.toLocaleString("default", { month: "long" });
    const header = document.createElement("h3");
    header.textContent = `${monthName} ${currentYear}`;
    calendarContainer.appendChild(header);

    const daysOfWeekRow = document.createElement("div");
    daysOfWeekRow.classList.add("days-of-week-row");
    calendarContainer.appendChild(daysOfWeekRow);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    daysOfWeek.forEach((dayName) => {
        const colHeader = document.createElement("div");
        colHeader.classList.add("day-of-week-header");
        colHeader.textContent = dayName;
        daysOfWeekRow.appendChild(colHeader);
    });

    const firstOfMonth = new Date(currentYear, currentMonthIndex, 1);
    const lastOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);
    const totalDaysInMonth = lastOfMonth.getDate();
    const startDayOfWeek = firstOfMonth.getDay();
    const totalCells = 35;
    for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
      const dayNum = cellIndex - startDayOfWeek + 1;
      const dayBox = document.createElement("div");
      dayBox.classList.add("info-box");
      let displayYear = currentYear;
      let displayMonthIndex = currentMonthIndex;
      let displayDate = dayNum;
      if (dayNum < 1) {
        const prevMonthLastDate = new Date(currentYear, currentMonthIndex, 0).getDate();
        displayDate = prevMonthLastDate + dayNum;
        displayMonthIndex = currentMonthIndex - 1;
        if (displayMonthIndex < 0) {
          displayMonthIndex = 11;
          displayYear -= 1;
        }
      } else if (dayNum > totalDaysInMonth) {
        displayDate = dayNum - totalDaysInMonth;
        displayMonthIndex = currentMonthIndex + 1;
        if (displayMonthIndex > 11) {
          displayMonthIndex = 0;
          displayYear += 1;
        }
      }
      const cellDateObj = new Date(displayYear, displayMonthIndex, displayDate);
      const cellMonthName = cellDateObj.toLocaleString("default", { month: "long" });
      const title = document.createElement("h4");
      title.textContent = `${cellMonthName} ${displayDate}`;
      dayBox.appendChild(title);
      const isInCurrentMonth = (displayMonthIndex === currentMonthIndex && displayYear === currentYear);
      if (isInCurrentMonth) {
        const isWeekend = cellDateObj.getDay() === 0 || cellDateObj.getDay() === 6;
        const timeSlots = isWeekend ? weekendTimeSlots : weekdaySlots;
        const slotList = document.createElement("ul");
        timeSlots.forEach((slot) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.textContent = slot;
          if (cellDateObj >= todayMidnight) {
            link.href = `appointmentForm.html?date=${displayYear}-${displayMonthIndex + 1}-${displayDate}`
                        + `&time=${encodeURIComponent(slot)}`;
          } else {
            li.style.pointerEvents = "none";
            li.style.cursor = "default";
          }
  
          li.appendChild(link);
          slotList.appendChild(li);
        });
        dayBox.appendChild(slotList);
      }
      if (cellDateObj < todayMidnight) {
        dayBox.style.opacity = 0.5;
      }
      if (!isInCurrentMonth) {
        dayBox.style.opacity = 0.5;
      }
      calendarContainer.appendChild(dayBox);
    }


    const pins = document.querySelectorAll(".map-container .pin");
    const tooltip = document.getElementById("map-tooltip");

    pins.forEach((pin) => {
      pin.addEventListener("mouseenter", (e) => {
        const rect = pin.getBoundingClientRect();
        const mapRect = pin.closest(".map-container").getBoundingClientRect();
        tooltip.textContent = pin.dataset.location;
        tooltip.style.tip = `${rect.top - mapRect.top - 10}px`;
        tooltip.style.left = `${rect.left - mapRect.left + 20}px`;
        tooltip.style.display = "block";
      });
      pin.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });
    });
  });
  