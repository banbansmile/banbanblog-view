import React from 'react'
import Nav from 'components/nav/nav';
import ForgetPasswordForm from './forgetpasswordform'
import './me.css'
import { Button, message } from 'antd'
import Base64 from 'base-64'
import { findBackPassword } from '@/api'
import Header from 'views/header/header.js'

export default class ForgetPassword extends React.Component {



    componentWillMount() {
        document.title = "找回密码-当时一样雨";
    }

    findBackPassword = () => {
        this.form.props.form.validateFields((err, values) => {
            if (!err) {
                var email = values.email;
                var password = Base64.encode(values.password);
                var authcode = values.authcode;

                let params = new URLSearchParams();
                params.append('email', email)
                params.append('password', password)
                params.append('authcode', authcode)

                findBackPassword(params).then(data => {
                    if (data.code === 0) {
                        message.success(data.msg);
                    } else {
                        message.error(data.msg);
                    }
                })
            }
        });
    }

    render() {
        return (<div className="forget" style={{ minHeight: 'calc(100vh)' }}>
            <Header>
            </Header>
            <Nav currentId={-10}></Nav>
            <div className="forgetPassword" style={{ minHeight: '100%' }}>
                <ForgetPasswordForm wrappedComponentRef={(form) => this.form = form} />
            </div>
            <div className="subButton">
                <Button type="primary" size="large" onClick={this.findBackPassword}>找回密码</Button>
            </div>
        </div>)
    }
}


