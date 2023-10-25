import React, { useState } from 'react';
import './Form.scss';

function Form(props) {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('get');
  const [body, setBody] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      url,
      method,
      body
    };
    props.handleApiCall(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input 
            name='url' 
            type='text' 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="Enter API URL"
          />
        </label>
        <div className="methods">
          <label>
            <input 
              type="radio" 
              value="get" 
              checked={method === "get"} 
              onChange={() => setMethod("get")} 
            />
            GET
          </label>
          <label>
            <input 
              type="radio" 
              value="post" 
              checked={method === "post"} 
              onChange={() => setMethod("post")} 
            />
            POST
          </label>
          <label>
            <input 
              type="radio" 
              value="put" 
              checked={method === "put"} 
              onChange={() => setMethod("put")} 
            />
            PUT
          </label>
          <label>
            <input 
              type="radio" 
              value="delete" 
              checked={method === "delete"} 
              onChange={() => setMethod("delete")} 
            />
            DELETE
          </label>
        </div>
        {method !== 'get' && (
          <div>
            <label>
              <span>Body: </span>
              <textarea 
                value={body} 
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter JSON formatted body"
              ></textarea>
            </label>
          </div>
        )}
        <button type="submit">GO!</button>
      </form>
    </>
  );
}

export default Form;

