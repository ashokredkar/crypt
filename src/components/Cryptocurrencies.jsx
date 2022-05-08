import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 12 : 100;
  // const { data: cryptoList , isFetching } = useGetCryptosQuery();
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);   // for showing only 12 components of each section on home screen and renaming (considering) data as cryptoList
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredCryptoList = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredCryptoList);
  }, [cryptoList, searchTerm])


  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder='Search CryptoCurrency' onChange={(e) => setSearchTerm(e.target.value)}></Input>
        </div>
      )}
      {/* gutter gives margin outside the card {[margin left-right, margin top-bottom]} */}
      <Row gutter={[20, 20]} className='crypto-card-container'>
        {cryptos?.map((singleCrypto) => (
          // antDesign cosiders 24 columns on a screen, hence we want our below column to take all 24 columns on extra small screens, 12 in small screens (i.e. two columns in each row) and 6 in large screens (i.e. 4 columns in one row)
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={singleCrypto.uuid}>
            <Link to={`/crypto/${singleCrypto.uuid}`}>
              <Card
                title={`${singleCrypto.rank}. ${singleCrypto.name}`}
                extra={<img src={singleCrypto.iconUrl} className='crypto-image' />}
                hoverable >
                <p>Price: <b>${millify(singleCrypto.price)}</b></p>
                <p>Market Cap: <b>{millify(singleCrypto.marketCap)}</b></p>
                <p>Daily Change: <b>{millify(singleCrypto.change)}</b></p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
