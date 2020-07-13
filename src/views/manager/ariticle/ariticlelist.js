import React from 'react';
import { Table, Modal, Button, message } from 'antd'
import { getAriticleList, deleteAritile } from '@/api'
import '../style.css'


export default class AriticleList extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            ariticleList: [],
            showModal: false,
            ariticleInfo: ''
        }
    }


    componentWillMount() {
        let params = new URLSearchParams()
        const { pageIndex, pageSize } = this.state;
        params.append(pageIndex, pageIndex);
        params.append(pageSize, pageSize);

        this.getAriticleList(params);

    }

    reload = (pageIndex, pageSize) => {

        let params = new URLSearchParams()
        params.append(pageIndex, pageIndex);
        params.append(pageSize, pageSize);
        this.getAriticleList(params);

    }


    getAriticleList(params) {
        getAriticleList(params).then(data => {
            if (data.code === 0) {
                this.setState({ 'ariticleList': data.data, total: data.totalnum })
            }

        });
    }

    ariticleDetail(record) {
        this.setState({ ariticleInfo: record.content, showModal: true })
    }

    handleOk = () => {
        this.setState({ showModal: false })
    }

    handleCancel = () => {
        this.setState({ showModal: false })
    }

    deleteAricle(record) {
        let _this=this
        Modal.confirm({
            title: '确认删除文章?',
            content: '',
            onOk() {
                deleteAritile(record.id).then(data => {
                    if (data.code === 0) {
                        message.success("删除文章成功")
                        const { pageIndex, pageSize } = _this.state;
                        let params = new URLSearchParams()
                        params.append(pageIndex, pageIndex);
                        params.append(pageSize, pageSize);
                        _this.getAriticleList(params);
                    } else {
                        message.error("删除文章失败")
                    }
                });
            },
            onCancel() { },
        });
    }

    render() {

        const { pageIndex, pageSize, total, ariticleList, showModal, ariticleInfo } = this.state;

        let pagination = {
            current: pageIndex,
            defaultCurrent: pageIndex,
            pageSize: pageSize,
            total: total,
            showTotal: (total, range) => `共${total}条记录`,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.reload,
            onShowSizeChange: this.reload
        }


        return (<div className="ariticleList">
            <Table dataSource={ariticleList} pagination={pagination} size="small" rowKey={(record) => { return record.id + "_" }}>
                <Table.Column key="title" title="标题" dataIndex="title"></Table.Column>
                <Table.Column key="image" title="图片" dataIndex="image" render={(text, record, index) => {
                    return <img src={record.image} alt=" "/>
                }}></Table.Column>
                <Table.Column key="description" title="摘要" dataIndex="description"></Table.Column>
                <Table.Column key="action" title="操作" dataIndex="action" render={(text, record, index) => {
                    return <div>
                        <Button type="primary" size="small" onClick={this.ariticleDetail.bind(this, record)}>详细</Button>&nbsp;&nbsp;
                        <Button type="danger" size="small" onClick={this.deleteAricle.bind(this, record)}>删除</Button>
                    </div>
                }}></Table.Column>
            </Table>
            <Modal visible={showModal} destroyOnClose={true} onOk={this.handleOk} width={1000}
                onCancel={this.handleCancel} style={{ zIndex: 100000 }}>
                <div dangerouslySetInnerHTML={{ __html: ariticleInfo }} style={{ zIndex: 100001 }}>

                </div>
            </Modal>
        </div>)
    }

}