import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';


const initialState = {
  loading: false,
  request: {},
  response: {},
  history: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_REQUEST':
      return { ...state, request: action.payload };
    case 'SET_RESPONSE':
      return { ...state, response: action.payload };
    case 'ADD_TO_HISTORY':
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
      if (Object.keys(state.request).length !== 0) {
          dispatch({ type: 'SET_LOADING', payload: true });

          axios({
              method: state.request.method.toLowerCase(),
              url: state.request.url,
              data: state.request.method.toLowerCase() !== 'get' && state.request.body ? JSON.parse(state.request.body) : {}
          })
          .then(res => {
              dispatch({
                type: 'SET_RESPONSE',
                payload: {
                  headers: res.headers,
                  data: res.data
                }
              });
              dispatch({
                type: 'ADD_TO_HISTORY',
                payload: { method: state.request.method, url: state.request.url, results: res.data }
              });
          })
          .catch(error => {
          })
          .finally(() => {
              dispatch({ type: 'SET_LOADING', payload: false });
          });
      }
  }, [state.request]);

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.request.method}</div>
      <div>URL: {state.request.url}</div>
      <Form handleApiCall={(request) => dispatch({ type: 'SET_REQUEST', payload: request })} />
      <Results data={state.response} />
      <History history={state.history} onSelect={(item) => {
      dispatch({ type: 'SET_REQUEST', payload: { method: item.method, url: item.url } });
      dispatch({ type: 'SET_RESPONSE', payload: item.results });
      }} 
      />
      <Footer />
    </React.Fragment>
  );
};

export default App;
