import React, {useState} from 'react';
import './style/app.scss';

import Header from './components/header';
import Footer from './components/footer';
import History from './components/history';
import Form from './components/form';
import Response from './components/response';
import superagent from 'superagent';

function App(props) {
  const [state, setState] = useState({
    response: '',
    history: [],
  })

  const addHistory = (request, status) => {
    state.history.unshift({request, status});
    setState({
      ...state,
    });
  }

  const setResponse = (status, response) => {
    setState({...state, response});
  }

  const onRequestSubmit = request => {
    superagent[request.method](request.url).end((err, res) => {
      if (err) {
        addHistory(request, err.status || 400);
        setResponse(err.status || 400, err.message);
      } else {
        addHistory(request, res.status);
        setResponse(res.status, res.text);
      };
    });
    console.log(request);
  };

  return (
    <>
      <Header />
      <main>
        <aside>
          <History history={state.history} />
        </aside>
        <section className="deck">
          <Form onSubmit={onRequestSubmit}/>
          <Response text={state.response} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
