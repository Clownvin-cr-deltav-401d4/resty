import React from 'react';

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

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      method: 'get',
      url: '',
      headers: {},
    }
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.onSubmit({...this.state});
  }

  getMethodOnClick = method => {
    const thiss = this;
    return event => {
      event.preventDefault()
      thiss.setState(state => {
        state.method = method;
        return state;
      });
    }
  }

  urlOnChange = event => {
    event.preventDefault();
    this.setState(state => {
      state.url = this.refs.url.value;
      return state;
    })
  }

  render() {
    return (
      <form id="request-form" onSubmit={this.onSubmit}>
        <input
          type="url"  
          onChange={this.urlOnChange}
          id="url" ref="url" name="url"
          placeholder="https://www.google.com" 
          required 
        />
        <ul id="methods">
          {METHODS.map(method => {
            return (
              <Method
                key={method}
                type={method}
                onClick={this.getMethodOnClick(method)}
                checked={this.state.method === method}
              />
            )
          })}
        </ul>
        <input type="submit" value="Go!"/>
      </form>
    )
  }
}

export default Form;
