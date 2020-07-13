import React from 'react';
import './commentitem.css'
import Comment from './comment'
import { Input, Modal, message, Pagination } from 'antd'
import Login from 'components/login/login'
import { userLogin, isUserLogin } from '@/api'

export default class CommentItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
            showModal: false, value: ''
        }
    }

    static defaultProps = {
        commentList: [],
        comment_count: 0,
        commentuser_count: 0,
    }

    componentWillMount() {

    }

    componentDidMount() {

    }



    sendMessage = () => {

        const { value } = this.state;
        if (value.length < 1) {
            message.error('请输入评论内容');
            return;
        }

     

        isUserLogin().then(data => {
            if (data.code === 0) {

                if (this.props.addComment) {
                    this.props.addComment(value);
                    this.setState({ value: '' })
                }
            } else {
                this.setState({ showModal: true })
            }
        })

    }

    handleOk = e => {

        this.setState({
            showModal: false,
        });
    };

    handleCancel = e => {

        this.setState({
            showModal: false,
        });
    };

    login = (account, password) => {

        let parmas = new URLSearchParams();
        parmas.append('account', account);
        parmas.append('password', password)

        userLogin(parmas).then(data => {
            if (data.code === 0) {
                localStorage.setItem('banbanbloguser', JSON.stringify(data.data.blogUser))
                localStorage.setItem('banbanblogtoken', data.data.token)
                this.setState({ showModal: false });
                //
            } else {
                message.error(data.msg);
            }
        });
    }


    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };


    onPageChange = (pageIndex, pageSize) => {
        if (this.props.onPageChange) {
            this.props.onPageChange(pageIndex, pageSize);
        }

    }


    addLike = (id) => {
        if (this.props.addLike) {
            this.props.addLike(id);
        }
    }

    addDisLike = (id) => {
        if (this.props.addDisLike) {
            this.props.addDisLike(id);
        }
    }



    render() {

        const { comment_count, commentuser_count, commentList, pageIndex, pageSize, total } = this.props;
        const { showModal, value } = this.state;

        return (<div>
            <div className="inputTextArea">
                <Input.TextArea className="textarea-fw" value={value} onChange={this.onChange}>

                </Input.TextArea>
            </div>
            <div className="sendbutton">
                <button className="btn" onClick={this.sendMessage}></button>
            </div>
            <div className="cmt-list-type">
                <ul className="clear-g type-lists">
                    <li className="type-list active">评论</li>
                </ul>
                <div className="cmt-list-border"></div>
                <div className="cmt-list-number">
                    <span className="comment-number"><span className="cy-number">{commentuser_count}</span>人参与,<span className="cy-number">{comment_count}</span>条评论</span>
                </div>
            </div>
            <div className="commentList">
                <div className="cmt-list-title">
                    <div className="content">
                        <div className="c">
                            <span>最新评论</span>
                        </div>
                    </div>

                    {
                        commentList.map((comment, index) => (
                            <Comment comment={comment} key={index + '_'} addLike={this.addLike} addDisLike={this.addDisLike} />
                        ))
                    }
                </div>
            </div>
            <div className="pagination" style={{ 'marginTop': '30px', 'marginBottom': '50px' }}>
                <Pagination defaultCurrent={1} size="small" showTotal={total => `共 ${total} 条评论`} current={pageIndex} pageSize={pageSize} onChange={this.onPageChange} total={total} hideOnSinglePage={true} />
            </div>
            <Modal visible={showModal} width={'500px'} onCancel={this.handleCancel} footer={null}>
                <Login login={this.login} />
            </Modal>
        </div>)
    }
}