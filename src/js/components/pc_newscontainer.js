import React from 'react';
import {Row, Col} from 'antd';
import {Tabs,Carousel } from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product';

export default class PCNewsContainer extends React.Component{
  render(){
    const settings = {
      dots:true,
      infinite: true,
      speed: 500,
      slidesToShow:1,
      autoplay: true
    }
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">

                <Carousel {...settings}>
                  <div><img src="./src/images/carousel_1.jpg"/></div>
                  <div><img src="./src/images/carousel_2.jpg"/></div>
                  <div><img src="./src/images/carousel_3.jpg"/></div>
                  <div><img src="./src/images/carousel_4.jpg"/></div>
                </Carousel>
              </div>

              <div>
                <PCNewsImageBlock count={6} type="top" width="400px" cartTitle="ABC News" imageWidth="112px"/>
              </div>
              <div>
  							<PCNewsImageBlock count={8} type="top" width="400px" cartTitle="Domestic" imageWidth="112px"/>
              </div>
              <div>
  							<PCNewsImageBlock count={16} type="top" width="400px" cartTitle="Entertainment" imageWidth="112px"/>
  						</div>
            </div>

            <Tabs className="tabs_news">
              <TabPane tab="TOP" key="1">
                <PCNewsBlock count={40} type="home" width="100%" bordered="false"/>
              </TabPane>

              <TabPane tab="World" key="2">
                <PCNewsBlock count={40} type="world" width="100%" bordered="false"/>
              </TabPane>

              <TabPane tab="Health" key="3">
                <PCNewsBlock count={40} type="health" width="100%" bordered="false"/>
              </TabPane>

              <TabPane tab="Arts" key="4">
                <PCNewsBlock count={40} type="arts" width="100%" bordered="false"/>
              </TabPane>
            </Tabs>

            <Tabs className="tabs_product">
							<TabPane tab="Buzzfeed Trend" key="1">
								<PCProduct/>
							</TabPane>
						</Tabs>

            <div>
                <PCNewsImageBlock count={8} type="top" width="100%" cartTitle="Domestic" imageWidth="132px"/>
                <PCNewsImageBlock count={8} type="top" width="100%" cartTitle="Domestic" imageWidth="132px"/>
            </div>





          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
