
//var fiveDaysObj = {};
var fiveDaysArr = [];
var cityObg = {};
var cityList = [];
var apiKey = '&appid=c372c30b4cd58eec1774beddc78c6a25'

// Set the clock
var currentTi = new Date();
var currentDa = currentTi.toLocaleString();
var splitDate = currentDa.split(',');
var currentDate = splitDate[0];


function GetWeatherData(QueryURL){
    var weatherIcon, currentTemp, currentHumidity, currentWindSpeed, coordLon, coordLat, indexUvURL;

    $.ajax({
        url: QueryURL,
        method: 'GET'
        }).then(function(response){
        cityName = response.name;
        cityObg.city = response.name;
        weatherIcon = response.weather[0].icon;
        cityObg.icon = weatherIcon;
        //currentTemp = response.main.temp
        currentTemp = Math.floor((response.main.temp - 273.15) * 1.80 + 32) + '°F';
        cityObg.temp = currentTemp;
        currentHumidity = response.main.humidity + '%';
        cityObg.humidity = currentHumidity;
        currentWindSpeed = response.wind.speed;
        cityObg.wind = currentWindSpeed;
        coordLon = response.coord.lon;
        coordLat = response.coord.lat;
        indexUvURL = 'http://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + coordLat + '&lon=' + coordLon + '&units=imperial';
        cityObg.url = indexUvURL;
        getUvData(indexUvURL);
        setToLocalStorge(cityName);
        fiveForecastData(cityName);
    })
}


function fiveForecastData(city){
    var dayList, dayWeather, forecastAllDates, hourChoose, dayTemp, hourT;
    fiveDaysURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey + '&units=imperial'// + '&cnt=5';
    $.ajax({
        url: fiveDaysURL,
        method: 'GET'
        }).then(function(response){
            dayList = response.list;
            console.log(dayList)
            //change if before the fot loop
            for(var i = 0; i < dayList.length; i++){
                dayWeather = dayList[i];
                forecastAllDates = dayList[i].dt_txt;
                hourChoose = forecastAllDates.split(' ');
                var fiveDaysObj = {};
                fiveDaysObj.date = hourChoose[0];
                dayTemp = (dayWeather.main.temp).toString();
                fiveDaysObj.temp = dayTemp
                if(hourChoose[1] === '12:00:00') { 
                    fiveDaysArr.push(fiveDaysObj)
                    changeForeCastUI()
            
                }  
               
            }   
    })
    
    
}


function getUvData(QueryURL){
    $.ajax({
        url: QueryURL,
        method: 'GET'
        }).then(function(response){
        var currentUV = response.value
        cityObg.uv = currentUV
        changeLocationTempUI()
    })
}


function changeLocationTempUI(){
    var currentcity = cityObg.city
    $('#city-name-div').text(cityObg.city + ' (' + currentDate + ') ' + ' ' + cityObg.icon); // <--ICON?
    $('#temp-div').text('Temperature: ' + cityObg.temp);
    $('#humidity-div').text('humidity: ' + cityObg.humidity);
    $('#wind-div').text('wind: ' + cityObg.wind);
    $('#uv-div').text('wind: ' + cityObg.uv);
    newCityBtn(currentcity)
}


function changeForeCastUI(){
    console.log(fiveDaysArr.length)
    for(var i = 0; i < fiveDaysArr.length; i++){
        console.log(fiveDaysArr[i].date)
        console.log(fiveDaysArr[i].temp)
    $('#fortcast-' + i).text(fiveDaysArr[i].date + fiveDaysArr[i].temp)
    }
    
}

function newCityBtn(inp){
    if(!cityList.includes(inp)) {
    cityList.push(cityName);
    var listItem = $('<button>')
    //var newCityBtnList = $('<button>')
    listItem.attr('class', 'list-group-item list-group-item-action');
    listItem.attr('id', inp); //+(inp)
    listItem.attr('data-toggle', 'list')
    listItem.attr('role', 'tab')
    listItem.attr('aria-controls', 'messages')
    listItem.attr('href', '#list-messages')
    listItem.text(inp)
    //console.log(newCityBtnList);
    //listItem.append(newCityBtnList)
    $('#list-tab').prepend(listItem)
    } 
}


function setToLocalStorge(city){
    localStorage.setItem('lastCity', city);
}


function getFromLocalStorge(){
    oldCity = localStorage.getItem('lastCity')
    thisCity = '&q='+ oldCity;
    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + thisCity + '&units=imperial';
    GetWeatherData(weatherURL)
}


$('#search-button').on('click', function(){
    input = $('#city-input').val().trim();
    currentCity = '&q='+ input;
    weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + currentCity + '&units=imperial';
    GetWeatherData(weatherURL);
})


$('#list-tab').on('click', function(){
    clickCity = event.target.id
    console.log(clickCity)
    thisCity = '&q='+ clickCity;
    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + thisCity + '&units=imperial';
    GetWeatherData(weatherURL)
})


getFromLocalStorge()





