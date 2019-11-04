import React, {useState} from 'react';

function Method(props) {
  return (
    <>
      <label onClick={props.onClick}>
        <input type="radio" name="method" value={props.type} checked={props.checked} required readOnly />
        <span>{props.type.toUpperCase()}</span>
      </label>
    </>
  );
}

const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

function Form(props) {
  const [state, setState] = useState({
    method: 'get',
    url: '',
    headers: {},
    body: '',
  });

  const onSubmit = event => {
    event.preventDefault()
    props.onSubmit(state);
  }

  const getMethodOnClick = method => {
    return event => {
      event.preventDefault()
      setState({...state, method});
    }
  }

  const urlOnChange = event => {
    event.preventDefault();
    setState({...state, url: event.target.value});
  }
  
  const onBodyChange = event => {
    event.preventDefault();
    setState({...state, body: event.target.value});
  }

  return (
    <form id="request-form" onSubmit={onSubmit}>
      <input
        type="url"  
        onChange={urlOnChange}
        id="url" name="url"
        placeholder="https://www.google.com" 
        required 
      />
      <ul id="methods">
        {METHODS.map(method => {
          return (
            <Method
              key={method}
              type={method}
              onClick={getMethodOnClick(method)}
              checked={state.method === method}
            />
          )
        })}
      </ul>
      <section>
        <textarea disabled={state.method !== 'post' && state.method !== 'put'} onChange={onBodyChange} />
      </section>
      <input type="submit" value="Go!"/>
    </form>
  );
}

export default Form;
