import React from 'react';

function Results({ data }) {
  return (
    <section>
      <pre>{data ? JSON.stringify(data, null, 2) : null}</pre>
    </section>
  );
}

export default Results;
