import { LinearProgress } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import { measurementDataError, measurements, setPossibleMetrics } from '../redux/actions';
import AddMetric from './AddMetric';
import Chart from './Chart';
    export default function Visualization() {
    const dispatch = useDispatch();
        const client = createClient({
            url: 'https://react.eogresources.com/graphql'
        });
    
        const query = `
            query($input: [MeasurementQuery]){
                getMultipleMeasurements(input: $input){
                measurements{
                    value,
                    unit,
                    metric,
                    at
                },
                metric,
                }
            }
        `
        const input = [
                {
                  "metricName": "oilTemp",
                  "after": 1607551526841
                }, 
                {
                  "metricName": "tubingPressure",
                  "after": 1607551526841
                },
                {
                  "metricName": "casingPressure",
                  "after": 1607551526841
                },
                {
                  "metricName": "waterTemp",
                  "after": 1607551526841
                },
                {
                  "metricName": "injValveOpen",
                  "after": 1607551526841
                },
                {
                  "metricName": "flareTemp",
                  "after": 1607551526841
                }
        ]

        const Metrics = () => {
          const [result] = useQuery({
            query,
            variables:{
                input
            }
        })
        const {fetching, data, error} = result;

          useEffect(() => {
              if(error){
                  dispatch(measurementDataError(error.message))
              }
              if(!data) return;
              const {getMultipleMeasurements} = data;
              const metricNames = getMultipleMeasurements.map(measurement => measurement.metric)
              dispatch(measurements(getMultipleMeasurements));
              dispatch(setPossibleMetrics(metricNames))
          }, [data, error])

          if(fetching) return <LinearProgress></LinearProgress>;
          return (
            <div>
              <AddMetric/>
              <Chart/>
            </div>
          );
        }

        return (
          <Provider value={client}>
              <Metrics>Something</Metrics>
          </Provider>
      )

    }
    