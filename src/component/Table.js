import React from 'react';
import '../styles/table.css';

import {arrangment} from './uol'

const Table = () => {
    const [countryData, setCountryData]  = React.useState([]);
    React.useEffect(()=>{
        const countryDataFetch = async () => {
        await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => setCountryData(data));
        }
        countryDataFetch();
    },[])
        const sortedData = arrangment(countryData);
    return (
        <div className='table'>
            <table>
                <tbody>
                    {sortedData.map((country, i) => {
                        return (
                            <tr key={i}>
                                <td>{country.country}</td>
                                <td><b>{country.cases}</b></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
       
    )
}

export default Table
