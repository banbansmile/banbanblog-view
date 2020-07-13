import React from 'react';

export default class Comment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLike: false,
            isDisLike: false,
            like_count: 0,
            dislike_count: 0
        }
    }

    static defaultProps = {
        comment: {
            like_count: 0,
            dislike_count: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        const { like_count, dislike_count } = nextProps.comment;
        this.setState({ like_count, dislike_count });

    }

    componentDidMount() {
        const { like_count, dislike_count } = this.props.comment;
        this.setState({ like_count, dislike_count });
    }


    addLike = (e) => {
        e.preventDefault();

        const { isLike, like_count } = this.state;
        if (!isLike) {

            const { id } = this.props.comment;


            if (this.props.addLike) {
                this.props.addLike(id)
            }

            var _like_count = like_count + 1;
            this.setState({ isLike: true, like_count: _like_count })

        }



    }

    addDisLike = (e) => {

        e.preventDefault();

        const { isDisLike, dislike_count } = this.state;
        if (!isDisLike) {

            const { id } = this.props.comment;

            if (this.props.addDisLike) {
                this.props.addDisLike(id);
            }

            var _dislike_count = dislike_count + 1
            this.setState({ isDisLike: true, dislike_count: _dislike_count })

        }



    }

    render() {

        const { isLike, isDisLike, dislike_count, like_count } = this.state;

        const { comment } = this.props;


        return (
            <div className="commmentitem">
                <div>
                    <div className="commentimage">
                        {
                            comment.image?<img src={comment.image} alt="头像" />:<img src={require('../../img/uuser.jpg')} alt="头像" />
                        }
                    </div>
                    <div className="commentright">
                        <div className="userInfo">
                            <div className="username">
                                <span style={{ color: '#e74851' }}>{comment.user_name}</span>&nbsp;&nbsp;<span style={{ color: '#dbdbdb' }}>{comment.address ? '[' + comment.address + ']' : ''}</span>
                            </div>
                            <div className="commentdate">
                                <span style={{ color: 'silver' }}>{comment.add_time}</span>
                            </div>
                        </div>
                        <div className="content">
                            <p>{comment.comment}</p>
                        </div>
                        <div className="likeanddisklike">
                            <span><a href="/#" onClick={this.addLike}><i className={`${isLike ? 'dingclick' : 'ding'}`}></i>&nbsp;{like_count !== 0 ? like_count : ''}</a></span>
                            <span><a href="/#" onClick={this.addDisLike}><i className={`${isDisLike ? 'caiclick' : 'cai'}`}></i></a>&nbsp;{dislike_count !== 0 ? dislike_count : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}