"use strict";

const countrySelect = document.getElementById("country--options");
const stateSelect = document.getElementById("state--options");
const citySelect = document.getElementById("city--options");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

let stateNames = [];
let stateCodes = [];
let cities = [];

let getStates = async (country) => {
  const url = "https://countriesnow.space/api/v0.1/countries/states";
  const data = {
    country: country,
  };

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.data && data.data.states) {
        const { states } = data.data;
        const stateNames = states.map((state) => state.name);
        const stateCodes = states.map((state) => state.state_code);
        // console.log(stateNames, stateCodes);
        return { stateNames, stateCodes };
      } else {
        console.error("Unexpected API response format:", data);
        return { stateNames: [], stateCodes: [] };
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return { stateNames: [], stateCodes: [] };
    });
};

let getCountries = async () => {
  fetchData("https://countriesnow.space/api/v0.1/countries")
    .then((data) => {
      if (data) {
        // let cities = [];
        //   console.log(cities);
        data.data.forEach((country) => {
          const option = document.createElement("option");
          option.value = country.iso2;
          // console.log(country.iso2);
          option.textContent = country.country;
          countrySelect.appendChild(option);
          //   console.log(data);
          //   cities = country.cities;
          //   console.log(cities);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
    });
};

let getCities = async (country) => {
  const url = "https://countriesnow.space/api/v0.1/countries/cities";
  const data = {
    country: country,
  };

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.data) {
        return data.data;
      } else {
        console.error("Unexpected API response format:", data);
        return [];
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });
};
getCountries();

countrySelect.addEventListener("change", async function () {
  const selectedOptionIndex = countrySelect.selectedIndex;
  const selectedOption = countrySelect.options[selectedOptionIndex];
  const selectedCountryName = selectedOption.textContent;
  console.log("Selected Text: " + selectedCountryName);

  stateSelect.innerHTML =
    '<option value="" disabled hidden selected>State</option>';
  citySelect.innerHTML =
    '<option value="" disabled hidden selected>City</option>';

  if (selectedCountryName) {
    getStates(selectedCountryName)
      .then(({ stateNames, stateCodes }) => {
        if (stateNames.length === 0) {
          const noStatesOption = document.createElement("option");
          noStatesOption.value = "";
          noStatesOption.textContent = "No states found";
          stateSelect.appendChild(noStatesOption);
        } else {
          for (let i = 0; i < stateNames.length; i++) {
            const option = document.createElement("option");
            option.value = stateCodes[i];
            option.textContent = stateNames[i];
            stateSelect.appendChild(option);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });

    getCities(selectedCountryName)
      .then((cities) => {
        if (cities.length === 0) {
          const noCitiesOption = document.createElement("option");
          noCitiesOption.value = "";
          noCitiesOption.textContent = "No cities found";
          citySelect.appendChild(noCitiesOption);
        } else {
          cities.forEach((city) => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }
});
