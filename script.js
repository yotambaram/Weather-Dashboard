//var fiveDaysObj = {};
//var fiveDaysArr = [];
var cityObg = {};
var cityList = [];
var apiKey = '&appid=c372c30b4cd58eec1774beddc78c6a25'
var currentDate = ''
matric = 'f'
$("#days-forecast").hide();






// Set the date
function setDate(){
    var currentTime, currentDa, splitDate, splitDate2
    currentTime = new Date();
    currentDa = currentTime.toLocaleString();
    console.log(currentDa)
    currentDate = currentDa.split(',')[0]
    console.log(currentDate)
    
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
        currentTemp = response.main.temp;
        cityObg.temp = currentTemp;
        currentHumidity = response.main.humidity;
        cityObg.humidity = currentHumidity;
        currentWindSpeed = response.wind.speed;
        cityObg.wind = currentWindSpeed;
        coordLon = response.coord.lon;
        coordLat = response.coord.lat;
        indexUvURL = 'https://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + coordLat + '&lon=' + coordLon + '&units=imperial';
        cityObg.url = indexUvURL;
        getUvData(indexUvURL);
        setToLocalStorge(cityName);
        fiveForecastData(cityName);
        
    })
}


function fiveForecastData(city){
    var dayList, dayWeather, forecastAllDates, hourChoose, dayTemp;
    fiveDaysURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey + '&units=imperial'// + '&cnt=5';
    $.ajax({
        url: fiveDaysURL,
        method: 'GET'
        }).then(function(response){
            dayList = response.list;
            fiveDaysArr = []
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
                    if(fiveDaysArr.length === 5){
                        changeForeCastUI()
                    }     
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
    var currentIcon = $('#current-icon')
    $("#current-icon").removeClass('hide');
    $('#forecast-div').removeClass('hide');
    currentIcon.attr('src', 'https://openweathermap.org/img/wn/' + cityObg.icon + '@2x.png');
    $('#city-name-div').text(cityObg.city + ', ' +  currentDate);
    if(matric === 'f'){
        $('#temp-div').text('Temperature: ' + Math.floor(cityObg.temp) + '°F');
        $('#wind-div').text('wind: ' + Math.floor((cityObg.wind * 1.15078)) + ' mph');
    }  else {
          $('#temp-div').text('Temperature: ' + Math.floor((cityObg.temp - 32) / 1.8) + '°C');
          $('#wind-div').text('wind: ' + Math.floor((cityObg.wind * 1.85)) + ' kph');}

    $('#humidity-div').text('humidity: ' + cityObg.humidity +'%');
    
    $('#uv-div').text('UV Index: ' + cityObg.uv);
    newCityBtn(currentcity);
}


function changeForeCastUI(){
    var splitedDate, NewDate, icon, humidity;
    for(var i = 0; i < fiveDaysArr.length; i++){
        splitedDate = (fiveDaysArr[i].date).split('-');
        NewDate = splitedDate[1] + '.' + splitedDate[2] + '.' + splitedDate[0];
        icon = fiveDaysArr[i].icon;
        humidity = fiveDaysArr[i].humidity;
        temp = fiveDaysArr[i].temp
        var image = $('#logo-' + i);
        var imageSrc = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
        image.attr('src', imageSrc);
        $('#date-' + i).text(NewDate);
        $('#humidity-' + i).text('humidity: ' + humidity);
        if(matric === 'f') {
            $('#temp-' + i).text('temp: ' + temp + '°F');
        } else {
            $('#temp-' + i).text('temp: ' + Math.floor((temp - 32) / 1.8) + '°C');

        }
        
        $("#days-forecast").show();
    } 
}


function newCityBtn(inp){
    var listItem = $('<button>');
    if(!cityList.includes(inp)) {
    cityList.push(cityName);
    //var newCityBtnList = $('<button>')
    listItem.attr('class', 'list-group-item list-group-item-action list-button');
    listItem.attr('id', inp); //+(inp)
    listItem.attr('data-toggle', 'list');
    listItem.attr('role', 'tab');
    listItem.attr('aria-controls', 'messages');
    listItem.attr('href', '#list-messages');
    listItem.text(inp);
    //listItem.append(newCityBtnList)
    $('#list-tab').prepend(listItem);
    } 
}


function setToLocalStorge(city){
    localStorage.setItem('lastCity', city);
}


function getFromLocalStorge(){
    oldCity = localStorage.getItem('lastCity')// || ''
    if(oldCity !== null)
        {thisCity = '&q='+ oldCity;
        weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + thisCity + '&units=imperial';
        GetWeatherData(weatherURL);
    } else {
    }
}


function clickFn(city){
    weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + city + '&units=imperial';
    GetWeatherData(weatherURL);
}


$('#search-button').on('click', function(){
    input = $('#city-input').val().trim();
    currentCity = '&q='+ input;
    if ($('#city-input').val() === ''){
        $('#city-input').val('Enter a city name here')
    } else{$('#city-input').val('');}
    clickFn(currentCity)
})

$(document).keypress(function(e) {
    input = $('#city-input').val().trim();
    if(e.which === 13 && input !== '') {
        currentCity = '&q='+ input;
        $('#city-input').val('')
        clickFn(currentCity)
    } else if(e.which === 13 && input === '') {
        $('#city-input').val('Enter a city name here')}
});


$('#list-tab').on('click', function(){
    clickCity = event.target.id;
    thisCity = '&q='+ clickCity;
    clickFn(thisCity)  
})

$('#matric').on('click', function(){
    if(matric === 'f') {
        matric = 'c'
        console.log('fgsdfsd')
        $('#matric').text('°C')
    } else{
        matric = 'f'
        $('#matric').text('°F')
    }
    getFromLocalStorge()

})
 
setDate()
getFromLocalStorge()

