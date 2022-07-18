import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm'
import Navigator from './components/Navigator'
import Records from './components/Tables/Records';
import Header from './components/header';

class App extends React.Component {
  state = {
    isUnloginned: false,
    token: undefined
  }

  hadleLoginClick = () => {
    if (this.state.isUnloginned === false){
      this.setState({isUnloginned: true})
    }
    else{
      this.setState({isUnloginned: false})
    }
  }

  setToken = (s_token) => {
    this.setState({token: s_token})
  }

  render() {
    return (
      <div>
        {this.state.isUnloginned? <div >
          <div><Header onButtonClick={this.hadleLoginClick} /></div>
          <div className='MainScreen'>
            <Navigator />
            <Records token = {this.state.token} />
            </div>
        </div>: <LoginForm onButtonClick={this.hadleLoginClick} setToken={this.setToken} />}
      </div>
    );
  }
}

export default App;
