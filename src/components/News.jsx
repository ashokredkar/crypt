import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoNewsImg = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 24 });
  console.log(cryptoNews);
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <>
      <Row gutter={[20, 20]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins?.map((currencyCoin) =>
                <Option value={currencyCoin.name}>{currencyCoin.name}</Option>)}
            </Select>
          </Col>
        )}
        {cryptoNews?.value?.map((singleNews, i) => (
          <Col xs={24} sm={12} lg={8} className='news-card' key={i}>
            <a href={singleNews.url} target='_blank' rel='noreferrer'>
              <Card hoverable style={{ height: '380px' }}>
                <div className="news-image-container">
                  <Title className='news-title' level={5} >{singleNews.name}</Title>
                  <img src={singleNews?.image?.thumbnail?.contentUrl || demoNewsImg} alt="news_img" style={{ width: '100%', height: '100%', borderRadius: '15px', marginLeft: '0.5rem' }} />
                </div>
                <p>{singleNews.description.length > 120 ? `${singleNews.description.substring(0, 120)}...` : singleNews.description}</p>
                <div className="provider-container">
                  <div>
                    <Avatar src={singleNews.provider[0]?.image?.thumbnail?.contentUrl || demoNewsImg} alt="source_logo" />
                    <Text className="provider-name">{singleNews.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(singleNews.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
