
import React from 'react';
import './me.css'
import { Form, Input, Button, message } from 'antd';
import { sendEmail } from '@/api'


class UserInfoUpdateForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            sendEmailText: '发送验证码', remainSeconds: 10
        }
    }

    formItemLayout = {
        labelCol: {
            xs: { span: 6 },
            sm: { span: 4, offset: 3 },
        },
        wrapperCol: {
            xs: { span: 16 },
            sm: { span: 12, offset: 1 },
        },
    };


    static defaultProps = {
        type: 0,
        blogUser: { email: '', id: 0, password: '', register_time: '', type: 1, user_code: '', user_name: '' }
    }

    sendEmail = () => {

        //10秒倒计时

        if (this._interval) {
            return;
        }

        this.props.form.validateFields(['email'], (err, values) => {

            if (!err) {

                const { blogUser } = this.props;
                //发送邮件
                let params = new URLSearchParams()
                params.append('email', values.email)
                params.append('usercode', blogUser.user_code)
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


    render() {

        const { type, blogUser } = this.props;
        const { sendEmailText, remainSeconds } = this.state;
        const { getFieldDecorator } = this.props.form;

        return <Form {...this.formItemLayout}>
            {type === 2 && <Form.Item label="用户名" >
                {getFieldDecorator('username', {
                    initialValue: blogUser.user_name,
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
            }
            {type === 3 && <Form.Item label="旧密码" >
                {getFieldDecorator('oldpassword', {
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
                })(<Input placeholder="请填写" autoComplete="off" size="large" />)}
            </Form.Item>
            }
            {type === 3 && <Form.Item label="新密码" >
                {getFieldDecorator('newpassword', {
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
                })(<Input placeholder="请填写" autoComplete="off" size="large" />)}
            </Form.Item>
            }
            {type === 4 && <Form.Item label="新邮箱" >
                {getFieldDecorator('email', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            max: 20,
                            message: '请输入正确的新邮箱地址',
                            type: 'email'
                        },
                    ],
                })(<Input placeholder="请输入新邮箱" size="large" addonAfter={<Button type='link' disabled={remainSeconds >= 10 ? false : true} style={{ userSelect: 'none' }} onClick={this.sendEmail}>{sendEmailText}</Button>} />)}
            </Form.Item>
            }
            {type === 4 && <Form.Item label="验证码" >
                {getFieldDecorator('authcode', {
                    initialValue: '',
                    rules: [
                        {
                            pattern: '^[^ ]+$',
                            len: 6,
                            required: true,
                            message: '请输入邮箱接受到的6位数验证码',
                        },
                    ],
                })(<Input placeholder="请填写" autoComplete="off" size="large" />)}
            </Form.Item>
            }
        </Form>
    }
}

export default Form.create({})(UserInfoUpdateForm);