import React from 'react';

function History(props) {
  return (
    <>
      <h2>History</h2>
      <ul id="history">
        {props.history.reduce((elements, hist) => {
          elements.push(
            <li>
              <span className={`method ${hist.request.method}`}>{hist.request.method}</span>
              <span className="url">{hist.request.url}</span>
              <span className={`status category-${ Math.floor(hist.status / 100) }`}>{hist.status}</span>
            </li>
          );
          return elements;
        }, [])}
      </ul>
    </>
  );
}

export default History;
