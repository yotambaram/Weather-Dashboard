//var fiveDaysObj = {};
//var fiveDaysArr = [];
var cityObg = {};
var cityList = [];
var apiKey = '&appid=c372c30b4cd58eec1774beddc78c6a25';
var currentDate = '';
//matric = 'f';
//$('#forecast-div').hide();
$('#days-forecast').hide();


// Set the date
function setDate(){
    var currentTime, currentDa;
    currentTime = new Date();
    currentDa = currentTime.toLocaleString();
    currentDate = currentDa.split(',')[0];
}



// set the url with the choosen city 
function clickFn(city){
    weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + city + '&units=imperial';
    //call the api data function
    GetWeatherData(weatherURL);
    
}

// get the current data from api
function GetWeatherData(QueryURL){
    var weatherIcon, currentTemp, currentHumidity, currentWindSpeed, coordLon, coordLat, indexUvURL;
    $.ajax({
        url: QueryURL,
        method: 'GET'
        }).then(function(response){
            //set a objet with the data 
            cityName = response.name;
            cityObg.city = response.name;
            weatherIcon = response.weather[0].icon;
            cityObg.icon = weatherIcon;
            currentTemp = response.main.temp;
            cityObg.temp = currentTemp;
            currentHumidity = response.main.humidity;
            cityObg.humidity = currentHumidity;
            currentWindSpeed = response.wind.speed;
            cityObg.wind = currentWindSpeed;
            coordLon = response.coord.lon;
            coordLat = response.coord.lat;
            cityObg.url = indexUvURL;
            //set the link for the 5 days forecast with the new data
            indexUvURL = 'https://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + coordLat + '&lon=' + coordLon + '&units=imperial';
            // call the function to get uv from data
            getUvData(indexUvURL);
            // call the function who change the UI present with new data
            setCityToLocalStorge(cityName);
            // call the function that get the 5 days forecast data
            fiveForecastData(cityName);
         })
}

// get the 5 days forecast data from api
function fiveForecastData(city){
    var dayList, dayWeather, forecastAllDates, hourChoose, dayTemp ;
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

// get the uv index data from api
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

// update the UI current weather
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

// update the UI forecast weather
function changeForeCastUI(){
    var splitedDate, NewDate, icon, humidity, image;
    for(var i = 0; i < fiveDaysArr.length; i++){
        splitedDate = (fiveDaysArr[i].date).split('-');
        NewDate = splitedDate[1] + '.' + splitedDate[2] + '.' + splitedDate[0];
        icon = fiveDaysArr[i].icon;
        humidity = fiveDaysArr[i].humidity;
        temp = fiveDaysArr[i].temp
        image = $('#logo-' + i);
        var imageSrc = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
        image.attr('src', imageSrc);
        $('#date-' + i).text(NewDate);
        $('#humidity-' + i).text('humidity: ' + humidity);
        if(matric === 'f') {
            $('#temp-' + i).text('temp: ' + Math.floor(temp) + '°F');
        } else {
            $('#temp-' + i).text('temp: ' + Math.floor((temp - 32) / 1.8) + '°C');
        }
        $("#days-forecast").show();
    } 
}

// build city buttons from latest searches
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

// save the last search to local storge
function setCityToLocalStorge(city){
    localStorage.setItem('lastCity', city); 
}

// get last city search from local storege
function getCityFromLocalStorge(){
    oldCity = localStorage.getItem('lastCity')
    if(oldCity !== null)
        {thisCity = '&q='+ oldCity;
        // set the api link with the city and call the get the data for this place
        weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' + apiKey + thisCity + '&units=imperial';
        GetWeatherData(weatherURL);
    }
}

// get last matric choise from local storege
function getMetricFromLocalStorge(){
    storgeMatric = localStorage.getItem('lastMatric')
    if(storgeMatric !== null) {
        matric = storgeMatric;
    } else {
        matric = 'f';
    }
    $('#matric').text(matric.toUpperCase());
}

// city search by click on 'search' button
$('#search-button').on('click', function(){
    input = $('#city-input').val().trim();
    currentCity = '&q='+ input;
    // if input empty put a msg
    if ($('#city-input').val() === ''){
        $('#city-input').val('Enter a city name here')
        //clean the input field after search
    } else{$('#city-input').val('');}
    clickFn(currentCity)
})

// city search by 'Enter'
$(document).keypress(function(e) {
    input = $('#city-input').val().trim();
    // if Enter pressed and input not empty
    if(e.which === 13 && input !== '') {
        currentCity = '&q='+ input;
        //clean the input field after search
        $('#city-input').val('')
        clickFn(currentCity)
        // if input empty put a msg
    } else if(e.which === 13 && input === '') {
        $('#city-input').val('Enter a city name here')}
});

// city search by click on latest city search button
$('#list-tab').on('click', function(){
    clickCity = event.target.id;
    thisCity = '&q='+ clickCity;
    clickFn(thisCity);
});

// clean input field from the msg
$('#city-input').on('mousedown', function(){
    if($('#city-input').val() === 'Enter a city name here') {
        $('#city-input').val('');
    }
});

// changing from fernite to celsius
$('#matric').on('click', function(){
    if(matric === 'f') {
        matric = 'c'
        $('#matric').text('C')
        localStorage.setItem('lastMatric', matric);
        changeForeCastUI()
        changeLocationTempUI()
    } else{
        matric = 'f'
        $('#matric').text('F')
        localStorage.setItem('lastMatric', matric);
        changeForeCastUI()
        changeLocationTempUI()
    }
    
})
 
getMetricFromLocalStorge()
setDate()
getCityFromLocalStorge()

