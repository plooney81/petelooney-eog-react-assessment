import { Chip, LinearProgress } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import { measurementDataError, measurements } from '../redux/actions';
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
                  "metricName": "oilTemp"
                }, 
                {
                  "metricName": "tubingPressure"
                },
                {
                  "metricName": "casingPressure"
                },
                {
                  "metricName": "waterTemp"
                },
                {
                  "metricName": "injValveOpen"
                },
                {
                  "metricName": "flareTemp"
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
              dispatch(measurements(getMultipleMeasurements));
          }, [dispatch, data, error])

          if(fetching) return <LinearProgress></LinearProgress>;
          return <Chip label={`Something`} />;
        }

        return (
          <Provider value={client}>
              <Metrics></Metrics>
          </Provider>
      )

    }
    