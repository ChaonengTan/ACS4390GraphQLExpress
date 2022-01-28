export default function DisplayWeather(props) {
    const { name, temperature, description, pressure, humidity } = props.data
    return (
        <div className='weatherDisplay'>
            <h1>{name}</h1>
            <div className='weatherStatistics'>
                <h2>{temperature}F</h2>
                <p>{description}</p>
                <h3>Pressure: {pressure}</h3>
                <h3>Humidity: {humidity}</h3>
            </div>
        </div>
    )
}