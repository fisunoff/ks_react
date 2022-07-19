import React from 'react';

class Header extends React.Component{
    handleClick = () => {
        const {onButtonClick} = this.props;
        onButtonClick();
    }

    render(){
        

        return<div className='App-header'>
            <div className='header'>
                {this.props.name}
            </div>
            <div className='escapeBtn'><button onClick={this.handleClick } className='escapeBtn' >Выйти</button></div>
            
        </div> 
    }
}

export default Header;