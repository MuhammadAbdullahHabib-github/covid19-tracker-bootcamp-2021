import React from 'react';
import {Bar} from 'react-chartjs-2';

const LineGraph = ({data}) => {
    const [graphData, setGraphData] = React.useState({})
    const url = data ==='worldwide'? `https://disease.sh/v3/covid-19/all`: `https://disease.sh/v3/covid-19/countries/${data}`;

    React.useEffect(() => {
        const graphDataFetch = async () => {
            await fetch(url)
                .then((response) => response.json())
                .then((data) => setGraphData(data));
        }
        graphDataFetch();
    }, [graphData])
    console.log(graphData.country,graphData.cases, graphData.recovered, graphData.deaths);

    const dat = {
        labels: ['Infacted', 'Recovered', 'Death'],
        datasets: [
          {
            label: graphData.country === undefined ? 'Worldwide':graphData.country ,
            backgroundColor: ['#64b5f6','#81c784','#e57373'],
            borderColor: ['#1976d2','#388e3c','#d32f2f'],
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor:  ['#1976d2','#388e3c','#d32f2f'],
            data: [graphData.cases, graphData.recovered, graphData.deaths]
          }
        ]
      };


    return (
        <div>
            <Bar
          data={dat}
          width={100}
          height={300}
          options={{
            maintainAspectRatio: false
          }}
        />
        </div>
    )
}

export default LineGraph
