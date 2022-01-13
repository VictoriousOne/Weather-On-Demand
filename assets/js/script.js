var cityData = {
    name : "",
    temp : "",
    humidity : "",
    windSpeed : "",
    longitude : "",
    latitude : "",
    uvIndex : ""
};

function fiveDay() {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityData.latitude + "&lon=" + cityData.longitude + "&exclude=hourly,current,minutely,alerts&appid=e63493ef81c38e6756f2b8a60370d8ef&units=imperial&cnt=5";

    var myDate = moment().format('DD/MM/YYYY');
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                   console.log(data);
                    cntr = 1;
                   for (var i = 0; i < 5; i++) {
                       var dailyDiv = $("<div>").attr("class", "daily");
                       myDate = moment().add(cntr, 'days').format("MM/DD/YYYY");
                       dailyDiv.append($("<p>").text(myDate));
                       dailyDiv.append($("<p>").text("Temp: " + data.daily[i].temp.day));
                       dailyDiv.append($("<p>").text("Wind: " + data.daily[i].wind_speed));
                       dailyDiv.append($("<p>").text("Humidity: " + data.daily[i].humidity));
                       $("#5Day").append(dailyDiv);
                       cntr++;
                   }
                    
                });
            } else {
                alert('Error: 5 day forecast not found');
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to endpoint");
        });

}


function displayWeather() {

    $("#temp").text("Temp : " + cityData.temp);
    $("#wind").text("Wind : " + cityData.windSpeed);
    $("#humidity").text("Humidity : " + cityData.humidity);
    $("#uv").text("UV Index : " + cityData.uvIndex);
    fiveDay();
}


function getCityUV(cLon, cLat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cLat + "&lon=" + cLon + "&exclude=hourly,daily&appid=e63493ef81c38e6756f2b8a60370d8ef&units=imperial";

    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                   cityData.uvIndex = data.current.uvi;
                   displayWeather();
                    
                    console.log(data);
                });
            } else {
                alert('Error: UV Index not found');
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to endpoint");
        });

}

function getCityData(cName) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cName +"&appid=e63493ef81c38e6756f2b8a60370d8ef&units=imperial";

    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    cityData.name = cName;
                    cityData.temp = data.main.temp;
                    cityData.windSpeed = data.wind.speed;
                    cityData.humidity = data.main.humidity;
                    cityData.longitude = data.coord.lon;
                    cityData.latitude = data.coord.lat;
                    getCityUV(cityData.longitude, cityData.latitude);

                    //console.log(data);
                });
            } else {
                alert('Error: City not found');
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to endpoint");
        });
}

function getCityName(event) {

    event.preventDefault();
    // get value from input element
    var cityname = $("#cityname").val().trim();
    console.log(cityname);

    if (cityname) {
        getCityData(cityname);
        (cityname);
        $("#cityname").val = "";
    
    }

}






$("#city-form").on("submit", getCityName);