import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm'
import Navigator from './components/Navigator'
import Records from './components/Tables/Records';
import NewAuthor from './components/Tables/NewAuthor';
import NewRecord from './components/Tables/NewRecord';
import NewTag from './components/Tables/NewTag';
import Header from './components/header';

class App extends React.Component {
  state = {
    isUnloginned: false,
    token: undefined,
    name: undefined,
    activeWindow: 'record',
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

  render() {
    return (
      <div>
        {this.state.isUnloginned? <div >
          <div><Header onButtonClick={this.hadleLoginClick} name={this.state.name} /></div>
          <div className='MainScreen'>
            <Navigator changeWindow={this.changeWindow}/>
            {(() => {  
            switch (this.state.activeWindow) {
              case 'records':
                return (
                  <Records token = {this.state.token} />
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
                  <Records token = {this.state.token} />
                )
            }

          })()}
            </div>
        </div>: <LoginForm onButtonClick={this.hadleLoginClick} setToken={this.setTokenandName} />}
      </div>
    );
  }
}

export default App;
