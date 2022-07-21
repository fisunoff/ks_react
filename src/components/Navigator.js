import React from 'react';

const buttonArray = [
    {
        text: 'Новый автор',
        icon: '',
        title: 'newauthor'
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
                    <div key={button.title + 'div'}>
                        <button className='nav-button' key={button.title} onClick={changeWindow.bind(this, button.title)}>{button.text}</button>
                    </div>
                ))}
            </div>
        )        
    }
}

export default Navigator;