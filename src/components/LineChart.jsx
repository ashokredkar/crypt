import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';


const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

  const coinPrice = [];          // adding prices one by one in this array through below for loop 
  const coinTimeStamp = [];      // adding timestamp one by one in this array through below for loop


  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    // coinTimeStamp.push(coinHistory.data.history[i].timestamp);     
    coinTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());      // this step is same as above step but just more readable in a date format
  }


  // DATA Object of CHART.js
  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };


  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      {/* <Line data={data} options={options} /> */}
    </>
  );
};

export default LineChart;
