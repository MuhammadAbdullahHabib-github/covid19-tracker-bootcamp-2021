import React from 'react';
import {Card , CardContent , Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    card:{
        width:'150%',
        borderBottom:'3px solid red'
    }

})




const Infobox = ({ title, cases, total}) => {
    const classes = useStyles();
    return (
        <div>
            <Card className='infobox__card' className={classes.card}>
                <CardContent>
                    <Typography className='infobox__title' color='textSecondary'>
                        {title}
                    </Typography>
                    <h2 className='infobox__cases'>{cases}</h2>
                    <Typography className='infobox__total' color='textSecondary'>
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Infobox
