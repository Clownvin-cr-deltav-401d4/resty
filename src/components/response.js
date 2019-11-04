import React from 'react';

function Response(props) {
  return (
    <div id="response">
      <textarea disabled value={props.text}></textarea>
    </div>
  );
}

export default Response;
