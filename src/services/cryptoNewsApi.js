import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '8a14c7b812msh647c176ae639612p140dcfjsnaf9d36ba5c93'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',          // this line means that the reducer is created only for cryptoApi
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({         // the content inside this function is our 'query'
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),      // query to set count to simplified  // don't leave spaces before or after question mark 
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;







// COPIED FROM BING NEWS (RAPID) API, PARTS OF THIS ARE GETTING USED IN ABOVE CODE--------------
// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://bing-news-search1.p.rapidapi.com/news',
//   params: {safeSearch: 'Off', textFormat: 'Raw'},
//   headers: {
//     'X-BingApis-SDK': 'true',
//     'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
//     'X-RapidAPI-Key': '8a14c7b812msh647c176ae639612p140dcfjsnaf9d36ba5c93'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });