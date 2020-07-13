
import React from 'react'

import CKEditor from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
//import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
//import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
//import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import '../style.css'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'



//const CodeSnippet =require('ckeditor5-code-snippet-plugin/dist/codesnippet')
import MyCustomUploadAdapterPlugin from './MyUploadAdapter'


export default class BCKEditor extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        return (<div style={{ width: '670px' }} className="myckeditor">
            <CKEditor
                editor={ClassicEditor}
                data={this.props.content}
                config={{
                    language: 'zh-cn',
                    plugins: [CodeBlock, Essentials,
                        UploadAdapter,
                        Autoformat,
                        Bold,
                        Italic,//
                        BlockQuote,
                        //CKFinder,
                        // EasyImage,
                        Heading,//
                        Image,
                        ImageCaption,
                        ImageStyle,
                        ImageToolbar,
                        ImageUpload,
                        ImageResize,
                        Indent,
                        Link,
                        List,
                        // MediaEmbed,
                        Paragraph,
                        PasteFromOffice,
                        Table,
                        TableToolbar, Highlight//,CodeSnippet
                    ],
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                    toolbar: ['heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        // '|',
                        // 'codeSnippet',
                        // 'highlight',
                        // 'indentLeft',
                        // 'indentRight',
                        // '|',
                        '|',
                        'indent',
                        'outdent',
                        'codeblock',
                        '|',
                        'imageUpload',
                        'blockQuote',
                        'insertTable',
                        //'mediaEmbed',
                        'undo',
                        'redo'], image: {
                            toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight','imageStyle:side'],

                            styles: [
                                'full',
                                'side',
                                'alignLeft',
                                'alignRight'
                            ]
                        }
                }}
                onInit={editor => {

                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    if (this.props.onChange) {
                        this.props.onChange(data)
                    }
                }}
                onBlur={(event, editor) => {

                }}
                onFocus={(event, editor) => {

                }}
            />
        </div>)
    }
}