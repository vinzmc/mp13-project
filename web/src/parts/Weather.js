import React, { useEffect, useState } from "react";

export default function Weather(props) {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        getWeatherData()
    }, [])

    const getWeatherData = () => {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
                const apiKey = "c2dc03bf26359baa07d4826003ebf9b9";
                navigator.geolocation.getCurrentPosition(function (position) {
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`)
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            if (responseJSON.cod) {
                                return setWeatherData(false)
                            } else {
                                setWeatherData({ data: responseJSON })
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                });
            } else {
                setWeatherData(false)
            }
        })
    }

    return (
        <>
            {weatherData ?
                <div id="weather" className="col text-end">
                    <p className="text-capitalize">
                        <span className="text-primary me-2">
                            <img src={`http://openweathermap.org/img/wn/${weatherData.data.current.weather[0].icon}.png`} alt="" />
                        </span>
                        Today, {' '}
                        <span className="temperature mx-2">{weatherData.data.current.temp}&#176;C</span>
                        {` ${weatherData.data.current.weather[0].description}`}
                    </p>
                </div>
                :
                <div className="col-3 text-end text-danger" onClick={getWeatherData}>
                    Location Access is Limited
                </div>
            }
        </>
    )
}