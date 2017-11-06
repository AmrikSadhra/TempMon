import * as React from 'react';
import { Line } from 'react-chartjs-2';

export interface Props {
  name: string;
}

interface State {
  chartData: Object;
}

class ChartView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      chartData: {
        labels: [Math.floor(new Date().getTime() / 1000)],
        datasets: [{
          label: 'Temperature (°C)',
          data: [20],
          backgroundColor: 'rgba(46, 204, 113,0.5)',
          borderWidth: 1
        }]
      }
    };
   
    this.getTemperatureData = this.getTemperatureData.bind(this);
    let timer = setInterval(this.getTemperatureData, 1000);
  }

  processPiData(piData : Object){
    let py_response = piData['0'];
    var vars = [];

    for (var key in py_response) {
      vars.push(py_response[key])
    }
    
     if(vars[1] != null){
      console.log("Time: " + vars[0]);
      console.log("Temperature: " + parseInt(vars[1]));
      this.state.chartData['labels'].push(parseInt(vars[0]));
      this.state.chartData['datasets']['0']['data'].push(parseInt(vars[1]));
    }

    this.setState({ chartData:  this.state.chartData})
  }

  getTemperatureData() {
    fetch('/api/get-temperature')
      .then(res => res.json())
      .then(piData => this.processPiData(piData));
  }

  render() {
    return (
      <div className="Chart">
        <Line data={this.state.chartData} redraw={true}/>
      </div>
    );
  }
}

export default ChartView;

