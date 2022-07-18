import React from 'react';

class Header extends React.Component{
    handleClick = () => {
        const {onButtonClick} = this.props;
        onButtonClick();
    }

    render(){
        

        return <div className='header'>
            Тут будет имя
            <button onClick={this.handleClick } className='escapeBtn'>Выйти</button>
        </div>
    }
}

export default Header;