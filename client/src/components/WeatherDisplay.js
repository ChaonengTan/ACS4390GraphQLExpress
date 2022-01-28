export default function DisplayWeather(props) {
    const { name, temperature, description, pressure, humidity, cod, message } = props.data
    const sucessRes = () => {
        return (
            <div className='sucessRes'>
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
    const errRes = () => {
        return (
            <div className='errRes'>
                <h3>{cod}</h3>
                <p>{message}</p>
            </div>
        )
    }
    return (
        <div className='weatherDisplay'>
            { cod!=200 ? errRes() : sucessRes() }
        </div>
    )
}