import React from 'react';
import './style/app.scss';

import Header from './components/header';
import Footer from './components/footer';
import History from './components/history';
import Form from './components/form';
import Response from './components/response';
import superagent from 'superagent';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      history: [],
    }
  }

  addHistory(request, status) {
    this.setState(state => {
      state.history.unshift({request, status});
      return state;
    })
  }

  setResponse = (status, response) => {
    this.setState(state => {
      state.response = response;
      return state;
    });
  }

  onRequestSubmit = request => {
    superagent[request.method](request.url).withCredentials().end((err, res) => {
      if (err) {
        this.addHistory(request, err.status || 400);
        this.setResponse(err.status || 400, err.message);
      } else {
        this.addHistory(request, res.status);
        this.setResponse(res.status, res.text);
      };
    });
    console.log(request);
  };

  showResponse = text => {
    this.setState(state => {
      state.response = text;
      return state;
    })
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <aside>
            <History history={this.state.history} />
          </aside>
          <section className="deck">
            <Form onSubmit={this.onRequestSubmit}/>
            <Response text={this.state.response} />
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
