import React from 'react';

const RECORDS_URL = "https://fisunoff.pythonanywhere.com/api/record/"
const AUTHORS_URL = "https://fisunoff.pythonanywhere.com/api/author/"
const TAGS_URL = "https://fisunoff.pythonanywhere.com/api/tags/"

class NewRecord extends React.Component {
    state = {
        create_success: undefined,
        authors: [],
        tags: [],
    }

    get_authors = async () => {
        const { token } = this.props;
        try {
            const res = await fetch(AUTHORS_URL, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                },
            })
            let tmp_authors = await res.json();
            this.setState({ authors: tmp_authors });
        } catch (err) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }

    get_tags = async () => {
        const { token } = this.props;
        try {
            const res = await fetch(TAGS_URL, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                },
            })
            let tmp = await res.json();
            this.setState({ tags: tmp });
        } catch (err) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }

    regRecord = async () => {
        const { token } = this.props;
        let title = this.titleRef.value;
        let text = this.textRef.value;
        let author = this.authorRef.value;
        let tag = this.tagRef.value;
        let status = this.statusRef.value;
        try {
            const result = await fetch(RECORDS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                },
                body: JSON.stringify({
                    'title': title,
                    'text': text,
                    'author': author,
                    'tag': tag,
                    'status': status
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

    componentDidMount = async () => {
        await this.get_authors();
        await this.get_tags();
    }

    render() {
        let { create_success } = this.state;

        return (
            <div className='leftmodal'>
                <div key="modal_new_title">Название: <input type="text" name="title" size="50" maxLength="50" ref={ref => this.titleRef = ref} /></div>
                <div key="modal_new_text">Текст записи: <textarea type="text" name="text" size="80" maxLength="1000" ref={ref => this.textRef = ref} /></div>
                <div key="modal_new_author"> Автор:
                    <select ref={ref => this.authorRef = ref}>
                        {this.state.authors.map((data) => (
                            <option value={data.id}>{data.name}</option>
                        ))}
                    </select>
                </div>
                <div key="modal_new_tag"> Тэг:
                    <select ref={ref => this.tagRef = ref}>
                        {this.state.tags.map((data) => (
                            <option value={data.id}>{data.tag_title}</option>
                        ))}
                    </select>
                </div>
                <div key="modal_new_status">Статус: <input type="text" name="status" size="50" maxLength="50" ref={ref => this.statusRef = ref} defaultValue="Новый" /></div>

                <button key="modal_new_create" onClick={this.regRecord}>Создать</button>
                {create_success ? <div key="modal_new_success"><h3 className='success'>Запись добавлена!</h3></div> :
                    <></>
                }

            </div>
        )
    }
}

export default NewRecord;