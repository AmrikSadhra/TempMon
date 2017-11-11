import * as React from 'react';
import { Line } from 'react-chartjs-2';

export interface Props {
  name: string;
}

interface State {
  chartData: Object;
}

function epochToStr(epoch : number){
  var date = new Date(0);
  date.setUTCSeconds(epoch);
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

class ChartView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [{
          label: 'Temperature (°C)',
          data: [],
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
    
    //If Arduino is playing nicely, parse data from JSON
     if(vars[1] != null){
      console.log("Time: " + parseInt(vars[0]));
      console.log("Temperature: " + parseInt(vars[1]));
      this.state.chartData['labels'].push(epochToStr(parseInt(vars[0])));
      this.state.chartData['datasets']['0']['data'].push(parseInt(vars[1]));
    }

    //Trim the dataset if it gets too large
    if(this.state.chartData['labels'].length > 20){
      this.state.chartData['labels'].shift();
      this.state.chartData['datasets']['0']['data'].shift();
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

