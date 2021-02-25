import React from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import './App.css';

import Infobox from './component/Infobox';
import Map from './component/Map';
import Table from './component/Table';
import LineGraph from './component/LineGraph'

function App() {
    const [countries, setCountries] = React.useState([]);
    const [selectedCountry, setSelectedCountry] = React.useState('worldwide');
    const [countryInfo, setCountryInfo] = React.useState({});
    
   

    React.useEffect(() => {
        fetch(`https://disease.sh/v3/covid-19/all`).then((response) => response.json()).then((data) => setCountryInfo(data));
    }, [])


    React.useEffect(() => {
        const getCountryData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countryData = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }))
                    setCountries(countryData);
                })
        }
        getCountryData();
    }, []);

    const changeCode = async (e) => {
        let countryCode = e.target.value;
        const url = countryCode === 'worldwide' ? `https://disease.sh/v3/covid-19/all` : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((response) => response.json()).then((data) => {
                setSelectedCountry(countryCode);
                setCountryInfo(data);
            });
    }

    return (
        <div className="App">
            <div className="app__left">
                <div className="app__header">
                    <h1>COVID-19 TRACKER</h1>
                    <FormControl className='app__dropdown'>
                        <Select variant="outlined" value={selectedCountry} onChange={(e) => changeCode(e)}>
                            <MenuItem value='worldwide'>Worldwide</MenuItem>
                            {
                                countries.map((country, i) => (
                                    <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>

                <div className="app__stats">
                    <Infobox title='Coronavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases} color='blue'/>
                    <Infobox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} color='green'/>
                    <Infobox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} color='red' />
                </div>
                <Map />
            </div>

            <div className="app__right">
                <Card>
                    <CardContent>
                        <h2>Live case by country</h2>
                        <Table  /> 
                        <h2>World new cases</h2>
                        <LineGraph data = {selectedCountry}/>
                        {/* Graph */}
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}

export default App;
