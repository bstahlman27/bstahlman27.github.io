window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("introForm");
    const resultDiv = document.getElementById("result");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const heading = document.getElementById("heading");
      heading.innerText = "Result: ";
  
      if (!formData.get("check")) {
        alert("Agree to the terms before submitting.");
        return;
      }
  
      const name = formData.get("name") || "Ben Stahlman";
      const mascot = formData.get("mascot");
      const caption = formData.get("caption");
  
      let html = `
        <h2>Introduction</h2>
        <h2>${name} || ${mascot}</h2>
        <figure id="intro-photo">
      `;
  
      const imageFile = formData.get("image");
      if (imageFile && imageFile.type.startsWith("image/")) {
        const imgURL = URL.createObjectURL(imageFile);
        html += `
          <img src="${imgURL}" alt="${name}">
          <figcaption>${caption}</figcaption>
        `;
      }
      html += `</figure><ul>`;
  
      const addItem = (label, id) => {
        html += `<li><b>${label}</b> ${formData.get(id)}</li>`;
      };
  
      addItem("Personal Background:", "personalBg");
      addItem("Professional Background:", "professionalBg");
      addItem("Academic background:", "academicBg");
      addItem("Background in this subject:", "WebDevBg");
      addItem("Primary Computer Platform:", "platform");
  
      const courseNames = [...form.querySelectorAll('input[name="courseName"]')];
      const courseDescs = [...form.querySelectorAll('input[name="courseDesc"]')];
  
      if (courseNames.length > 0) {
        html += `<li><b>Courses I'm Taking & Why:</b><ul>`;
        for (let i = 0; i < courseNames.length; i++) {
          html += `<li><b>${courseNames[i].value} - </b>${courseDescs[i].value}</li>`;
        }
        html += `</ul></li>`;
      }
  
      addItem("Funny/Interesting item about yourself:", "funny");
  
      const extra = formData.get("anything-else");
      if (extra) {
        html += `<li><b>Anything else:</b> ${extra}</li>`;
      }
  
      html += `</ul>`;
  
      form.style.display = "none";
      resultDiv.innerHTML = html;
    });
  
    form.addEventListener("reset", () => {
      setTimeout(() => {
        const addedCourses = document.querySelectorAll(".course-wrapper");
        addedCourses.forEach((div) => div.remove());
      }, 0);
    });
  });

    window.addCourse = () => {
        const wrapper = document.createElement("div");
        wrapper.className = "course-wrapper";
        const courseInput = document.createElement("input");
        courseInput.type = "text";
        courseInput.name = "courseName";
        courseInput.placeholder = "Enter course name";
        courseInput.required = true;
        const descInput = document.createElement("input");
        descInput.type = "text";
        descInput.name = "courseDesc";
        descInput.placeholder = "Enter course description";
        descInput.required = true;
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => wrapper.remove();
        wrapper.appendChild(courseInput);
        wrapper.appendChild(descInput);
        wrapper.appendChild(deleteBtn);
        document.getElementById('courses').appendChild(wrapper);
    };
