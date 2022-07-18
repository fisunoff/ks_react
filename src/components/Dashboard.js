import React from 'react';

class Dashboard extends React.Component{
    handleClick = () => {
        const {hadleLoginClick} = this.props;
        hadleLoginClick(false);
    }

    render(){
        

        return <div className='dashboard'>
            Dashboard
            <button onClick={this.handleClick}>Выйти</button>
        </div>
    }
}

export default Dashboard;