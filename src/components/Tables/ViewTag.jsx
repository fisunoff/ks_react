import React from 'react';

const TAGS_URL = "https://fisunoff.pythonanywhere.com/api/tags/"

class ViewTag extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        create_success: undefined,
        tag: [],
    }

    handleSubmit(event) {
        this.regTag();
        event.preventDefault();
    }

    get_tags = async () => {
        const { token } = this.props;
        const { viewId } = this.props;
        try {
            const res = await fetch(TAGS_URL + viewId + '/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                },
            })
            let tmp_author = await res.json();
            this.setState({ tag: tmp_author });
        } catch (err) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }

    regTag = async () => {
        const { token } = this.props;
        let title = this.titleRef.value;
        let priority = this.priorityRef.value;
        let active_tag = this.isActiveRef.checked;
        const { viewId } = this.props;
        try {
            const result = await fetch(TAGS_URL + viewId + '/', {
                method: "PUT",
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
                this.setState({ create_success: true });
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

    componentDidMount = async () => {
        await this.get_tags();
    }

    render() {
        let { create_success } = this.state;
        let {tag} = this.state;

        return (
            <form onSubmit={this.handleSubmit} key='RecordForm' className='leftmodal'>
                <label>Название: <input type="text" name="tag_title" size="30" maxLength="50" ref={ref => this.titleRef = ref} defaultValue={tag.tag_title}/></label>
                <label>Приоритет: <input type="text" name="priority" size="30" maxLength="100" ref={ref => this.priorityRef = ref} defaultValue={tag.priority}/></label>
                <label>Тэг используется <input type="checkbox" size="20" ref={ref => this.isActiveRef = ref} defaultChecked={
                    tag.active_tag === true ? "True" : undefined
                }/></label>
                
                <input type="submit" className='submit_btn' value="Сохранить" />
                {create_success ? <div><h3 className='success'>Запись изменена!</h3></div> :
                    <div></div>
                }

            </form>
        )
    }
}

export default ViewTag;