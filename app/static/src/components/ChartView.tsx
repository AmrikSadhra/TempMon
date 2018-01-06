import * as React from 'react';
import {Line} from 'react-chartjs-2';

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

    processPiData(piData: Object) {
        if(piData == null) return
        //If Arduino is playing nicely, parse data from JSON
        console.log("Time: " + piData['time']);
        console.log("Temperature: " + piData['temperature']);
        this.state.chartData['labels'].push(piData['time']);
        this.state.chartData['datasets']['0']['data'].push(parseInt(piData['temperature']));


        //Trim the dataset if it gets too large
        if (this.state.chartData['labels'].length > 20) {
            this.state.chartData['labels'].shift();
            this.state.chartData['datasets']['0']['data'].shift();
        }

        this.setState({chartData: this.state.chartData})
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

