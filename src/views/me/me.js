import React from 'react'
import './me.css'
import Nav from 'components/nav/nav';
import { Button, Modal, message, Icon, Upload } from 'antd'
import { updateUserName, updatePassword, updateEmail, getUserInfoByUserCode, uploadFile, updateImage } from '@/api'
import UserInfoUpdateForm from './userinfoupdateform';
import Base64 from 'base-64'
import _ from 'lodash'
import Header from 'views/header/header.js'

export default class Me extends React.Component {


    componentWillMount() {
        document.title = "我的信息-当时一样雨";

        var banbanbloguser = localStorage.getItem('banbanbloguser');
        if (banbanbloguser) {
            this.setState({ 'blogUser': JSON.parse(banbanbloguser) });
        } else {
            window.location = "#/login";
            return;
        }
        this.getUserInfoByUserCode(JSON.parse(banbanbloguser));
    }


    constructor(props) {
        super(props)
        this.state = {
            'type': 1, imageUrl: null,
            blogUser: { email: '', id: 0, password: '', register_time: '', type: 1, user_code: '', user_name: '', image: null }
        }
    }

    select = (type) => {
        this.setState({ type })
    }

    componentWillUnmount() {
        if (this._interval) {
            clearInterval(this._interval);
        }
    }

    getUserInfoByUserCode(blogUser1 = null) {
        if (!blogUser1) {
            let { blogUser } = this.state;
            blogUser1 = blogUser;
        }

        let params = new URLSearchParams();
        params.append('usercode', blogUser1.user_code)

        getUserInfoByUserCode(params).then(data => {
            if (data.code === 0) {
                this.setState({ blogUser: data.data });
            }
        });
    }




