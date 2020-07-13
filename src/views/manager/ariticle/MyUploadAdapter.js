import { uploadFile } from '@/api'
import { message } from 'antd'

export default function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }


    upload() {



        return this.loader.file
            .then(file => new Promise(async (resolve, reject) => {


                var data = new FormData();
                data.append("files", file);
                let res = await uploadFile(data);
               

                if (res) {
                    let { errno } = res;
                    if (errno === 0) {
                        resolve({ default: res.data[0] });
                    } else { reject(message) }
                } else {
                    message.error('图片上传失败')
                }

            })
            );

    }

    abort() {
        console.log('暂停上传')
    }

}