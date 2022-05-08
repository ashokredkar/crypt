import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from './';
import Loader from './Loader';
 
const { Title } = Typography;

const Homepage = () => {

  // calling the cryptoApi hook
  const { data, isFetching } = useGetCryptosQuery(12);    // setting the simplified count to 12 so that only 10 components will be shown on homePage
  const globalStatistics = data?.data?.stats;
  console.log(data);

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">Global Crypto Statistics</Title>
      <Row gutter={[30, 30]}>
        {/* <Col span={12}><Statistic title="Total Cryptocurrencies" value='5' /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value='5' /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value='5' /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value='5' /></Col>
        <Col span={12}><Statistic title="Total Markets" value='5' /></Col> */}
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={millify(globalStatistics?.total)} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStatistics?.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value={millify(globalStatistics?.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStatistics?.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStatistics?.totalMarkets)} /></Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 12 Cryptos In The World</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      {/* using simplfied keyword will help us to display only 10 currencies instead of displaying all of them */}
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show more</Link></Title>
      </div>
      {/* using simplfied keyword will help us to display only 10 news instead of displaying all of them */}
      <News simplified />
    </>
  );
};

export default Homepage;
