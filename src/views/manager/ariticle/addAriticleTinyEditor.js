import React from 'react';
import { Button, Modal, message } from 'antd'
import '../style.css'
import { saveAriticle } from '@/api'
import AddAriticleForm from './addariticleform'
import { Editor } from '@tinymce/tinymce-react';
import { uploadFile } from '@/api'

export default class TinyAriticleCkEditor extends React.Component {

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

    handleEditorChange = (content) => {
        this.setState({ content })
    }

    imagesUploadHandler = async (blobInfo, success, failure, progress) => {
        var data = new FormData();
        data.append('files', blobInfo.blob(), blobInfo.filename());
        let res = await uploadFile(data);
        if (res) {
            let { errno } = res;
            if (errno === 0) {
                success(res.data[0]);
            } else {
                failure("图片上传失败")
            }
        } else {
            message.error('图片上传失败');
            failure("图片上传失败")
        }
    }



    render() {

        const { content, showModal } = this.state;

        return (<div className="addAriticle">
            <AddAriticleForm wrappedComponentRef={(form) => this.formRef = form} />

            <div style={{ marginLeft: 50 }}>
                <Editor
                    initialValue={content}
                    apiKey="hq72bjfug6s56a5qxa2oxpbqsxc58nv4v7nfruyd5ndpgu72"
                    init={{
                        height: 500,
                        // menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount imagetools codesample'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify |bullist numlist outdent indent | removeformat |image|codesample|code|preview|fullscreen | help',
                        menu: {
                            file: { title: '文件', items: 'newdocument restoredraft | preview | print ' },
                            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
                            view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
                            insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
                            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
                            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
                            table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
                            favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | spellchecker | emoticons' }
                        },
                        menubar: 'file edit view insert format tools table',
                        codesample_languages: [
                            { text: 'HTML/XML', value: 'markup' },
                            { text: 'JavaScript', value: 'javascript' },
                            { text: 'CSS', value: 'css' },
                            { text: 'PHP', value: 'php' },
                            { text: 'Ruby', value: 'ruby' },
                            { text: 'Python', value: 'python' },
                            { text: 'Java', value: 'java' },
                            { text: 'C', value: 'c' },
                            { text: 'C#', value: 'csharp' },
                            { text: 'C++', value: 'cpp' },
                            { text: 'Scala', value: 'scala' },
                            { text: 'SQL', value: 'sql' },
                            { text: 'Shell', value: 'shell' },
                            { text: 'JSON', value: 'json' },
                            { text: 'Markdown', value: 'markdown' },
                            { text: 'Property', value: 'properties' },
                            { text: 'TypeScript', value: 'typescript' }
                        ],
                        language: "zh_CN",
                        image_uploadtab: true,
                        images_upload_handler: this.imagesUploadHandler
                    }}
                    onEditorChange={this.handleEditorChange}
                />


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