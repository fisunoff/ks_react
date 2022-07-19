import React from 'react';

const TAGS_URL = "https://fisunoff.pythonanywhere.com/api/tags/"

class NewTag extends React.Component{
    state = {
        create_success: undefined,
    }

    regAuthor = async () => {
        const {token} = this.props;
        let title = this.titleRef.value;
        let priority = this.priorityRef.value;
        let active_tag = this.isActiveRef.value;
        try{
            const result = await fetch(TAGS_URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json',
                'Authorization': 'Token ' + token },
                body: JSON.stringify({
                    'tag_title': title,
                    'priority': priority,
                    'active_tag': active_tag
                })
            })
            let tmp = await result.json();
            if ('id' in tmp){
                this.setState({create_success: true})
            }
            else{
                console.log(tmp);
                this.setState({create_success: false})
            }

        }catch (err){
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }


    render(){
        let {create_success} = this.state;
        return (
            <div className='leftmodal'>
                <div><h1>Новый автор</h1></div>
                <div>Название: <input type="text" name="tag_title" size="30" maxLength="50" ref={ref => this.titleRef = ref} /></div>
                <div>Приоритет: <input type="text" name="priority" size="30" maxLength="100" ref={ref => this.priorityRef = ref} /></div>
                <div>Тэг используется <input type="checkbox" size="20" ref={ref => this.isActiveRef = ref}/></div>
                
                <button onClick={this.regAuthor}>Создать</button>
                {create_success? <div><h3 className='success'>Тэг добавлен!</h3></div>:
                    <div></div>
                }
                
            </div>
        )
    }
}

export default NewTag;