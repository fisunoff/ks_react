import React from 'react';

const TAGS_URL = "https://fisunoff.pythonanywhere.com/api/tags/"

class NewTag extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        create_success: undefined,
    }

    handleSubmit(event) {
        this.regTag();
        event.preventDefault();
    }

    regTag = async () => {
        const { token } = this.props;
        let title = this.titleRef.value;
        let priority = this.priorityRef.value;
        let active_tag = this.isActiveRef.checked;
        try {
            const result = await fetch(TAGS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                },
                body: JSON.stringify({
                    'tag_title': title,
                    'priority': priority,
                    'active_tag': active_tag
                })
            })
            let tmp = await result.json();
            if ('id' in tmp) {
                this.setState({ create_success: true })
                this.props.update();
            }
            else {
                console.log(tmp);
                this.setState({ create_success: false })
            }

        } catch (err) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }


    render() {
        let { create_success } = this.state;
        return (
            <form onSubmit={this.handleSubmit} key='newTagForm' className='leftmodal'>
                <label>Название: <input type="text" name="tag_title" size="30" maxLength="50" ref={ref => this.titleRef = ref} /></label>
                <label>Приоритет: <input type="text" name="priority" size="30" maxLength="100" ref={ref => this.priorityRef = ref} /></label>
                <label>Тэг используется <input type="checkbox" size="20" ref={ref => this.isActiveRef = ref} /></label>

                <input type="submit" className='submit_btn' value="Создать" />
                {create_success ? <div><h3 className='success'>Тэг добавлен!</h3></div> :
                    <div></div>
                }

            </form>
        )
    }
}

export default NewTag;