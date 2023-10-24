import React, { useState, useEffect } from 'react';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const App = () => {
  const [request, setRequest] = useState({});
  const [response, setResponse] = useState({});

  const apiMock = (req) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          headers: { 'Content-Type': 'application/json' },
          data: { message: 'This is mocked data' }
        });
      }, 2000);
    });
  };

  const callApi = (requestParams) => {
    setRequest(requestParams);
  };

  useEffect(() => {
    if (Object.keys(request).length !== 0) { // only run if request object is not empty
      apiMock(request).then(data => setResponse(data));
    }
  }, [request]);

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {request.method}</div>
      <div>URL: {request.url}</div>
      <Form handleApiCall={callApi} setRequest={setRequest} />
      <Results data={response} />
      <Footer />
    </React.Fragment>
  );
};

export default App;
