document.addEventListener("DOMContentLoaded", () => {
    const tutoringRadio = document.getElementById("tutoring");
    const taxRadio = document.getElementById("tax");
    const classList = document.getElementById("class-list");
    const toggleClassList = () => {
        if (tutoringRadio.checked) {
            classList.style.display = "block";
        } else {
            classList.style.display = "none";
        }
    };
    tutoringRadio.addEventListener("change", toggleClassList);
    taxRadio.addEventListener("change", toggleClassList);

    const heading = document.getElementById("appointment-header");
    const searchParams = new URLSearchParams(window.location.search);
    const dateStr = searchParams.get("date");
    const timeStr = searchParams.get("time");
    heading.textContent = `Scheduling Details for ${dateStr} at ${timeStr}`;
});