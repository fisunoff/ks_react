import React from 'react';
import Records from './Tables/Records';
import Authors from './Tables/Authors';

const buttonArray = [
    {
        text: 'Новый автор',
        icon: '',
        title: 'newauthor'
    },
    {
        text: 'Все теги',
        icon: '',
        title: 'tags'
    },
    {
        text: 'Все авторы',
        icon: '',
        title: 'authors'

    },
    {
        text: 'Все записи',
        icon: '',
        title: 'records'
    }
]

class Navigator extends React.Component{
    render(){
        const {changeWindow} = this.props;
        return (
            <div className='navigator'>
            {buttonArray.map((button) => (
                    <div>
                        <button role="button" className='nav-button' onClick={changeWindow.bind(this, button.title)}>{button.text}</button>
                    </div>
                ))}
            </div>
        )        
    }
}

export default Navigator;