import React from 'react'
import { Button, Modal, message } from 'antd'
import '../style.css'
import { uploadFile,saveAriticle } from '@/api'
import E from 'wangeditor'

import AddAriticleForm from './addariticleform'

export default class AddAriticle extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            editorContent: '',
            showModal: false
        }
    }


    menu = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ]

    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
        }

        editor.customConfig.menus = this.menu;

        editor.customConfig.uploadImgServer = '/file/fileUpload';


        editor.customConfig.customUploadImg = function (files, insert) {
            let param = new FormData();
            param.append("files", files[0]);
            uploadFile(param).then(data => {
                insert(data.data)
            });

        }

        editor.create()
    }

    clickHandle() {


        //发布

        this.formRef.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                let params = new URLSearchParams();
                let form=this.formRef.props.form.getFieldsValue();
                params.append('title',form.title);
                params.append('typeId',form.type_id);
                params.append('tag_ids',form.tag_ids===undefined?'':form.tag_ids);
                params.append('image',this.formRef.state.imageUrl)
                params.append('content',this.state.editorContent)
                params.append('userId',1);
                params.append('description',form.description)

              
                saveAriticle(params).then(data=>{
                    if(data.code===0){
                        message.success('发布文章成功')
                    }else{
                        message.error('发布文章失败')
                    }
                });
            }
        });



    }

    checkContent = () => {


        
        this.formRef.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                this.setState({ showModal: true })
            }
        });
    }

    handleOk = () => {
        this.setState({ showModal: false })
    }

    handleCancel = () => {
        this.setState({ showModal: false })
    }





    render() {

        const { editorContent, showModal } = this.state;

        return (<div className="addAriticle">
            <AddAriticleForm wrappedComponentRef={(form) => this.formRef = form} />
            <div ref="editorElem" className="wEditor" style={{ textAlign: 'left', margin: '10px auto' }}>
            </div>

            <Button type="primary" onClick={this.checkContent.bind(this)}>预览</Button>
            &nbsp;&nbsp;
            <Button type="primary" onClick={this.clickHandle.bind(this)}>发布</Button>
            <Modal visible={showModal} destroyOnClose={true} onOk={this.handleOk} width={1000}
                onCancel={this.handleCancel} style={{ zIndex: 100000 }}>
                <div dangerouslySetInnerHTML={{ __html: editorContent }} style={{ zIndex: 100001 }}>

                </div>
            </Modal>
        </div>)
    }

}