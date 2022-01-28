import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from '../../index'

export default function WFWorldstate() {
    const [ data, setData ] = useState(null)
    async function getWorldstate() {
        try {
            const json = await client.query({
                query: gql`
                    query {
                        getWF {
                            earth
                            cetus
                            cambion
                            vallis
                        }
                    }`
            })
            setData(json.data.getWF)
        } catch(err) {
            console.log(err.message)
        }
    }
    const displayData = () => {
        console.log(data)
        return(
            <div>
                <div>Earth: { data.earth.state }</div>
                <div>Cetus: { data.cetus.state }</div>
                <div>Vallis: { data.vallis.state }</div>
                <div>Cambion: { data.cambion.active }</div>
            </div>
        )
    }
    return (
        <div className="WFWorldstate">
            {data ? displayData() : null }
            <button onClick={() => getWorldstate()}>getWorldState</button>
        </div>
    );
}