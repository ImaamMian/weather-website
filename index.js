const MainTime = document.getElementById('time');
const MainDate = document.getElementById('date');
const currentWeatherItems = document.getElementById('weatherItem');
const timezone = document.getElementById('timeZone');
const country = document.getElementById('country');
const weatherForecast = document.getElementById('forecast');
const currentTemp = document.getElementById('currentTemp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let city = 'auckland'
//let dynamicTimeZone = 'Asia/Jakarta'
let dynamicTimeZone = 'Pacific/Auckland'
let DynamicUnixTime = 12;

const sunnyList = [1000]
const cloudyList = [1003,1006,1009,1030,1135,1147]
const slightRain = [1063,1153,1150,1072,1168,1180,1183,1198,1240]
const slightSnow = [1066,1114,1213,1216,1219,1222,1225,1255,1258]
const maybeThunder = [1087]
const blizzard = [1117,1210]
const heavyRain = [1171,1192,1195,1246]
const moderateRain = [1186,1189,1201,1243]
const hail = [1237, 1249, 1252, 1261, 1264,1069,1204, 1207]
const rainAndThunder = [1273, 1276, 1279, 1282]


const changeTime = (res) =>{
   //alert(res.day_of_week)
  //DynamicUnixTime = res.unixtime
  //const time = new Date(DynamicUnixTime * 1000)

  //Thu Nov 17 2022 21:29:48 GMT+1300 (New Zealand Daylight Time)
  //alert(time)
  //console.log(time)
  //Thu Nov 17 2022 21:07:36 GMT+1300 (New Zealand Daylight Time)

  //alert(newDate.toLocaleString('en-US', options));

  const time = new Date().toLocaleString ('en-US', {hour12: false, timeZone: dynamicTimeZone });

  //alert(time)
  //11/17/2022, 16:21:08

  const month = time.substring(0, 2)
  const date = time.substring(3, 5)
  const day = res.day_of_week
  const hour = time.substring(12, 14)
  let hr12format = hour >= 13 ? hour %12: hour
  const minute = time.substring(15, 17)
  const AMorPM = hour>=12 ? 'PM' : 'AM'
  
  if(AMorPM == 'PM' && hr12format<10){
    hr12format = '0' + hr12format
  }
  //const date = new Date().getDate().toLocaleString('en-US', { timeZone: dynamicTimeZone })
  // const month = new Date().getMonth().toLocaleString('en-US', { timeZone: dynamicTimeZone })
  //const day = new Date().getDay().toLocaleString('en-US', { timeZone: dynamicTimeZone })
  //const hour = new Date().getHours().toLocaleString('en-US', { timeZone: dynamicTimeZone })
  //const hr12format = hour >= 13 ? hour %12: hour
  //const minute = new Date().getMinutes().toLocaleString('en-US', { timeZone: dynamicTimeZone })
  //const AMorPM = hour>=12 ? 'PM' : 'AM'

  MainTime.innerHTML = hr12format + ':' + minute+ ' ' + `<span id="am-pm">${AMorPM}</span>`
  MainDate.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}

setInterval(()=>{

  fetch( `https://worldtimeapi.org/api/timezone/${dynamicTimeZone}`)
        .then( response => response.json() )
        .then( response => {
          changeTime(response)}).catch(err => {
          console.log(err);
        });
    /*
    const time = new Date()
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hr12format = hour >= 13 ? hour %12: hour
    const minute = time.getMinutes();
    const AMorPM = hour>=12 ? 'PM' : 'AM'

    MainTime.innerHTML = (hr12format < 10? '0'+hr12format : hr12format) + ':' + (minute < 10? '0'+minute: minute)+ ' ' + `<span id="am-pm">${AMorPM}</span>`
    MainDate.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
    */
},1000);

const showWeather = (res) =>{
  dynamicTimeZone = res.location.tz_id
  console.log(res)
  timezone.innerHTML = res.location.name
  country.innerHTML = res.location.country
  document.getElementById('humidity').innerHTML = res.current.humidity +'%'
  document.getElementById('UVIndex').innerHTML = res.current.uv 
  document.getElementById('windspeed').innerHTML = res.current.wind_kph +' km/h'  
  document.getElementById('Cloudy').innerHTML = res.current.cloud + '%'    
  document.getElementById('Condition').innerHTML = res.current.condition.text
  document.getElementById('todayTemp').innerHTML = "Temp • " + res.current.temp_c + '&#176; C'
  document.getElementById('todayFeelLike').innerHTML = "Feels Like • " + res.current.feelslike_c +'&#176; C'
  //document.getElementById('today-day').innerHTML = window.moment(res.location.localtime_epoch*1000).format('ddd')
  document.getElementById('today-day').innerHTML = "Today"
  
  imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png";

  if(sunnyList.includes(res.current.condition.code)){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather01-512.png";
  }
  if(cloudyList.includes(res.current.condition.code)){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather04-512.png";
  }
  if(slightRain.includes(res.current.condition.code)){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png";
  }
  if(slightSnow.includes(res.current.condition.code)){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-blue-filled-line/32/weather_snow_snowflake_winter_cold_holiday_flake-512.png";
  }
  if(maybeThunder.includes(res.current.condition.code)){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather09-512.png";
  }
  if(blizzard.includes(res.current.condition.code)){
    imageSource = "https://cdn3.iconfinder.com/data/icons/winter-45/685/2-Snowing-512.png";
  }
  if(heavyRain.includes(res.current.condition.code)){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png";
  }
  if(moderateRain.includes(res.current.condition.code)){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather06-512.png";
  }
  if(hail.includes(res.current.condition.code)){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather13-512.png";
  }
  if(rainAndThunder.includes(res.current.condition.code)){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather08-512.png";
  }
  document.getElementById('todayImage').outerHTML = `<img src=${imageSource} alt="Weather Icon" class="weatherIcon" id="todayImage">`
} 

const getWeather = () =>{
    navigator.geolocation.getCurrentPosition(showPosition);
    //var city = 'auckland'

    fetch( `https://api.weatherapi.com/v1/current.json?key=114557f6f1744cb3a4403405222007&q=${city}`)
        .then( response => response.json() )
        .then( response => {
          showWeather(response)}).catch(err => {
          console.log(err);
        });
}
getWeather()
function showPosition(position) {
   //alert( "Latitude: " + position.coords.latitude + 
    //" Longitude: " + position.coords.longitude)
  }


const sevenDayWeather = () =>{
  navigator.geolocation.getCurrentPosition(showPosition);
  //var city = 'auckland'

  fetch( `https://api.weatherapi.com/v1/forecast.json?key=114557f6f1744cb3a4403405222007&q=${city}&days=7&aqi=no&alerts=no`)
      .then( response => response.json() )
      .then( response => {
        showSevenDayWeather(response)}).catch(err => {
        console.log(err);
      });
}
sevenDayWeather()

const showSevenDayWeather = (res) =>{
  console.log(res.forecast.forecastday)

  let sevenDayForecast = ``
  for(let i=1;i<3;i++){
    imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png";
    
    if(sunnyList.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather01-512.png";
    }
    if(cloudyList.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather04-512.png";
    }
    if(slightRain.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png";
    }
    if(slightSnow.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn2.iconfinder.com/data/icons/weather-blue-filled-line/32/weather_snow_snowflake_winter_cold_holiday_flake-512.png";
    }
    if(maybeThunder.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather09-512.png";
    }
    if(blizzard.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn3.iconfinder.com/data/icons/winter-45/685/2-Snowing-512.png";
    }
    if(heavyRain.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png";
    }
    if(moderateRain.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather06-512.png";
    }
    if(hail.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather13-512.png";
    }
    if(rainAndThunder.includes(res.forecast.forecastday[i].day.condition.code)){
      imageSource = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather08-512.png";
    }
    
    sevenDayForecast +=`<div class="weatherForecast" id="forecast">
        <div class="forecastItem">
            <div class="day">${window.moment(res.forecast.forecastday[i].date_epoch*1000).format('ddd')}</div>
            <img src=${imageSource} alt="Weather Icon" class="weatherIcon">
            <div class="temp">Average Temp • ${res.forecast.forecastday[i].day.avgtemp_c}&#176; C</div>
            <div class="temp">Condition • ${res.forecast.forecastday[i].day.condition.text}</div>
        </div>
      </div>`
  }
  weatherForecast.innerHTML = sevenDayForecast
}


const searchBar = document.getElementById("searchButton")
searchBar.addEventListener("click", changeCity);

function changeCity() {
  //alert(document.getElementById("SearchBar").value)
  if(document.getElementById("SearchBar").value!=null && document.getElementById("SearchBar").value!=""){
    city = document.getElementById("SearchBar").value
    getWeather()
    sevenDayWeather()
    document.getElementById("SearchBar").value = ""
  }
}
/*
searchBar.addEventListener('keyup', (e) => {
  console.log(e.target.value)
  if(e.target.value!=""){
  getSearchItems(e.target.value)
  }
  else{
    getItems();
  }
})*/

