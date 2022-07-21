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

class App extends React.Component {
  state = {
    isUnloginned: false,
    token: undefined,
    name: undefined,
    activeWindow: 'record',
    viewId: undefined,
  }

  hadleLoginClick = () => {
    if (this.state.isUnloginned === false){
      this.setState({isUnloginned: true})
    }
    else{
      this.setState({isUnloginned: false})
    }
  }

  changeWindow = (new_window) => {
    this.setState({activeWindow: new_window})
  }

  setTokenandName = (s_token, t_name) => {
    this.setState({token: s_token, name: t_name})
  }

  setView = (activeWindow, id) => {
    this.setState({activeWindow: activeWindow, viewId: id})
  }

  render() {
    return (
      <>
        {this.state.isUnloginned? <div >
          <Header onButtonClick={this.hadleLoginClick} name={this.state.name} />
          <div key='mainscreen' className='MainScreen'>
            <Navigator changeWindow={this.changeWindow}/>
            {(() => {  
            switch (this.state.activeWindow) {
              case 'records':
                return (
                  <Records token = {this.state.token} setView = {this.setView}/>
                )
              case 'authors':
                return (
                  <div>Authors</div>
                )
              case 'newauthor':
                return (
                  <NewAuthor token = {this.state.token} />
                )
              case 'newrecord':
                return (
                  <NewRecord token = {this.state.token} />
                )
              case 'viewrecord':
                return (
                  <ViewRecord token = {this.state.token} viewId = {this.state.viewId} />
                )
              case 'newtag':
                return (
                  <NewTag token = {this.state.token} />
                )
              case 'tags':
                return (
                  <div>tags</div>
                )
              default:
                return (
                  <Records token = {this.state.token} setView = {this.setView}/>
                )
            }

          })()}
            </div>
        </div>: <LoginForm onButtonClick={this.hadleLoginClick} setToken={this.setTokenandName} />}
      </>
    );
  }
}

export default App;
