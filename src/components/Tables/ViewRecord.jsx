import React from 'react';

const RECORDS_URL = "https://fisunoff.pythonanywhere.com/api/record/"
const AUTHORS_URL = "https://fisunoff.pythonanywhere.com/api/author/"
const TAGS_URL = "https://fisunoff.pythonanywhere.com/api/tags/"

class ViewRecord extends React.Component {
    state = {
        create_success: undefined,
        authors: [],
        tags: [],
        record_data: []
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

    get_record_data = async () => {
        const { token } = this.props;
        const { viewId } = this.props;
        try {
            const res = await fetch(RECORDS_URL + viewId + "/", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                },
            })
            let tmp = await res.json();
            this.setState({ record_data: tmp });
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
        await this.get_record_data();
    }

    render() {
        let { create_success } = this.state;
        let { record_data } = this.state;

        return (
            <div className='leftmodal'>
                <div><h1>Просмотр и изменение записи</h1></div>
                <div>Название: <input type="text" name="title" size="50" maxLength="50" ref={ref => this.titleRef = ref} defaultValue={record_data.title} /></div>
                <div>Текст записи: <textarea type="text" name="text" size="80" maxLength="1000" ref={ref => this.textRef = ref} defaultValue={record_data.text} /></div>
                <div> Автор:
                    <select ref={ref => this.authorRef = ref}>
                        {this.state.authors.map((data) => (
                            <option value={data.id} selected={data.id === record_data.author}>{data.name}</option>
                        ))}
                    </select>
                </div>
                <div> Тэг:
                    <select ref={ref => this.tagRef = ref}>
                        {this.state.tags.map((data) => (
                            <option value={data.id} selected={data.id === record_data.tag}>{data.tag_title}</option>
                        ))}
                    </select>
                </div>
                <div>Статус: <input type="text" name="status" size="50" maxLength="50" ref={ref => this.statusRef = ref} defaultValue={record_data.status} /></div>

                <button onClick={this.regRecord}>Сохранить изменения</button>
                {create_success ? <div><h3 className='success'>Запись изменена!</h3></div> :
                    <div></div>
                }

            </div>
        )
    }
}

export default ViewRecord;