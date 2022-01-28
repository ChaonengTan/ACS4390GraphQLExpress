import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from '../index'
import DisplayWeather from './WeatherDisplay'
import './Weather.css'

function Weather() {
    const [ zip, setZip ] = useState('')
    const [ weather, setWeather ] = useState(null)
    const [ units, setUnits ] = useState('standard')

    const [ latitude, setLatitude ] = useState(null)
    const [ longitude, setLongitude ] = useState(null)
    navigator.geolocation.getCurrentPosition(position => {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    });
    async function getWeatherGeo() {
        try {
            const json = await client.query({
                query: gql`
                    query {
                        getWeather(lat:${latitude}, lon:${longitude}, units:${units}) {
                            name
                            temperature
                            description
                            pressure
                            humidity
                            cod
                            message
                        }
                    }`
            })
            setWeather(json)
        } catch(err) {
            console.log(err.message)
        }
    }
    async function getWeather() {
        try {
            const json = await client.query({
                query: gql`
                    query {
                        getWeather(zip:${zip}, units:${units}) {
                            name
                            temperature
                            description
                            pressure
                            humidity
                            cod
                            message
                        }
                    }`
            })
            setWeather(json)
        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <div className="Weather">
            {weather ? <DisplayWeather data={weather.data.getWeather} units={units}/> : null}
            <form onSubmit={(e) => {
                e.preventDefault()
                getWeather()
            }}>
                <label for='zipInput'>ZIP: </label>
                <input id='zipInput' value={zip} onChange={(e) => setZip(e.target.value)}/>
                <div onChange={(e) => setUnits(e.target.value)}>
                    <label>Units | </label>
                    <label for='standardRadio'>Kelvin:</label>
                    <input id='standardRadio' type='radio' name='units' value='standard'></input>
                    <label for='metricRadio'>Celcius:</label>
                    <input id='metricRadio' type='radio' name='units' value='metric'></input>
                    <label id='imperialRadio'>Fahrenheit:</label>
                    <input id='imperialRadio' type='radio' name='units' value='imperial'></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Weather