import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm'
import Navigator from './components/Navigator'
import Records from './components/Tables/Records';
import NewAuthor from './components/Tables/NewAuthor';
import NewRecord from './components/Tables/NewRecord';
import ViewRecord from './components/Tables/ViewRecord';
import NewTag from './components/Tables/NewTag';
import Header from './components/header';
import CookiesManager from 'js-cookie';

class App extends React.Component {
  state = {
    isLoginned: false,
    token: undefined,
    name: "Фисунов Антон Павлович",
    activeWindow: 'record',
    viewId: undefined,
  }

  hadleLoginClick = () => {
    if (this.state.isLoginned === false) {
      this.setState({ isLoginned: true })
      CookiesManager.set('isLoginned', true);
    }
    else {
      CookiesManager.set('isLoginned', false);
      CookiesManager.set('token', undefined);
      this.setState({ isLoginned: false })
    }
  }

  changeWindow = (new_window) => {
    this.setState({ activeWindow: new_window })
  }

  setToken = (s_token) => {
    this.setState({ token: s_token })
    CookiesManager.set('token', s_token);
  }

  setView = (activeWindow, id) => {
    this.setState({ activeWindow: activeWindow, viewId: id })
  }

  render() {
    return (
      <>
        {this.state.isLoginned === true ? <div >
          <Header onButtonClick={this.hadleLoginClick} name={this.state.name} />
          <div key='mainscreen' className='MainScreen'>
            <Navigator changeWindow={this.changeWindow} />
            {(() => {
              switch (this.state.activeWindow) {
                case 'records':
                  return (
                    <Records token={this.state.token} setView={this.setView} />
                  )
                case 'authors':
                  return (
                    <div>Authors</div>
                  )
                case 'newauthor':
                  return (
                    <NewAuthor token={this.state.token} />
                  )
                case 'newrecord':
                  return (
                    <NewRecord token={this.state.token} />
                  )
                case 'viewrecord':
                  return (
                    <ViewRecord token={this.state.token} viewId={this.state.viewId} />
                  )
                case 'newtag':
                  return (
                    <NewTag token={this.state.token} />
                  )
                case 'tags':
                  return (
                    <div>tags</div>
                  )
                default:
                  return (
                    <Records token={this.state.token} setView={this.setView} />
                  )
              }

            })()}
          </div>
        </div> : <LoginForm onButtonClick={this.hadleLoginClick} setToken={this.setToken} isLoginned={this.state.isLoginned} token={this.state.token} />}
      </>
    );
  }
}

export default App;
