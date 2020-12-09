import { TimeSeries } from 'pondjs';
import React from 'react';
import { useSelector } from 'react-redux';
import {Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { styler, Legend } from "react-timeseries-charts";

export default function Chart() {
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
        const oilTempColumns = ['time', 'oilTemp'];
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
        const flareTempColumns = ['time', 'flareTemp'];
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
        const waterTempColumns = ['time', 'waterTemp'];
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
        const tubingPressureColumns = ['time', 'tubingPressure'];
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
        const casingPressureColumns = ['time', 'casingPressure'];
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
        const injectionValveOpenColumns = ['time', 'injValveOpen'];
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
        {key: 'flareTemp', color: 'black', width: 5}
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
                        <LineChart axis="tempF" series={oilTempSeries} columns={['oilTemp']} style={chartStyler}/>
                        <LineChart axis="tempF" series={tempSeries} columns={['flareTemp']} style={chartStyler}/>
                        <LineChart axis="tempF" series={waterTempSeries} columns={['waterTemp']} style={chartStyler}/>
                        <LineChart axis="pressure" series={pressureSeries}  columns={['tubingPressure']} style={chartStyler}/>
                        <LineChart axis="pressure" series={casingPressureSeries} columns={['casingPressure']} style={chartStyler}/>
                        <LineChart axis="percentOpen" series={injectionValveOpenSeries} columns={['injValveOpen']} style={chartStyler}/>
                    </Charts>
                </ChartRow>
            </ChartContainer>
            <Legend
            type="line"
            align="left"
            style={chartStyler}
            categories={[
                {key: "oilTemp", label: "Oil Temperature"},
                {key: "flareTemp", label: "Flare Temperature"},
                {key: "waterTemp", label: "Water Temperature"},
                {key: "casingPressure", label: "Casing Pressure"},
                {key: "tubingPressure", label: "Tubing Pressure"},
                {key: "injValveOpen", label: "Injection Valve Open"},
            ]} />
            </>
        )}
        </>
    )
}
