import React from 'react';
import {Row, Col, Tabs, Button, Checkbox, Modal, Carousel} from 'antd';
import PCNewsBlock from './pc-news-block';
import PCNewsImagesBlock from './pc-news-images-block';
import PCProduct from './pc-product';
const TabPane = Tabs.TabPane;
export default class PCNewsContainer extends React.Component{
    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        }
        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>
                                </Carousel>
                            </div>
                            <PCNewsImagesBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"></PCNewsImagesBlock>
                            </div>
                        
                        <Tabs class="tabs_news">
                            <TabPane tab="头条新闻" key="1">
                                <PCNewsBlock count={21} type="top" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewsBlock count={21} type="guoji" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>
                        <Tabs class="tabs_product">
                            <TabPane tab="ReactNews 产品" key="1">
                                <PCProduct/>
                            </TabPane>
                        </Tabs>
                        <div>
                            <PCNewsImagesBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="122px"></PCNewsImagesBlock>
                            <PCNewsImagesBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="122px"></PCNewsImagesBlock>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}