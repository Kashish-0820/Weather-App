
  function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "fb792c5aa13aaefac86eb5eed4c06723";
    const unit = document.getElementById("unitSelect").value;
  
    document.getElementById("errorMsg").style.display = "none";
    document.getElementById("errorMsg").innerHTML = "";
  
    if (city === "") {
      alert("Please enter a city!");
      return;
    }
  
  
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
      .then(res =>{
        if(!res.ok) {
            throw new Error("City not Found!");
        }
        return res.json();
      })
      .then(data => {
        document.getElementById("inputSection").style.display = "none";
        document.getElementById("cityName").innerHTML = city;
        const unit = document.getElementById("unitSelect").value;
        document.getElementById("errorMsg").innerHTML = "";
        let symbol = (unit === "metric") ? "°C" : "°F";
        document.getElementById("mainTemp").innerHTML = `${data.main.temp}${symbol}`;
        document.getElementById("mainDesc").innerHTML = data.weather[0].description;

        document.getElementById("mainIcon").style.display = "block";
        document.getElementById("mainIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      })
      .catch(error => {
        document.getElementById("errorMsg").style.display = "block";
        document.getElementById("errorMsg").innerHTML = error.message;
      });
      
  
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`)
      .then(res =>{
        if(!res.ok){
            throw new Error ("Forcast not available for this City");
        }
        return res.json();
      })
      .then(data => {
        const forecastList = [0, 8, 16];
        const forecastDivs = ["day1", "day2", "day3"];
  
        for (let i = 0; i < 3; i++) {
          const forecast = data.list[forecastList[i]];
          const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
          const tempMax = forecast.main.temp_max.toFixed(0);
          const tempMin = forecast.main.temp_min.toFixed(0);
          const dayName = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
  
          document.getElementById(forecastDivs[i]).innerHTML = `
            <img src="${iconUrl}">
            <p>${dayName}</p>
            <p>${tempMax}°/${tempMin}°C</p>
          `;
        }
      })
      .catch(error => {
        document.getElementById("errorMsg").style.display = "block";
        document.getElementById("errorMsg").innerHTML = error.message;
      });
      
      document.getElementById("anotherCityBtn").style.display = "inline-block";

  }

  function checkAnotherCity() {
    document.getElementById("inputSection").style.display = "block"; 
    document.getElementById("cityInput").value = ""; 
    document.getElementById("anotherCityBtn").style.display = "none";
  
  
    document.getElementById("cityName").innerHTML = "";
    document.getElementById("mainTemp").innerHTML = "";
    document.getElementById("mainDesc").innerHTML = "";
    document.getElementById("mainIcon").style.display = "none";

  }
  
  