import React from 'react';

const History = ({ history, onSelect }) => {
  return (
    <div className="history">
      <h3>Request History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index} onClick={() => onSelect(item)}>
            <span>{item.method}</span> - <span>{item.url}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
