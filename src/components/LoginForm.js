import React from 'react';

const GET_TOKEN_URL = "http://fisunoff.pythonanywhere.com/api-token-auth/"

class LoginForm extends React.Component{
    constructor(props) {
    super(props);
    this.loginRef = null;
    this.passwordRef = null;
  }

    tryLogin = async () => {
        const {onButtonClick} = this.props;
        let username = this.loginRef.value;
        let password = this.passwordRef.value;
        try{
            const result = await fetch(GET_TOKEN_URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            })
            let token_tmp = await result.json();
            if ('token' in token_tmp){
                onButtonClick();
            }
            else{
                <div>Неверный логин или пароль</div>
            }

        }catch (err){
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }


    render(){
        return (
            <div>
                <div>Вход</div>
                <div>Логин: <input type="text" name="username" size="20" maxLength="50" ref={ref => this.loginRef = ref} /></div>
                <div>Пароль: <input type="password" name="password" size="20" maxLength="50" ref={ref => this.passwordRef = ref} /></div>
                <button onClick={this.tryLogin}>Войти</button>
            </div>
        )
    }
}

export default LoginForm;