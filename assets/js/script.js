var cityData = {
    name : "",
    temp : "",
    wind : "",
    humidity : "",
    windSpeed : "",
    longitude : "",
    latitude : "",
    uvIndex : ""
};

function getCityUV(cLon, cLat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cLat + "&lon=" + cLon + "&exclude=hourly,daily&appid=e63493ef81c38e6756f2b8a60370d8ef&units=imperial";

    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                   cityData.uvIndex = data.current.uvi;
                    
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
                    cityData.wind = data.wind.speed;
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