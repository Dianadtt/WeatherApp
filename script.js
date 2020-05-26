function getCoordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const weather = getData(lat, long)
            weather.then((res) => {
                console.log(res)
                const current = res.current
                displayDailyForecast(res.daily)
                displayHouryForecast(res.hourly)
                currentData(res.timezone, current.weather[0].description, current.weather[0].icon, current.temp, current.dt, current.sunset, current.sunrise)
            })
        })
    }
}

async function getData(lat, long) {
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=40548cc5b12a46ee9418e263dd707583`
    const response = await fetch(api)
    const res = response.json()
    return res

}
getCoordinates()


function currentData(timezone, temperatureDescription, icon, temp, dt, sunrise, sunset) {
    let location = document.querySelector(".location-timezone")
    location.innerHTML = timezone

    let description = document.querySelector(".temperature-description")
    description.innerHTML = temperatureDescription

    let image = document.getElementById("icon")
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    image.setAttribute("src", iconUrl)
    getTemp(temp)
    time(dt, sunrise, sunset)

}

function getTemp(temperature) {
    let temperatureDegree = document.querySelector(".temperature-degree")
    let celsius = Math.floor(temperature - 273.15)
    let farenheit = Math.floor(temperature * 9 / 5 - 459.67)
    temperatureDegree.innerHTML = `${farenheit}&#8457`
    let temperatureSection = document.querySelector('.temperature')
    temperatureSection.addEventListener("click", () => {
        if (temperatureDegree.innerHTML = `${farenheit}&#8457`) {
            temperatureDegree.innerHTML = `${celsius}&#8451`
        } else if (temperatureDegree.innerHTML = `${celsius}&#8451`) {
            temperatureDegree.innerHTML = `${farenheit}&#8457`
        }
    })
}

function time(currentUnix, sunrizeUnix, sunsetUnix) {
    let time = document.querySelector('.time-current')
    let sunrize = document.querySelector('.time-sunrize')
    let sunsetTime = document.querySelector('.time-sunset')
    let updateTime = formatedTime(currentUnix)
    let sunrise = formatedTime(sunrizeUnix)
    let sunset = formatedTime(sunsetUnix)
    time.textContent = `Update: ${ updateTime }`
    sunrize.textContent = `Sunrise: ${ sunrise }`
    sunsetTime.textContent = `Sunset: ${ sunset }`
}

formatedTime = function(unix) {
    let date = new Date(unix * 1000)
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return formattedTime = hours + ':' + minutes.substr(-2)
}

function displayHouryForecast(data) {
    let btnHourly = document.getElementById("hourly")
    btnHourly.addEventListener("click", event => {
        event.preventDefault()
        const houryForecastDiv = document.getElementById("hourly-forecast")
        houryForecastDiv.innerHTML = ""
        const dailyForecastDiv = document.getElementById("daily-forecast")
        dailyForecastDiv.innerHTML = ""
        for (let i = 0; i < 10; i++) {
            renderHourly(data[i].weather[0].icon, data[i].temp, data[i].dt, data[i].weather[0].description)
        }
    })
}

function renderHourly(icon, temperature, timeInUnix, hourlyDescription) {
    const houryForecastDiv = document.getElementById("hourly-forecast")
    console.log(houryForecastDiv)
    const container = document.createElement("div")
    houryForecastDiv.appendChild(container)

    const image = document.createElement("img")
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    image.setAttribute("src", iconUrl)
    container.appendChild(image)

    temp = document.createElement("div")
    let celsius = Math.floor(temperature - 273.15)
    temp.innerHTML = celsius + "&#8451"
    container.appendChild(temp)

    htime = document.createElement("div")
    let hour = formatedTime(timeInUnix)
    htime.textContent = `Time: ${ hour }`
    container.appendChild(htime)

    const description = document.createElement("div")
    description.innerHTML = hourlyDescription
    container.appendChild(description)


}

displayDailyForecast = (data) => {
    let btnDaily = document.getElementById("daily")
    btnDaily.addEventListener("click", event => {

        event.preventDefault()
        const dailyForecastDiv = document.getElementById("daily-forecast")
        dailyForecastDiv.innerHTML = ""
        const houryForecastDiv = document.getElementById("hourly-forecast")
        houryForecastDiv.innerHTML = ""
        for (let i = 0; i < 7; i++) {
            console.log(data[i])
            renderDaily(data[i].weather[0].icon, data[i].sunrise, data[i].sunset, data[i].temp.min, data[i].temp.max, data[i].weather[0].description)
        }
    })
}

function renderDaily(icon, sunrisedata, sunsetdata, tempm, tempM, description) {
    const dailyForecastDiv = document.getElementById("daily-forecast")
    const container = document.createElement("div")
    dailyForecastDiv.appendChild(container)

    const image = document.createElement("img")
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    image.setAttribute("src", iconUrl)
    container.appendChild(image)


    let day = document.createElement("div")
    day.innerHTML = `${getDays()}`
    container.appendChild(day)
        //console.log(day)

    let sunrisedaily = document.createElement("div")
    container.appendChild(sunrisedaily)
    sunrisedaily.innerHTML = `Sunrise: ${formatedTime(sunrisedata)}`

    let sunsetdaily = document.createElement("div")
    container.appendChild(sunsetdaily)
    sunsetdaily.innerHTML = `Sunset: ${formatedTime(sunsetdata)}`

    let tempmin = document.createElement("div")
    container.appendChild(tempmin)
    let celsiusm = Math.floor(tempm - 273.15)
    tempmin.innerHTML = `Min. ${celsiusm}&#8451;`

    let tempmax = document.createElement("div")
    container.appendChild(tempmax)
    let celsiusM = Math.floor(tempM - 273.15)
    tempmax.innerHTML = `Max. ${celsiusM}&#8451;`

    let descriptionDaily = document.createElement("div")
    container.appendChild(descriptionDaily)
    descriptionDaily.innerHTML = description
}

function getDays() {

    const dailyForecastDiv = document.getElementById("daily-forecast")
    const container = document.createElement("div")
    dailyForecastDiv.appendChild(container)
    let currentDate = new Date();
    let currentDay = currentDate.getDay() + 1
    console.log(currentDay)
    const arrayOfDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    for (let i = 0; i <= arrayOfDays.length; i++) {

        console.log(arrayOfDays[currentDay + 1])
        days = arrayOfDays[currentDay++]
        if (arrayOfDays.length === 6) {
            currentDay = arrayOfDays[0]
        }
        return days
    }

}