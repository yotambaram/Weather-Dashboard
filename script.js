// &AAID=c372c30b4cd58eec1774beddc78c6a25
// Example of API call:
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=c372c30b4cd58eec1774beddc78c6a25

//2941e4fbbb4e4bbaaf69b1539aa53f44
//var queryURL = 'http://api.weatherbit.io/v2.0/current?api_key=2941e4fbbb4e4bbaaf69b1539aa53f44&city=seattle&country=US'

// input-city. ---> val() 
//var apiID = c372c30b4cd58eec1774beddc78c6a25

//var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";
//var queryURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';

//var queryURL = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?q=london&appid=c372c30b4cd58eec1774beddc78c6a25';
var apiKey = '&appid=c372c30b4cd58eec1774beddc78c6a25'
var currentCity = '&q=London' // from input
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + currentCity
var coords = ""

//var queryURLuvIndex = 'http://api.openweathermap.org/data/2.5/uvi?' + apiKey + coordsLat + coordsLon
//console.log(queryURLuvIndex)




function WeatherNow(linkAPI){
    if(linkAPI = queryURL){
        var weatherObj = {
            url: queryURL,
            method: "GET"
            }
        
        var currentTi = new Date();
        var currentDa = currentTi.toLocaleString()
        var splitDate = currentDa.split(',');
        var currentDate = splitDate[0]
        
        $.ajax(weatherObj).then(function(response){
            console.log(response)
            cityName = response.name
            var icon = response.weather[0].icon
            var currentTemp = response.main.temp
            var currentHumidity = response.main.humidity + '%'
            var currentWindSpeed = response.wind.speed
            console.log('Temp = ' + currentTemp, 'Humidity = ' + currentHumidity, 'current WindSpeed = ' + currentWindSpeed)
        })
    } else if(linkAPI = queryURLuvIndex){
        var coordsLon = '&lot=' + response.coord.lon
        var coordsLat = '&lot=' + response.coord.lat
    }
    

}

WeatherNow(queryURL)

