// &AAID=c372c30b4cd58eec1774beddc78c6a25
// Example of API call:
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=c372c30b4cd58eec1774beddc78c6a25




//var apiID = c372c30b4cd58eec1774beddc78c6a25

//var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";
//var queryURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';

//var queryURL = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?q=london&appid=c372c30b4cd58eec1774beddc78c6a25';





// input-city. ---> val().trim(hi) 

var coordsStr ='';
var apiKey = '&appid=c372c30b4cd58eec1774beddc78c6a25'
var currentCity = '&q=London' // from input
var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + currentCity
var coords = ""
var queryURLuvIndex = ''
//console.log(queryURLuvIndex)

console.log(queryURLuvIndex)


function WeatherNow(linkAPI){
    // Generic Object
    var weatherObj = {
        url: linkAPI,
        method: "GET"
        }
    // Set the clock
    var currentTi = new Date();
    var currentDa = currentTi.toLocaleString()
    var splitDate = currentDa.split(',');
    var currentDate = splitDate[0]
    // if is the weatherURL adrees
    if(linkAPI === weatherURL){
        $.ajax(weatherObj).then(function(response){
            console.log(response)
            cityName = response.name
            var icon = response.weather[0].icon
            var currentTemp = response.main.temp
            var currentHumidity = response.main.humidity + '%'
            var currentWindSpeed = response.wind.speed
            var coordLon = response.coord.lon
            var coordLat = response.coord.lat
            coordsStr = '&lat=' + coordLat + '&lon=' + coordLon
            queryURLuvIndex = 'http://api.openweathermap.org/data/2.5/uvi?' + apiKey + coordsStr //coordsStr 
            console.log(queryURLuvIndex)
            console.log('Temp = ' + currentTemp, 'Humidity = ' + currentHumidity, 'current WindSpeed = ' + currentWindSpeed)
            WeatherNow(queryURLuvIndex)
        })
    // if is the weatherURL adrees
    } else if(linkAPI === queryURLuvIndex){
        console.log(queryURLuvIndex)
        $.ajax(weatherObj).then(function(response){

           console.log('fsdfsd')
            
            //console.log(coordsLon)
        })
        
        
    }
    

}

WeatherNow(weatherURL)


