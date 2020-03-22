

// input-city. ---> val().trim(hi) 
var cityObg = {}

var apiKey = '&appid=c372c30b4cd58eec1774beddc78c6a25'
var currentCity = '&q=Seattle' // from input
var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + currentCity


https://api.openweathermap.org/data/2.5/weather?&appid=c372c30b4cd58eec1774beddc78c6a25&boston

// Set the clock
var currentTi = new Date();
var currentDa = currentTi.toLocaleString()
var splitDate = currentDa.split(',');
var currentDate = splitDate[0]




function GetWeatherData(QueryURL){
    var weatherIcon, currentTemp, currentHumidity, currentWindSpeed, coordLon, coordLat, indexUvURL;

    $.ajax({
        url: QueryURL,
        method: "GET"
        }).then(function(response){

        cityName = response.name
        cityObg.city = response.name
        weatherIcon = response.weather[0].icon
        cityObg.icon = weatherIcon
        //currentTemp = response.main.temp
        currentTemp = Math.floor((response.main.temp - 273.15) * 1.80 + 32) + '°F';
        cityObg.temp = currentTemp;
        currentHumidity = response.main.humidity + '%';
        cityObg.humidity = currentHumidity;
        currentWindSpeed = response.wind.speed;
        cityObg.wind = currentWindSpeed
        coordLon = response.coord.lon
        coordLat = response.coord.lat
        indexUvURL = 'http://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + coordLat + '&lon=' + coordLon;
        cityObg.url = indexUvURL
        getUvData(indexUvURL)
        //changeUI('ddd')
    })
}


function getUvData(QueryURL){
    $.ajax({
        url: QueryURL,
        method: "GET"
        }).then(function(response){
        var currentUV = response.value
        cityObg.uv = currentUV
        console.log(cityObg)
        changeUI()

    })
}

function changeUI(){
    var currentcity = cityObg.city
    $('#city-name-div').text(cityObg.city + " (" + currentDate + ") " + " " + cityObg.icon); // <--ICON?
    $('#temp-div').text('Temperature: ' + cityObg.temp);
    $('#humidity-div').text('humidity: ' + cityObg.humidity);
    $('#wind-div').text('wind: ' + cityObg.wind);
    $('#uv-div').text('wind: ' + cityObg.uv);
    newCityBtn(currentcity)
    //console.log(currentcity)

}



function newCityBtn(inp){
    var listItem = $('<a>')
    //var newCityBtnList = $('<button>')
    listItem.attr('class', 'list-group-item list-group-item-action');
    listItem.attr('id', 'list-messages-list'); //+(inp)
    listItem.attr('data-toggle', 'list')
    listItem.attr('role', 'tab')
    listItem.attr('aria-controls', 'messages')
    listItem.attr('href', '#list-messages')
    listItem.text(inp)
    //console.log(newCityBtnList);
    //listItem.append(newCityBtnList)
    $('#list-tab').prepend(listItem)
}




$('#search-button').on('click', function(){
    input = $('#city-input').val().trim();
    currentCity = '&q='+ input;
    weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + currentCity;
    console.log(weatherURL);
    
    GetWeatherData(weatherURL);
console.log(input)

})


$('.list-group-item-action').on('click', function(){
    console.log('clicked')
    /*
    clickedCity = $('city-buttons-list').val().trim();
    console.log(input)
    GetWeatherData(weatherURL)

    */

})


function setToLocalStorge(){
// citys array
}

function setToLocalStorge(){
   // get the last/first city

}


GetWeatherData(weatherURL)






