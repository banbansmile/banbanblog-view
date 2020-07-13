
import React from 'react';
import './login.css'
import { Form, Input} from 'antd';


class LoginForm extends React.Component {

    formItemLayout = {
        labelCol: {
            xs: { span: 6 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 16 },
            sm: { span: 20 },
        },
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (<Form {...this.formItemLayout} className="antLogin">
            <Form.Item label="账号" >
                {getFieldDecorator('account', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            message: '账号大于3位小于10位且不包含空格',
                            max:10,
                            min:3,
                            pattern:'^[^ ]+$',
                            whitespace:true
                        },
                    ],
                })(<Input placeholder="请填写" autoComplete="off" size="large" />)}
            </Form.Item>
            <Form.Item label="密码" >
                {getFieldDecorator('password', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            message: '密码大于5位小于10位不包含空格',
                            max:10,
                            min:5,
                            pattern:'^[^ ]+$',
                            whitespace:true
                        },
                    ],
                })(<Input.Password placeholder="请填写" autoComplete="off" size="large" />)}
            </Form.Item>
        </Form>)
    }
}

export default Form.create({})(LoginForm);