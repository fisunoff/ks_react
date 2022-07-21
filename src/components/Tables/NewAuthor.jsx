import React from 'react';

const AUTHORS_URL = "https://fisunoff.pythonanywhere.com/api/author/"

class NewAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        create_success: undefined,
    }

    handleSubmit(event) {
        this.regAuthor();
        event.preventDefault();
    }

    regAuthor = async () => {
        const { token } = this.props;
        let name = this.nameRef.value;
        let department = this.departmentRef.value;
        let is_active = this.isactiveRef.value;
        try {
            const result = await fetch(AUTHORS_URL, {
                method: "POST",
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
            if ('id' in tmp) {
                this.setState({ create_success: true })
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
            <form key='newAuthorForm' onSubmit={this.handleSubmit} className='leftmodal'>
                <label>Имя: <input type="text" name="name" size="30" maxLength="50" ref={ref => this.nameRef = ref} /></label>
                <label>Подразделение: <input type="text" name="department" size="30" maxLength="100" ref={ref => this.departmentRef = ref} /></label>
                <label>Действующий сотрудник <input type="checkbox" size="20" ref={ref => this.isactiveRef = ref} /></label>
                <input type="submit" className='submit_btn' value="Создать" />
                {create_success ? <div><h3 className='success'>Автор добавлен!</h3></div> :
                    <div></div>
                }
            </form>
        )
    }
}

export default NewAuthor;