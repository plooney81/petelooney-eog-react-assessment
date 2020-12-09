import { TimeSeries } from 'pondjs';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {Charts, ChartContainer, ChartRow, YAxis, LineChart, Legend } from "react-timeseries-charts";
import { styler } from "react-timeseries-charts";

export default function Chart() {
    const {current} = useSelector(state => state.metrics);
    const {data} = useSelector(state => state.measurements)
    let tempSeries = null;
    let oilTempSeries = null;
    let waterTempSeries = null;
    let pressureSeries = null;
    let casingPressureSeries = null;
    let injectionValveOpenSeries = null;
    let oilTempData = {};
    let flareTempData = {};
    let tubingPressureData = {};
    let waterTempData = {};
    let casingPressureData = {};
    let injectionValveOpenData = {};

    if(data){

        //oil temperature section
        const oilTemp = data.filter(metricData => metricData.metric === 'oilTemp');
        const oilTempName = 'oilTemp';
        const oilTempColumns = ['time', 'value'];
        const oilTempPoints = oilTemp[0].measurements.map(measurement => {
            return [measurement.at, measurement.value]
        })
        oilTempData = {
            name: oilTempName,
            columns: oilTempColumns,
            points: oilTempPoints
        }

        oilTempSeries = new TimeSeries(oilTempData);

        //flare temperature section
        const flareTemp = data.filter(metricData => metricData.metric === 'flareTemp');
        const flareTempName = 'flareTemp';
        const flareTempColumns = ['time', 'value'];
        const flareTempPoints = flareTemp[0].measurements.map(measurement => {
            return [measurement.at, measurement.value]
        })
        flareTempData = {
            name: flareTempName,
            columns: flareTempColumns,
            points: flareTempPoints
        }

        tempSeries = new TimeSeries(flareTempData);

        //water temperature section
        const waterTemp = data.filter(metricData => metricData.metric === 'waterTemp');
        const waterTempName = 'waterTemp';
        const waterTempColumns = ['time', 'value'];
        const waterTempPoints = waterTemp[0].measurements.map(measurement => {
            return [measurement.at, measurement.value]
        })
        waterTempData = {
            name: waterTempName,
            columns: waterTempColumns,
            points: waterTempPoints
        }
        waterTempSeries = new TimeSeries(waterTempData);

        //tubing pressure section
        const tubingPressure = data.filter(metricData => metricData.metric === 'tubingPressure');
        const tubingPressureName = 'tubingPressure';
        const tubingPressureColumns = ['time', 'value'];
        const tubingPressurePoints = tubingPressure[0].measurements.map(measurement => {
            return [measurement.at, measurement.value]
        })

        tubingPressureData = {
            name: tubingPressureName,
            columns: tubingPressureColumns,
            points: tubingPressurePoints
        }

        pressureSeries = new TimeSeries(tubingPressureData)

        //casing pressure section
        const casingPressure = data.filter(metricData => metricData.metric === 'casingPressure');
        const casingPressureName = 'casingPressure';
        const casingPressureColumns = ['time', 'value'];
        const casingPressurePoints = casingPressure[0].measurements.map(measurement => {
            return [measurement.at, measurement.value]
        })

        casingPressureData = {
            name: casingPressureName,
            columns: casingPressureColumns,
            points: casingPressurePoints
        }

        casingPressureSeries = new TimeSeries(casingPressureData)

        //injection valve section
        const injectionValveOpen = data.filter(metricData => metricData.metric === 'injValveOpen');
        const injectionValveOpenName = 'injValveOpen';
        const injectionValveOpenColumns = ['time', 'value'];
        const injectionValveOpenPoints = injectionValveOpen[0].measurements.map(measurement => {
            return [measurement.at, measurement.value]
        })

        injectionValveOpenData = {
            name: injectionValveOpenName,
            columns: injectionValveOpenColumns,
            points: injectionValveOpenPoints
        }

        injectionValveOpenSeries = new TimeSeries(injectionValveOpenData)
    }
    
    const chartStyler = styler([
        {key: 'oilTemp', color: "#f2d974", width: 5},
        {key: 'tubingPressure', color: "#c7956d", width: 5},
        {key: 'casingPressure', color: '#965d62', width: 5},
        {key: 'waterTemp', color: '#534e52', width: 5},
        {key: 'injValveOpen', color: '#999b84', width: 5},
        {key: 'flareTemp', color: '#f4eeed', width: 5}
    ]);

    return (
        <>
        {tempSeries && (
            <>
            <ChartContainer timeRange={tempSeries.timerange()} width={800}>
                <ChartRow height="400">
                    <YAxis id="tempF" label="Degrees F" min={0.5} max={5000} width="60" type="linear" />
                    <YAxis id="pressure" label="psi" min={0} max={2000} width="60" type="linear"/>
                    <YAxis id="percentOpen" label="% open" min={0} max={100} width="60" type="linear"/>
                    <Charts>
                        <LineChart axis="tempF" series={oilTempSeries} column={['oilTemp']} />
                        <LineChart axis="tempF" series={tempSeries} column={['flareTemp']} />
                        <LineChart axis="tempF" series={waterTempSeries} column={['waterTemp']} />
                        <LineChart axis="pressure" series={pressureSeries}  column={['tubingPressure']} />
                        <LineChart axis="pressure" series={casingPressureSeries} column={['casingPressure']} />
                        <LineChart axis="percentOpen" series={injectionValveOpenSeries} column={['injValveOpen']} />
                    </Charts>
                </ChartRow>
            </ChartContainer>
            </>
        )}
        </>
    )
}
