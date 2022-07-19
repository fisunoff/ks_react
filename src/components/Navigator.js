import React from 'react';

const buttonArray = [
    {
        text: 'Новый автор',
        icon: '',
        title: 'newauthor'
    },
    {
        text: 'Новая запись',
        icon: '',
        title: 'newrecord'
    },
    {
        text: 'Новый тэг',
        icon: '',
        title: 'newtag'
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
                        <button className='nav-button' onClick={changeWindow.bind(this, button.title)}>{button.text}</button>
                    </div>
                ))}
            </div>
        )        
    }
}

export default Navigator;