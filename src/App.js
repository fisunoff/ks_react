import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm'
import Navigator from './components/Navigator'
import Records from './components/Tables/Records';
import Header from './components/header';

class App extends React.Component {
  state = {
    isUnloginned: false,
    token: undefined,
    name: undefined
  }

  hadleLoginClick = () => {
    if (this.state.isUnloginned === false){
      this.setState({isUnloginned: true})
    }
    else{
      this.setState({isUnloginned: false})
    }
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
            <Navigator />
            <Records token = {this.state.token} />
            </div>
        </div>: <LoginForm onButtonClick={this.hadleLoginClick} setToken={this.setTokenandName} />}
      </div>
    );
  }
}

export default App;
