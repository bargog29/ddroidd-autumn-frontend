"use strict";

const form = document.querySelector(".form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const address1 = document.getElementById("address-1");
const address2 = document.getElementById("address-2");
const country = document.getElementById("country--options");
const state = document.getElementById("state--options");
const city = document.getElementById("city--options");
const errors = document.querySelector(".errors");
// const ptag = document.querySelector(".popup");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  errors.innerHTML = "";

  // Text Input Validation
  function validateRequiredInput(inputElement, errorMessage) {
    if (inputElement.value.trim() === "") {
      displayErrorMessage(errorMessage);
      e.preventDefault();
      inputElement.style.border = "1px solid red";
    } else inputElement.style.border = "1px solid var(--prussian-blue)";
  }

  validateRequiredInput(firstName, "First name is required");
  validateRequiredInput(lastName, "Last name is required");
  validateRequiredInput(address1, "Address is required");

  // Email Validation
  function validateEmail(inputElement, errorMessage) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(inputElement.value.trim())) {
      displayErrorMessage(errorMessage);
      e.preventDefault();
      inputElement.style.border = "1px solid red";
    } else inputElement.style.border = "1px solid var(--prussian-blue)";
  }

  validateEmail(email, "Email is required or wrong format");

  // Phone Input Validation
  function validatePhoneNumber(inputElement, errorMessage) {
    const phoneNumberPattern = /^\+\d{11,15}$/;
    if (!phoneNumberPattern.test(inputElement.value.trim())) {
      displayErrorMessage(errorMessage);
      e.preventDefault();
      inputElement.style.border = "1px solid red";
    } else inputElement.style.border = "1px solid var(--prussian-blue)";
  }

  validatePhoneNumber(phone, "Wrong phone number format");

  // Select Option Validation
  function validateSelect(selectElement, errorMessage) {
    if (selectElement.value === "" || selectElement.value === null) {
      displayErrorMessage(errorMessage);
      e.preventDefault();
      city.style.border = "1px solid red";
      country.style.border = "1px solid red";
    } else selectElement.style.border = "1px solid var(--prussian-blue)";
  }

  validateSelect(country, "Country is required");
  validateSelect(city, "City is required");

  //   country.removeAttribute("required");

  //   state.removeAttribute("required");

  //   city.removeAttribute("required");

  if (!errors.hasChildNodes()) {
    saveFormData();
    window.location.href = "success.html";
  }
});

function displayErrorMessage(message) {
  const errorMessage = document.createElement("li");
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
  errors.appendChild(errorMessage);
}

function saveFormData() {
  const formData = {
    "first-name": firstName.value,
    "last-name": lastName.value,
    phone: phone.value,
    email: email.value,
    "address-1": address1.value,
    "address-2": address2.value ? address2.value : "none",
    country: country.value,
    state: state.value ? state.value : "none",
    city: city.value,
  };

  localStorage.setItem("formData", JSON.stringify(formData));
}
