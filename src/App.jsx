import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const App = () => {
  const [request, setRequest] = useState({});
  const [response, setResponse] = useState({});

  useEffect(() => {
      if (Object.keys(request).length !== 0) {
          axios({
              method: request.method.toLowerCase(), 
              url: request.url,
              data: request.method.toLowerCase() !== 'get' && request.body ? JSON.parse(request.body) : {} // 
          })
          .then(res => {
              setResponse({
                  headers: res.headers,
                  data: res.data
              });
          })
          .catch(error => {
              if (error.response) {
                  setResponse({
                      error: true,
                      message: error.response.data.message || 'An error occurred'
                  });
              } else if (error.request) {
                  setResponse({
                      error: true,
                      message: 'No response from the server'
                  });
              } else {
                  setResponse({
                      error: true,
                      message: error.message
                  });
              }
          });
      }
  }, [request]);

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {request.method}</div>
      <div>URL: {request.url}</div>
      <Form handleApiCall={setRequest} />
      <Results data={response} />
      <Footer />
    </React.Fragment>
  );
};

export default App;
