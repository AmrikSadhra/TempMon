import * as React from 'react';
import { Line } from 'react-chartjs-2';
import * as SerialPort from 'serialport';


export interface Props {
  name: string;
  data: number[];
}

function ChartView({ name, data }: Props) {
  //   throw new Error('You could be a little more enthusiastic. :D');

 

  var chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Temperature (°C)',
      data: [0, 1, 2, 2, 34, 5],
      backgroundColor: 'rgba(46, 204, 113,0.5)',
      borderWidth: 1
    }]
  };

  let key = 'data';
  chartData.datasets[key] = data;

  return (
    <div className="Chart">
      <Line data={chartData} />
    </div>
  );
}

export default ChartView;