import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc-header';
import PCFooter from './pc-footer';
import PCNewsImagesBlock from './pc-news-images-block';
import CommonComments from './common-comments';
export default class PCNewsDetails extends React.Component{
    constructor(){
        super();
        this.state = {
            newsItem: ''
        }
    };
    componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		})
	};
    creatMarkup(){
        return {__html: this.state.newsItem.pagecontent};
    };
    render(){
        return(
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.creatMarkup()}></div>
                        <hr/>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}></CommonComments>
                    </Col>
                    <Col span={6}>
                        <PCNewsImagesBlock count={20} cartTitle="相关新闻" type="top" width="100%" imageWidth="130px"></PCNewsImagesBlock>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter></PCFooter>
                <BackTop/>
            </div>
        );
    }
}