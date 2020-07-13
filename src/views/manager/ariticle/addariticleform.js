import React from 'react';
import '../style.css'
import { Form, Upload, Icon, message, Input, Select, Modal } from 'antd'
import { uploadFile, getAriticleTypeList, getTagList } from '@/api'



const { Option } = Select;

class AddAriticleForm extends React.Component {

    state = {
        loading: false,
        typeList: [],
        editorContent: '',
        tagList: [],
        fileList: [],
        previewVisible: false
    };


    formItemLayout = {
        labelCol: {
            xs: { span: 12 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 12 },
            sm: { span: 12 },
        },
    };

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

                var pos = data.data[0].lastIndexOf("/");
                if (pos === -1) {
                    pos = data.data[0].lastIndexOf("\\")
                }
                var filename = data.data[0].substr(pos + 1);

                let fileList = [
                    {
                        uid: '-1',
                        name: filename,
                        status: 'done',
                        url: data.data[0],
                    }]
                this.setState({ fileList });
            } else {
                message.error("上传文件出错")
            }

        });

    }

    componentWillMount() {
        getAriticleTypeList().then(data => {
            if (data.code === 0) {
                var typeList = [];
                data.data.forEach(ariticleType => {
                    typeList.push(<Option key={ariticleType.id}>{ariticleType.type_name}</Option>);
                })
                this.setState({ typeList });

            }
        });


        getTagList().then(data => {
            if (data.code === 0) {
                var tagList = [];

                data.data.forEach(tag => {
                    tagList.push(<Option key={tag.id}>{tag.tag_name}</Option>);
                });

                this.setState({ tagList });

            }
        });



    }

    handleChange = ({ fileList }) => {
        if (fileList.length > 0 && (fileList[0].status === "image/jpeg" || fileList[0].status === "image/png")) {
            this.setState({ fileList });
        } else {
            this.setState({ fileList: [] });
        }
    }


    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { typeList, tagList, fileList, previewVisible, previewImage } = this.state;


        return (<div><Form {...this.formItemLayout}>
            <Form.Item label="标题" >
                {getFieldDecorator('title', {
                    initialValue: this.props.title ? this.props.title : '',
                    rules: [
                        {
                            required: true,
                            message: '请输入标题',
                        },
                    ],
                })(<Input placeholder="请填写" allowClear autoComplete="off" size="default" />)}
            </Form.Item>
            <Form.Item label="文章类型" >
                {getFieldDecorator('type_id', {
                    rules: [
                        {
                            required: true,
                            message: '请选择文章类型',
                        },
                    ],
                })(<Select>
                    {typeList}
                </Select>)}
            </Form.Item>

            {/* <Form.Item label="描述" >
                {getFieldDecorator('description', {
                    initialValue: this.props.description ? this.props.description : '',
                    rules: [
                        {
                            required: true,
                            message: '请输入文章描述',
                        },
                    ],
                })(<Input.TextArea rows={8} placeholder="请填写" autoComplete="off" size="default" style={{ resize: 'none', overflow: 'hidden' }} />)}
            </Form.Item> */}


            <Form.Item label="文章标签" >
                {getFieldDecorator('tag_ids', {
                    rules: [
                        {
                            required: false,
                            message: '请选择文章类型',
                        },
                    ],
                })(<Select mode="multiple">
                    {tagList}
                </Select>)}
            </Form.Item>

            <Form.Item label="封面图片" >
                {getFieldDecorator('image', {
                    rules: [
                        {
                            required: true,
                            message: '请上传封面图片',
                        },
                    ],
                })(<Upload
                    name="avatar"
                    accept=".jpg,.png"
                    listType="picture-card"
                    showUploadList={true}
                    beforeUpload={this.beforeUpload}
                    customRequest={this.customRequest}
                    fileList={fileList}
                    onChange={this.handleChange}
                    onPreview={this.handlePreview}
                >
                    {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                    {
                        fileList.length > 0 ? '' : uploadButton
                    }
                </Upload>)}
            </Form.Item>

        </Form>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>)
    }
}

export default Form.create({})(AddAriticleForm);