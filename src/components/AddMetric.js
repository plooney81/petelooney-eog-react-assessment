import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Icon, makeStyles } from '@material-ui/core';
import { addMetric, removeMetric } from '../redux/actions';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    root:{
        width: '100px'
    },
    group:{
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center'
    },
    button:{
        marginLeft: '5px'
    }
}))

export default function AddMetric() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {possible, current} = useSelector(state => state.metrics) //Gets all possible metrics, and currently selected metrics

    const handleChange = (e) => {
        dispatch(addMetric(e.target.value))
    }
    const handleDeleteMetric = (metricName) => {
        console.log('clicked')
        dispatch(removeMetric(metricName))
    }
    return (
        <div className={classes.group}>
            <FormControl variant="filled" className={classes.root}>
            <InputLabel id="metric-select-label" >Metrics</InputLabel>
            <Select
                labelId="metricSelect-label"
                id="metric-select"
                onChange={e => {handleChange(e)}}
            >
                {possible.map(metric => {
                    return <MenuItem value={metric} key={metric}>{metric}</MenuItem>
                })}
            </Select>
            </FormControl>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                {current.map(metric => {
                    return (
                        <Button className={classes.button} key={metric} onClick={() => {handleDeleteMetric(metric)}}>
                            {metric}
                            <DeleteIcon />
                        </Button>
                    )
                })}
            </ButtonGroup>
        </div>
    )
}
