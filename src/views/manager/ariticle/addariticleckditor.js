import React from 'react';
import { Button, Modal, message } from 'antd'
import '../style.css'

import { saveAriticle } from '@/api'

import AddAriticleForm from './addariticleform'
import BCKEditor from './ckeditor';
export default class AddAriticleCkEditor extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            content: '',
            showModal: false
        }
    }

    componentWillMount() {
        var content = localStorage.getItem('content');
        if (content) {
            this.setState({ content });
        }
    }

    componentDidMount() {

        this.timer = setInterval(() => {
            const { content } = this.state;
            localStorage.setItem('content', content);
        }, 10000)

    }
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    clickHandle = () => {


        //发布

        this.formRef.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                let params = new URLSearchParams();
                let form = this.formRef.props.form.getFieldsValue();
                params.append('title', form.title);
                params.append('typeId', form.type_id);
                params.append('tag_ids', form.tag_ids === undefined ? '' : form.tag_ids);
                params.append('image', this.formRef.state.imageUrl)
                params.append('content', this.state.content)
                params.append('description', form.description)


                saveAriticle(params).then(data => {
                    if (data.code === 0) {
                        localStorage.setItem('content', '');
                        message.success('发布文章成功')
                    } else {
                        message.error('发布文章失败')
                    }
                });
            }
        });



    }

    checkContent = () => {

        this.setState({ showModal: true })
        return;
        /*
        this.formRef.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                this.setState({ showModal: true })
            }
        });*/
    }

    handleOk = () => {
        this.setState({ showModal: false })
    }

    handleCancel = () => {
        this.setState({ showModal: false })
    }


    handleChange = (content) => {
        this.setState({ content });
    };



    render() {

        const { content, showModal } = this.state;

        return (<div className="addAriticle">
            <AddAriticleForm wrappedComponentRef={(form) => this.formRef = form} />

            <div style={{ marginLeft: 50 }}>
                <BCKEditor content={content} onChange={this.handleChange} />
            </div>


            <Button type="primary" onClick={this.checkContent.bind(this)}>预览</Button>
            &nbsp;&nbsp;
            <Button type="primary" onClick={this.clickHandle.bind(this)}>发布</Button>
            <Modal visible={showModal} destroyOnClose={true} onOk={this.handleOk} width={1000}
                onCancel={this.handleCancel} style={{ zIndex: 100000 }}>
                <div dangerouslySetInnerHTML={{ __html: content }} style={{ zIndex: 100001 }}>

                </div>
            </Modal>
        </div>)
    }

}