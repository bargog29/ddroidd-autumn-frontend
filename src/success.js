"use strict";

const formDisplay = document.getElementById("form-data");
document.addEventListener("DOMContentLoaded", function () {
  const formData = JSON.parse(localStorage.getItem("formData"));
  if (formData) {
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${formData[key]}`;
        formDisplay.appendChild(p);
      }
    }
  }

  const deleteButton = document.getElementById("delete-button");
  deleteButton.addEventListener("click", function () {
    formDisplay.innerHTML = "";
    localStorage.removeItem("formData");

    const message = document.createElement("p");
    message.textContent =
      "Form data has been deleted. You will be redirected to form page :))";
    formDisplay.appendChild(message);

    setTimeout(function () {
      window.location.href = "index.html";
    }, 5000);
  });
});
