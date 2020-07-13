import React from 'react'
import './me.css'
import Nav from 'components/nav/nav';
import Login from 'components/login/login'
import { userLogin } from '@/api'
import { message } from 'antd';
import Header from 'views/header/header.js'


export default class LoginPage extends React.Component {

    componentWillMount() {
        document.title = '登陆-当时一样雨'
    }

    login = (account, password) => {

        let parmas = new URLSearchParams();
        parmas.append('account', account);
        parmas.append('password', password)

        userLogin(parmas).then(data => {
            if (data.code === 0) {
                const { history } = this.props;
                localStorage.setItem('banbanbloguser', JSON.stringify(data.data.blogUser))
                localStorage.setItem('banbanblogtoken', data.data.token)
                history.push('/me')
            } else {
                message.error(data.msg);
            }
        });
    }

    render() {
        return (
            <div className="login" style={{ minHeight: 'calc(100vh + 100px)' }}>
                <Header>
                </Header>
                <Nav currentId={-10}></Nav>
                <div className="loginInfo">
                    <Login login={this.login} />
                </div>
            </div>)
    }
}
