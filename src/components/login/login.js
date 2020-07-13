
import React from 'react';
import './login.css'
import LoginForm from './loginform'
import RegisterForm from './registerform'
import { Button, Icon, message } from 'antd'
import Base64 from 'base-64'
import { userRegister } from '@/api'

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'isLogin': true, weChatLogin: false
        }
    }

    setLogin = (e) => {
        e.preventDefault();
        this.setState({ 'isLogin': true })
    }

    setRegister = (e) => {
        e.preventDefault();
        this.setState({ 'isLogin': false })
    }

    setWeChatLogin = (e) => {
        e.preventDefault();
        message.warn("微信登陆功能正在开发，此二维码不可用")
        this.setState({ weChatLogin: true })
    }

    setAccountLogin = (e) => {
        e.preventDefault();
        this.setState({ weChatLogin: false })
    }


    userRegister = () => {
        this.registerFormRef.props.form.validateFields((err, values) => {
            if (!err) {
                const form = this.registerFormRef.props.form.getFieldsValue();
                let params = new URLSearchParams();

                var encodepasswod = Base64.encode(form.password);

                params.append('userName', form.username);
                params.append('userCode', form.account);
                params.append('email', form.email);
                params.append('password', encodepasswod);
                params.append('authCode', form.authcode);

                userRegister(params).then(data => {
                    if (data.code === 0) {
                        message.success("注册成功");
                        this.registerFormRef.props.form.resetFields();
                        this.setState({ 'isLogin': true })
                    } else {
                        if (data.msg) {
                            message.error(data.msg);
                        } else {
                            message.error('注册失败');
                        }

                    }
                })
            }
        });
    }

    login = () => {

  
        this.loginFormRef.props.form.validateFields((err, values) => {
            if (!err) {
                const form = this.loginFormRef.props.form.getFieldsValue();
                var encodepasswod = Base64.encode(form.password);
                if (this.props.login) {
                    this.props.login(form.account, encodepasswod)
                }
                
            }
        });


    }

    render() {

        const { isLogin, weChatLogin } = this.state;

        return (<div className="login">
            {!weChatLogin && <div className="inputLogin">
                <div className="tab-select">
                    <a href="/#" id="tabOne" onClick={this.setLogin} className={`tab-one ${isLogin ? 'active' : ''}`}>帐号登录</a>
                    <a href="/#" id="tabTwo" onClick={this.setRegister} className={`tab-two ${isLogin ? '' : 'active'}`}>账号注册</a>
                </div>
                {isLogin && <div>
                    <div className="loginForm">
                        <LoginForm wrappedComponentRef={(form) => this.loginFormRef = form} />
                    </div>
                    <div className="findBackPassword">忘记秘密?&nbsp;&nbsp;<a href="#/forgetpassword">找回密码</a></div>
                    <div className="loginButton">
                        <Button type="primary" size="large" htmlType="submit" className="login-form-button" onClick={this.login.bind(this)}>登陆</Button>
                    </div>
                </div>}
                {
                    !isLogin && <div className="registorForm">
                        <RegisterForm wrappedComponentRef={(form) => this.registerFormRef = form} />
                        <div className="loginButton">
                            <Button type="primary" size="large" htmlType="submit" className="login-form-button" onClick={this.userRegister}>注册</Button>
                        </div>
                    </div>
                }

            </div>
            }
            {weChatLogin && <div className="wechatLogin">
                <div className="loginTitle">
                    <span>注册登录当时一样雨</span>
                </div>
                <div className="wechatCode">
                    <div className="wx-code">
                        <img src={require('./wcode.jpg')} alt=" " />
                    </div>
                </div>
                <div className="description">
                    <Icon type="wechat" style={{ 'color': '#86ca5e', fontSize: '18px', height: '1.2em', width: '1.2em' }} />&nbsp;&nbsp;微信扫码
                </div>
            </div>}
            <div className="loginType">
                <a href="/#" onClick={this.setWeChatLogin}>微信扫描注册登陆</a>&nbsp;&nbsp;<a href="/#" onClick={this.setAccountLogin}>账号注册登陆</a>
            </div>
        </div>)
    }

}
