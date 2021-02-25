import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';


const useStyles = makeStyles({
    map: {
        marginTop: '2%',
        marginBottom:'3%'
    },
    map__title: {
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '20px',
        letterSpacing:'2px'
    }
})

const Map = () => {
    const classes = useStyles();
    const [dailyData, setDailyData] = React.useState({});
    React.useEffect(() => {
        const getData = async () => {
           await fetch(`https://covid19.mathdro.id/api`)
           .then((response)=> response.json())
           .then((data) => setDailyData(data))
        }
        getData();
    }, []);

    const {confirmed , recovered , deaths} = dailyData;
    

    const datas = {
        labels: ['Infacted', 'Recovered', 'Death'],
        datasets: [
          {
            label: 'Global Data',
            backgroundColor: ['#64b5f6','#81c784','#e57373'],
            borderColor: ['#1976d2','#388e3c','#d32f2f'],
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor:  ['#1976d2','#388e3c','#d32f2f'],
            data: ['112668925' ,'63587802' , '2499668']
          }
        ]
      };

    return (
        <div className='map__class'>
            <Card className={classes.map}>
                <CardContent>
                    <Typography className={classes.map__title} color="textSecondary" gutterBottom>
                        Global Data
                    </Typography>
                    <Bar data={datas} height={95} />

                </CardContent>
            </Card>
        </div>
    )
}

export default Map
