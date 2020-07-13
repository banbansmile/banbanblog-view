
import React from 'react';
import './login.css'
import { Form, Input, Button, message } from 'antd';
import { sendEmail } from '@/api'


class RegisterForm extends React.Component {

    formItemLayout = {
        labelCol: {
            xs: { span: 6 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 16 },
            sm: { span: 18, offset: 1 },
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            'sendEmailText': '发送验证码', remainSeconds: 10
        }
    }

    sendEmail = () => {
        //10秒倒计时



        this.props.form.validateFields(['email'], (err, values) => {

            if (!err) {


                if (this._interval) {
                    return;
                }

                //发送邮件
                let params = new URLSearchParams()
                params.append('email', values.email)
                sendEmail(params).then(data => {
                    if (data.code === 0) {

                        message.success(data.msg);
                        this._interval = setInterval(() => {

                            let { remainSeconds } = this.state
                            if (remainSeconds > 1) {
                                let text = '剩余' + (remainSeconds - 1) + '秒'
                                this.setState((prevState) => ({ 'sendEmailText': text, remainSeconds: remainSeconds - 1 }))
                            } else {
                                if (this._interval) {
                                    clearInterval(this._interval);
                                    this._interval = null;
                                }
                                this.setState({ 'sendEmailText': '发送验证码', remainSeconds: 10 })
                            }

                        }, 1000)
                    } else {
                        message.error(data.msg)
                    }
                })


            }




        });



    }

    componentWillUnmount() {
        if (this._interval) {
            clearInterval(this._interval);
        }
    }


    render() {

        const { sendEmailText, remainSeconds } = this.state;

        const { getFieldDecorator } = this.props.form;
        return (<Form {...this.formItemLayout} className="antLogin">
            <Form.Item label="用户名" >
                {getFieldDecorator('username', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            message: '用户名大于2位小于10位且不包含空格',
                            max: 10,
                            min: 2,
                            pattern: '^[^ ]+$',
                            whitespace: true
                        },
                    ],
                })(<Input placeholder="请填写" autoComplete="off" size="large" />)}
            </Form.Item>
            <Form.Item label="账号" >
                {getFieldDecorator('account', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            message: '账号大于3位小于10位且不包含空格',
                            max: 10,
                            min: 3,
                            pattern: '^[^ ]+$',
                            whitespace: true
                        },
                    ],
                })(<Input placeholder="请填写" autoComplete="off" size="large" />)}
            </Form.Item>
            <Form.Item label="邮箱" >
                {getFieldDecorator('email', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            max:30,
                            message: '请输入正确的邮箱地址',
                            type: 'email'
                        }
                    ],
                })(<Input placeholder="请填写" autoComplete="off" size="large" addonAfter={<Button type='link' disabled={remainSeconds >= 10 ? false : true} style={{ userSelect: 'none' }} onClick={this.sendEmail}>{sendEmailText}</Button>} />)}
            </Form.Item>
            <Form.Item label="密码" >
                {getFieldDecorator('password', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            message: '密码大于5位小于10位不包含空格',
                            max: 10,
                            min: 5,
                            pattern: '^[^ ]+$',
                            whitespace: true
                        },
                    ],
                })(<Input.Password placeholder="请填写" autoComplete="off" size="large" />)}
            </Form.Item>
            <Form.Item label="验证码" >
                {getFieldDecorator('authcode', {
                    initialValue: '',
                    rules: [
                        {
                            pattern: '^[^ ]+$',
                            len:6,
                            required: true,
                            message: '请输入邮箱接收到的6位数验证码',
                        },
                    ],
                })(<Input placeholder="请填写" autoComplete="off" size="large" />)}
            </Form.Item>
        </Form>)
    }
}

export default Form.create({})(RegisterForm);