import React from 'react';

const buttonArray = [
    {
        text: 'Новый автор',
        icon: ''
    },
    {
        text: 'Новый тег',
        icon: ''
    },
    {
        text: 'Новая запись',
        icon: ''
    },
    {
        text: 'Все записи',
        icon: ''
    }
]

class Navigator extends React.Component{
    render(){
        return (
            <div className='navigator'>
            {buttonArray.map((button) => (
                    <div>
                        <button>{button.text}</button>
                    </div>
                ))}
            </div>
        )        
    }
}

export default Navigator;