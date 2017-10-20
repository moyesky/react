import React from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
    Card,
    Upload
} from 'antd';

import PCHeader from './pc-header';
import PCFooter from './pc-footer';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
export default class PCUserCenter extends React.Component{
    constructor(){
        super();
        this.state = {
            usercollection:'',
            usercomments:'',
            previewImage: "",
            previewVisible: false
        };
    };
    setpreviewVisible(value){
        this.setState({previewVisible:value});
    };

    componentDidMount(){
        var myFetchOptions = {
            method:'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
        });
        
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({usercomments:json})
        });
    };

    render(){
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers:{
                'Access-Control-Allow-Origin':'*'
            },
            listType: 'picture-card',
            defaultFileList:[{
                uid:-1,
                name:'xxx.png',
                state:'done',
                url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
            }],
            onPreview:(file)=>{
                this.setState({
                    previewImage:file.url,
                    previewVisible:true
                });
            }
        };
        const {usercollection,usercomments} = this.state;
        const usercollectionList = usercollection.length
                                    ?
                                    usercollection.map((uc,index)=>(
                                        <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                                            <p>{uc.Title}</p>
                                        </Card>
                                    ))
                                    :
                                    '您还没有收藏任何新闻，快去收藏吧'
                                    ;
        const usercommentsList = usercomments.length
                                    ?
                                    usercomments.map((comment,index)=>(
                                        <Card key={index} title={`于${comment.datetime}评论了文章${comment.uniquekey}`} extra={<a href="#">查看</a>}>
                                            <p>{comment.Comments}</p>
                                        </Card>
                                    ))
                                    :
                                    '还没有发表过任何评论，快去评论吧'
                                    ;
        return(
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div class="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div class="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={()=>this.setpreviewVisible(false)}>
                                        <img alt="预览" src={this.state.previewImage}/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter/>
            </div>
        );
    };
}