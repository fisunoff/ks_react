import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm'
import Navigator from './components/Navigator'
import Records from './components/Tables/Records';
import Header from './components/header';

class App extends React.Component {
  state = {
    isUnloginned: false
  }

  hadleLoginClick = () => {
    if (this.state.isUnloginned === false){
      this.setState({isUnloginned: true})
    }
    else{
      this.setState({isUnloginned: false})
    }
  }

  render() {
    return (
      <div>
        {this.state.isUnloginned? <div >
          <div><Header onButtonClick={this.hadleLoginClick} /></div>
          <div className='MainScreen'>
            <Navigator />
            <Records />
            </div>
        </div>: <LoginForm onButtonClick={this.hadleLoginClick} />}
      </div>
    );
  }
}

export default App;
