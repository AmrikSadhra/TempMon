import * as React from 'react';
import {Line} from 'react-chartjs-2';

export interface Props {
    name: string;
}

interface State {
    chartData: Object;
}

function epochToStr(epoch: number): string {
    var date = new Date(epoch);
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
        let timer = setInterval(this.getTemperatureData, 300000);
    }

    componentDidMount(){
        this.getTemperatureData();
    }

    processPiData(piData: Object) {
        if (piData == null) return

        //Reset Chart Data
        this.state.chartData['labels'] = []
        this.state.chartData['datasets']['0']['data'] = []

        //Iterate through temperatures and times, updating graph dataset
        for (var temprature_record in piData) {
            this.state.chartData['labels'].push(epochToStr(piData[temprature_record]['date']['$date']));
            this.state.chartData['datasets']['0']['data'].push(parseInt(piData[temprature_record]['temperature']));
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

