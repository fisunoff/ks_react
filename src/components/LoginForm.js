import React from 'react';
import CookiesManager from 'js-cookie';

const GET_TOKEN_URL = "http://fisunoff.pythonanywhere.com/api-token-auth/"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.loginRef = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        failedLogin: false
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
        this.tryLogin();
        event.preventDefault();
    }

    tryLogin = async () => {
        const { onButtonClick } = this.props;
        const { setToken } = this.props;
        let username = this.loginRef.value;
        let password = this.passwordRef.value;
        try {
            const result = await fetch(GET_TOKEN_URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            })
            let token_tmp = await result.json();
            if ('token' in token_tmp) {
                setToken(token_tmp.token);
                onButtonClick();
            }
            else {
                this.setState({ failedLogin: true });
            }

        } catch (err) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }

    componentDidMount = async () => {
        let cookie_loginned = CookiesManager.get('isLoginned');
        let cookie_token = CookiesManager.get('token');
        if (cookie_loginned === "true" && cookie_token) {
            const { onButtonClick } = this.props;
            const { setToken } = this.props;
            setToken(cookie_token);
            onButtonClick();
        }
    }

    render() {
        let { failedLogin } = this.state;
        return (
            <form key='loginForm' onSubmit={this.handleSubmit} className="loginWindow">
                <h1>Вход</h1>
                <label>Логин: <input type="text" name="username" size="20" maxLength="50" ref={ref => this.loginRef = ref} /></label>
                <label>Пароль: <input type="password" name="password" size="20" maxLength="50" ref={ref => this.passwordRef = ref} /></label>
                <input type="submit" value="Войти" />
                {failedLogin ? <div className='fail'>Неверный логин или пароль!</div> :
                    <div></div>
                }
            </form>
        )
    }
}

export default LoginForm;