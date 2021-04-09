import React, { Component } from 'react';
import './Dashboard.css';
import Chart from './Chart.js';

export default class Dashboard extends Component {  
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    this.setState({
      chartData:{
        labels: ['AXZ comercio ltda', 'cnpj lituano ltda', 'Ulisses Vieira ltda', 'WI Moveis de madeira ltda', 'portao quimicos ltda', 'portfolio celulose ltda	'],
        datasets:[
          {
            label:'Contratos',
            data:[
              48,
              22,
              13,
              75,
              7,
              34
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="Dashboard">
        <Chart chartData={this.state.chartData} location="ABNT" legendPosition="bottom"/>
      </div>
    );
  }
}