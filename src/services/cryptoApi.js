import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '8a14c7b812msh647c176ae639612p140dcfjsnaf9d36ba5c93'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({   // passing required options inside the function
    reducerPath: 'cryptoApi',         // this line means that the reducer is for cryptoApi
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({         // the content inside this function is our 'query'
        getCryptos: builder.query({
            // query: () => createRequest('/coins'),                         // initial query
            query: (count) => createRequest(`/coins?limit=${count}`),      // query to set count to simplified  // don't leave spaces before or after question mark 
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`)
        }),
        // Note: To access this endpoint you need premium plan
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        })
    })
});

// exporting our created query so that we can use it in other components of our react app
// REDUX TOOLKIT creates a hook that we can call to get all data for the query (eg. 'useGetCryptosQuery' is a hook that we are calling)
export const {
    useGetCryptosQuery, 
    useGetCryptoDetailsQuery, 
    useGetCryptoHistoryQuery, 
    useGetExchangesQuery
} = cryptoApi;




// COPIED FROM COINRANKING (RAPID) API, PARTS OF THIS ARE GETTING USED IN ABOVE CODE--------------
// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
//       'X-RapidAPI-Key': '8a14c7b812msh647c176ae639612p140dcfjsnaf9d36ba5c93'
//     }