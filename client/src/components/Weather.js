import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from '../index'
import DisplayWeather from './WeatherDisplay'

function Weather() {
    const [ zip, setZip ] = useState('')
    const [ weather, setWeather ] = useState(null)

    async function getWeather() {
        try {
            const json = await client.query({
                query: gql`
                    query {
                        getWeather(zip:${zip}) {
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
            {weather ? <DisplayWeather data={weather.data.getWeather}/> : null}
            <form onSubmit={(e) => {
                e.preventDefault()
                getWeather()
            }}>
                <input value={zip} onChange={(e) => setZip(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Weather