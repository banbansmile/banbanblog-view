import React from 'react';
import { Table, Button, Modal, message, Input } from 'antd'
import { addMod, getModList, deleteMod } from '@/api'

export default class ModList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageIndex: 1, pageSize: 10, total: 0, modList: [], showModal: false,value:''
        }
    }

    deleteMod(record) {
        let _this = this;
        Modal.confirm({
            title: '确认删除?',
            content: '',
            onOk() {
                deleteMod(record.id).then(data => {
                    if (data.code === 0) {
                        message.success("删除成功")
                        const { pageIndex, pageSize } = _this.state;
                        let params = new URLSearchParams()
                        params.append(pageIndex, pageIndex);
                        params.append(pageSize, pageSize);
                        _this.getModList(params);
                        _this.setState({showModal:false})
                    } else {
                        message.error("删除失败")
                        _this.setState({showModal:false})
                    }
                    
                })
               
            },
            onCancel() { },
        });
    }

    addMod = () => {

        this.setState({ showModal: true })
    }


    handleOk = () => {

        const {value}=this.state;
        let params = new URLSearchParams();
        params.append('content',value)
        params.append('userId', 1)
        addMod(params).then(data => {
            if (data.code === 0) {
                message.success("添加成功");
                const { pageIndex, pageSize } = this.state;
                let params = new URLSearchParams()
                params.append(pageIndex, pageIndex);
                params.append(pageSize, pageSize);
                this.getModList(params);
            } else {
                message.error("添加失败")
            }
        })
        this.setState({showModal:false})
    }

    handleCancel = () => {
        this.setState({ showModal: false })
    }

    textAreaChange = ({ target: { value } }) => {
        this.setState({ value });
    }

    reload = (pageIndex, pageSize) => {

        let params = new URLSearchParams()
        params.append(pageIndex, pageIndex);
        params.append(pageSize, pageSize);
        this.getModList(params);

    }

    componentWillMount() {
        const { pageIndex, pageSize } = this.state;
        let params = new URLSearchParams()
        params.append(pageIndex, pageIndex);
        params.append(pageSize, pageSize);
        this.getModList(params);
    }


    getModList(param) {
        getModList(param).then(data => {
            if (data.code === 0) {
                this.setState({ 'modList': data.data, total: data.totalnum })
            }
        })
    }



    render() {

        const { pageIndex, pageSize, total, showModal, modList } = this.state;

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

        return (<div className="mod">
            <Button type="primary" onClick={this.addMod}>新增</Button>
            <Table dataSource={modList} pagination={pagination} size="small" rowKey={(record) => { return record.id + "_" }}>
                <Table.Column key="content" title="内容" dataIndex="content"></Table.Column>
                <Table.Column key="action" title="操作" dataIndex="action" render={(text, record, index) => {
                    return <div>
                        <Button type="danger" size="small" onClick={this.deleteMod.bind(this, record)}>删除</Button>
                    </div>
                }}></Table.Column>
            </Table>
            <Modal visible={showModal} destroyOnClose={true} onOk={this.handleOk} width={500}
                onCancel={this.handleCancel} style={{ zIndex: 100000 }}>
                <Input.TextArea rows={8} style={{ resize: 'none', overflow: 'hidden' }} onChange={this.textAreaChange} />
            </Modal>
        </div>)
    }
}

