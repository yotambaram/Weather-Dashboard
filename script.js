
//var fiveDaysObj = {};
var fiveDaysArr = [];
var cityObg = {};
var cityList = [];
var apiKey = '&appid=c372c30b4cd58eec1774beddc78c6a25'
var currentDate = ''
$("#days-forecast").hide();
// Set the clock
function setDate(){
    var currentTime, currentDa, splitDate, splitDate2
    currentTime = new Date();
    currentDa = currentTime.toLocaleString();
    splitDate = currentDa.split('.');
    splitDate2 = splitDate[2].split(',');
    currentDate = splitDate[1] + '.' + splitDate[0] + '.' + splitDate2[0];


}



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
        currentTemp = response.main.temp + 'F'// Math.floor((response.main.temp - 273.15) * 1.80 + 32) + '°F';
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
    var dayList, dayWeather, forecastAllDates, hourChoose, dayTemp, forecastIcon;
    fiveDaysURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey + '&units=imperial'// + '&cnt=5';
    $.ajax({
        url: fiveDaysURL,
        method: 'GET'
        }).then(function(response){
            dayList = response.list;
            //change if before the fot loop
            for(var i = 0; i < dayList.length; i++){
                dayWeather = dayList[i];
                forecastAllDates = dayList[i].dt_txt;
                hourChoose = forecastAllDates.split(' ');
                var fiveDaysObj = {};
                fiveDaysObj.date = hourChoose[0];
                fiveDaysObj.icon = dayList[i].weather[0].icon;
                dayTemp = (dayWeather.main.temp).toString();
                dayHumidity = (dayWeather.main.humidity).toString();
                fiveDaysObj.humidity = dayHumidity +'%'
                fiveDaysObj.temp = dayTemp;
                if(hourChoose[1] === '12:00:00') { 
                    fiveDaysArr.push(fiveDaysObj);
                    
            
                }  
            } 
            changeForeCastUI();  
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
    var splitedDate, NewDate, icon, humidity
    for(var i = 0; i < fiveDaysArr.length; i++){
        splitedDate = (fiveDaysArr[i].date).split('-');
        NewDate = splitedDate[1] + '.' + splitedDate[2] + '.' + splitedDate[0];
        icon = fiveDaysArr[i].icon;
        humidity = fiveDaysArr[i].humidity;
        temp = fiveDaysArr[i].temp + 'F'
       var image = $('#logo-' + i)
       var imageSrc = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
       $('#logo-' + i).attr('src', imageSrc);
       $('#date-' + i).text(NewDate);
       $('#humidity-' + i).text('humidity: ' + humidity);
       $('#temp-' + i).text('temp: ' + temp);
       $("#days-forecast").show();
      
 
    } 
}


function newCityBtn(inp){
    var listItem = $('<button>')
    if(!cityList.includes(inp)) {
    cityList.push(cityName);
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
    weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + thisCity + '&units=imperial';
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
    weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + thisCity + '&units=imperial';
    GetWeatherData(weatherURL)
})

// 
setDate()
getFromLocalStorge()





