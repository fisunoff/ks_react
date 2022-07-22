import React from 'react';

const AUTHORS_URL = "https://fisunoff.pythonanywhere.com/api/author/"

class ViewAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        create_success: undefined,
        author: [],
    }

    handleSubmit(event) {
        this.regAuthor();
        event.preventDefault();
    }

    get_authors = async () => {
        const { token } = this.props;
        const { viewId } = this.props;
        try {
            const res = await fetch(AUTHORS_URL + viewId + '/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                },
            })
            let tmp_author = await res.json();
            this.setState({ author: tmp_author });
        } catch (err) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }

    regAuthor = async () => {
        const { token } = this.props;
        const { viewId } = this.props;
        let name = this.nameRef.value;
        let department = this.departmentRef.value;
        let is_active = this.isactiveRef.checked;
        try {
            const result = await fetch(AUTHORS_URL + viewId + '/', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                },
                body: JSON.stringify({
                    'name': name,
                    'department': department,
                    'is_active': is_active
                })
            })
            let tmp = await result.json();
            debugger;
            if ('id' in tmp) {
                this.setState({ create_success: true })
                this.props.update()
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
        await this.get_authors();
    }

    render() {
        let { create_success } = this.state;
        let {author} = this.state;

        return (
            <form onSubmit={this.handleSubmit} key='RecordForm' className='leftmodal'>
                <label>Имя: <input type="text" name="name" size="30" maxLength="50" ref={ref => this.nameRef = ref} defaultValue={author.name} /></label>
                <label>Подразделение: <input type="text" name="department" size="30" maxLength="100" ref={ref => this.departmentRef = ref} defaultValue={author.department}/></label>
                <label>Действующий сотрудник <input type="checkbox" size="20" ref={ref => this.isactiveRef = ref} defaultChecked={
                    author.is_active === true ? "True" : undefined
                }/></label>
                <input type="submit" className='submit_btn' value="Сохранить" />
                {create_success ? <div><h3 className='success'>Запись изменена!</h3></div> :
                    <div></div>
                }

            </form>
        )
    }
}

export default ViewAuthor;