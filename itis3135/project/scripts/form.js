document.addEventListener("DOMContentLoaded", () => {
    //the function for each time slot contact form
    const tutoringRadio = document.getElementById("tutoring"); //variable for the tutoring radio button
    const taxRadio = document.getElementById("tax"); //variable for the tax radio button
    const classList = document.getElementById("class-list"); //list of classes/subjects for tutoring
    const toggleClassList = () => {
        if (tutoringRadio.checked) {
            classList.style.display = "block"; //shows the class list if the tutoring button is selected
        } else {
            classList.style.display = "none"; //keeps the class list hidden if nothing or tax is selected
        }
    };
    //these make sure that only one is selected at any time, and if you switch between them the class list should only be active if tutoring is selected
    tutoringRadio.addEventListener("change", toggleClassList);
    taxRadio.addEventListener("change", toggleClassList);

    const heading = document.getElementById("appointment-header"); //the variable for the appointment header at the top of the form
    const searchParams = new URLSearchParams(window.location.search); //gets data from the current url, and this url has the date and time that we'll use next
    const dateStr = searchParams.get("date"); //gets the selected date as a word
    const timeStr = searchParams.get("time"); //gets the selected time as a word
    heading.textContent = `Scheduling Details for ${dateStr} at ${timeStr}`; //puts this string in the header of the form, so each different time slot on each different day will have the right date and time on its form.
});