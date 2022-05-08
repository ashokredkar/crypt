// THE API GETTING USED IN THIS PROJECT HAS A LIMIT OF 1000 REQUESTS / MONTH only


// HOMEPAGE BUG...( automatically solved after completing project )
// blank screen appears if page is refreshed only when we have data coming from api under 'Global Crypto Statistics' field 
// static data shows no problem

// LINECHART BUG...
// blank screen appears when tried to disply crypto graph on CryptoDetails page
// throws an error that I'm not able to solve

// EXCHANGES COMPONENT
// need premium api plan for exchanges component to work as the endpoint used in Exchanges needs premium plan


import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Cryptocurrencies, CryptoDetails, Exchanges, Homepage, Navbar, News } from './components';

function App() {
  return (
    <div className="app">

      <div className="navbar"><Navbar /></div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path='/' element={<Homepage />} />
              <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route exact path='/exchanges' element={<Exchanges />} />
              <Route exact path='/crypto/:coinId' element={<CryptoDetails />} />
              <Route exact path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer" >
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Crypt <br />
            All Rights Reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>

    </div>
  );
}

export default App;