    update = () => {

        const { type, blogUser } = this.state;

        if (type === 2) {
            let _this = this;
            this.type2Form.props.form.validateFields((err, values) => {
                if (!err) {
                    Modal.confirm({
                        title: '确认修改?',
                        content: '',
                        onOk() {
                            return new Promise((resolve, reject) => {

                                const username = values.username;
                                const usercode = blogUser.user_code;
                                let params = new URLSearchParams();
                                params.append('username', username);
                                params.append('usercode', usercode);
                                updateUserName(params).then(data => {
                                    if (data.code === 0) {
                                        message.success('修改用户名成功')
                                        _this.getUserInfoByUserCode();
                                    } else {
                                        message.error(data.msg)
                                    }
                                })

                                resolve();

                            }).catch(() => console.log('Oops errors!'));
                        },
                        onCancel() {

                        },
                    });
                }
            });
        } else if (type === 3) {
            let _this = this;
            this.type3Form.props.form.validateFields((err, values) => {
                if (!err) {
                    Modal.confirm({
                        title: '确认修改?',
                        content: '',
                        onOk() {
                            return new Promise((resolve, reject) => {


                                const usercode = blogUser.user_code;
                                const oldpassword = values.oldpassword;
                                const newpassword = values.newpassword;

                                let params = new URLSearchParams();
                                params.append('oldpassword', Base64.encode(oldpassword))
                                params.append('newpassword', Base64.encode(newpassword))
                                params.append('usercode', usercode);

                                updatePassword(params).then(data => {
                                    if (data.code === 0) {
                                        message.success('修改密码成功')
                                        _this.getUserInfoByUserCode();
                                    } else {
                                        message.error(data.msg)
                                    }
                                })

                                resolve();

                            }).catch(() => console.log('Oops errors!'));
                        }, onCancel() {

                        }


                    });
                }
            });
        } else if (type === 4) {
            let _this = this;
            this.type4Form.props.form.validateFields((err, values) => {
                if (!err) {
                    Modal.confirm({
                        title: '确认修改?',
                        content: '',
                        onOk() {
                            return new Promise((resolve, reject) => {


                                const email = values.email;
                                const authcode = values.authcode;
                                const usercode = blogUser.user_code;

                                let params = new URLSearchParams();
                                params.append('authcode', authcode);
                                params.append('email', email);
                                params.append('usercode', usercode);

                                updateEmail(params).then(data => {
                                    if (data.code === 0) {
                                        message.success('修改邮箱成功')
                                        _this.getUserInfoByUserCode();
                                    } else {
                                        message.error(data.msg)
                                    }
                                })

                                resolve();

                            }).catch(() => console.log('Oops errors!'));
                        },
                        onCancel() {

                        },
                    });
                }
            });
        } else if (type === 5) {
            //更新照片
            let _this = this;
            const { imageUrl, blogUser } = this.state;

            if (!imageUrl) {
                message.error("请选择图片");
                return;
            }

            Modal.confirm({
                title: '确认修改?',
                content: '',
                onOk() {
                    return new Promise((resolve, reject) => {

                        let params = new URLSearchParams();
                        params.append('usercode', blogUser.user_code)
                        params.append('image', imageUrl)
                        updateImage(params).then(data => {
                            if (data.code === 0) {
                                message.success('修改图片成功');
                                var newblogUser = _.cloneDeep(blogUser);
                                newblogUser.image = imageUrl;
                                localStorage.setItem('blogUser', JSON.stringify(blogUser));
                                _this.setState({ 'blogUser': newblogUser, 'imageUrl': null })
                            } else {
                                message.error(data.msg);
                            }
                        })

                        resolve();

                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {

                },
            });
        } else {

        }
    }

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('你只能上传 JPG/PNG 类型文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('文件大小必须小于2MB!');
        }
        return isJpgOrPng && isLt2M;
    }


    customRequest = (option) => {

        const param = new FormData();
        param.append('files', option.file);
        uploadFile(param).then(data => {

            if (data.errno === 0) {
                this.setState({ imageUrl: data.data[0] })
            } else {
                message.error("上传文件出错")
            }

        });

    }



    render() {

        const { type, blogUser, imageUrl } = this.state;

        const uploadButton = (
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">点击上传</div>
            </div>
        );

        return (<div>
             <Header>
            </Header>
            <Nav currentId={-10}></Nav>
            <div className="userInfo" style={{ minHeight: 'calc(100vh - 250px)' }}>
                <div className="meLeft">
                    <ul>
                        <li title="我的信息" onClick={this.select.bind(this, 1)}>我的信息</li>
                        <li title="修改信息" onClick={this.select.bind(this, 2)}>修改信息</li>
                        <li title="修改密码" onClick={this.select.bind(this, 3)}>修改密码</li>
                        <li title="修改邮箱" onClick={this.select.bind(this, 4)}>修改邮箱</li>
                        <li title="修改头像" onClick={this.select.bind(this, 5)}>修改头像</li>
                    </ul>
                </div>

                <div className="meRight">

                    {
                        type === 1 && <div className="showInfo">
                            <table>
                                <tbody>
                                    <tr className="">
                                        <td>头像</td>
                                        <td>{blogUser.image ? <img src={blogUser.image} alt="头像" /> : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>用户名</td>
                                        <td>{blogUser.user_name}</td>
                                    </tr>
                                    <tr>
                                        <td>账号</td>
                                        <td>{blogUser.user_code}</td>
                                    </tr>
                                    <tr>
                                        <td>邮箱</td>
                                        <td>{blogUser.email}</td>
                                    </tr>
                                    <tr>
                                        <td>注册时间</td>
                                        <td>{blogUser.register_time}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    }
                    <div className="inputForm">
                        {
                            type === 2 && <UserInfoUpdateForm type={type} wrappedComponentRef={(form) => this.type2Form = form} blogUser={blogUser} />
                        }
                        {
                            type === 3 && <UserInfoUpdateForm type={type} wrappedComponentRef={(form) => this.type3Form = form} blogUser={blogUser} />

                        }
                        {
                            type === 4 && <UserInfoUpdateForm type={type} wrappedComponentRef={(form) => this.type4Form = form} blogUser={blogUser} />
                        }
                        {
                            type === 5 && <div className="image">
                                <table>
                                    <tbody>
                                        <tr >
                                            <td>当前头像</td>
                                            <td className="showimg">{blogUser.image ? <img src={blogUser.image} alt="头像" title="头像" /> : ''}</td>
                                        </tr>
                                        <tr>
                                            <td>新头像</td>
                                            <td className="showimg"><Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                beforeUpload={this.beforeUpload}
                                                customRequest={this.customRequest}
                                            >
                                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                            </Upload></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                    <div className="updateBtn">{type !== 1 &&
                        <Button type="primary" size="large" onClick={this.update}>修改</Button>
                    }
                    </div>
                </div>

            </div>

        </div>)
    }

}


