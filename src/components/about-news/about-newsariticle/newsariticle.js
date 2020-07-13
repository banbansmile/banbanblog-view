import React from 'react';

export default class NewestAriticle extends React.Component {


    static defaultProps = {
        newestAriticleList: []
    }

    render() {

        const { newestAriticleList } = this.props;

        return (<ul className="smile_rank">

            {newestAriticleList.map((ariticle, index) => (
                <li key={index+'_'}><a href={`#/ariticle/detail/${ariticle.id}`} target="_blank" rel="noopener noreferrer" title={ariticle.title}>{ariticle.title}</a></li>
            ))
            }
        </ul>)
    }
}