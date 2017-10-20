import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';
import Tloader from 'react-touch-loader';

export default class MobileList extends React.Component{
    constructor(){
        super();
        this.state = {
            news:'',
            count:5,
            hasMore:0,
            initalizing: 1,
            refreshedAt:Date.now()
        }
    }

    componentWillMount(){
        var myFetchOptions = {
            method: 'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type +
        "&count=" + this.props.count, myFetchOptions)
        .then(response=>response.json())
        .then(json=>this.setState({news:json}));
    };
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                hasMore:1,
                initalizing:2
            });
        },2e3);
    }
    loadMore(resolve){
        setTimeout(()=>{
            var count = this.state.count;
            this.setState({count: count+5});
            var myFetchOptions = {
                method: 'GET'
            };
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type +
            "&count=" + this.state.count, myFetchOptions)
            .then(response=>response.json())
            .then(json=>this.setState({news:json}));

            this.setState({
                hasMore: count>0 && count<50
            });
            resolve();
        },2e3);
    };
    render(){
        var {refreshedAt,hasMore, initalizing} = this.state;
        const {news} = this.state;
        const newsList = news.length
                        ?
                        news.map((newsItem,index)=>(
                            <section key={index} className="m_article list-item special_section clearfix">
                                <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                                    <div className="m_article_img">
                                        <img src={newsItem.thumbnail_pic_s} art={newsItem.title}/>
                                    </div>
                                    <div className="m_article_info">
                                        <div className="m_article_title">
                                            <span>{newsItem.title}</span>
                                        </div>
                                        <div className="m_article_desc clearfix">
                                            <div className="m_article_desc_l">
                                                <span className="m_article_channel">{newsItem.realtype}</span>
                                                <span className="m_article_time">{newsItem.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </section>
                        )):'没有可加载的数据';
        return(
            <div class="topNewsList">
                <Row>
                    <Col span={24}>
                        <Tloader className="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} 
                        initalizing={initalizing}>
                            {newsList}
                        </Tloader>
                        
                    </Col>
                </Row>
            </div>
        );
    }
}