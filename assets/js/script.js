var cityData = {
    name : "",
    temp : "",
    humidity : "",
    windSpeed : "",
    longitude : "",
    latitude : "",
    uvIndex : "",
    condition: ""
};

var dailyDiv;

function fiveDay() {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityData.latitude + "&lon=" + cityData.longitude + "&exclude=hourly,current,minutely,alerts&appid=e63493ef81c38e6756f2b8a60370d8ef&units=imperial&cnt=5";

    var myDate = moment().format('DD/MM/YYYY');

   /* if (($(".daily").length)) {
        $(".daily").remove();
    }*/
    var weatherIcon;
    $(".daily").remove();
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                   console.log(data);
                    cntr = 1;
                   for (var i = 0; i < 5; i++) {
                       console.log("The weather code is " + data.daily[i].weather[0].icon);
                       weatherIcon = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";
                       dailyDiv = $("<div>").attr("class", "daily");
                       myDate = moment().add(cntr, 'days').format("MM/DD/YYYY");
                       dailyDiv.append($("<p>").text(myDate));
                       dailyDiv.append($("<img>").attr("src", weatherIcon));
                       dailyDiv.append($("<p>").text("Temp: " + data.daily[i].temp.day + " F"));
                       dailyDiv.append($("<p>").text("Wind: " + data.daily[i].wind_speed + " MPH"));
                       dailyDiv.append($("<p>").text("Humidity: " + data.daily[i].humidity + " %"));
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
        $("#cityname").val = "";
}


function displayWeather() {

    var weatherIcon = "http://openweathermap.org/img/wn/" + cityData.condition + ".png"
    console.log(cityData.condition);
    $("#cityanddate").text(cityData.name + " (" + moment().format("MM/DD/YYYY") + ")");
    $("#cond").attr("src", weatherIcon);
    $("#temp").text("Temp : " + cityData.temp +  " F");
    $("#wind").text("Wind : " + cityData.windSpeed + " MPH");
    $("#humidity").text("Humidity : " + cityData.humidity + " %");
    $("#uv").text(cityData.uvIndex);

    if (parseInt(cityData.uvIndex) <= 2) {
        $("#uv").attr("class", "low");
    }
    else if ((parseInt(cityData.uvIndex) >= 3) && (parseInt(cityData.uvIndex) <= 5)) {
        $("#uv").attr("class", "moderate");
    }
    else if ((parseInt(cityData.uvIndex) >= 6) && (parseInt(cityData.uvIndex) <= 7)) {
        $("#uv").attr("class", "high");
    }
    else if ((parseInt(cityData.uvIndex) >= 8) && (parseInt(cityData.uvIndex) <= 10)) {
        $("#uv").attr("class", "veryHigh");
    }
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
                    cityData.condition = data.weather[0].icon;
                    
                    getCityUV(cityData.longitude, cityData.latitude);

                    console.log(data);
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
        $("#cityname").val("");
    
    }

}






$("#city-form").on("submit", getCityName);