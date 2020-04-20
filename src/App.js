import React, { useState, useEffect }  from 'react';
import {Row, Col, Input, Layout, Typography, Button} from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import getSupplierData from "./graphql/queries/getSupplierData";
import updateSupplierData from "./graphql/mutations/updateSupplierData";
import {GET_SUPPLIER_DATA} from "./graphql/graphql_queries";
import {UPDATE_SUPPLIER_DATA} from "./graphql/graphql_queries";

import { UserOutlined, EnvironmentOutlined, TagsOutlined, HomeOutlined } from '@ant-design/icons';
import MyEditor from "./MyEditor";
import SliderComponent from "./SliderComponent";

const { Content } = Layout;


export const App = () => {

    const [mutateSupplier] = useMutation(updateSupplierData);

  return (
      <Layout>
          <Content>
              <Row justify="center">
                  <Col xs={10} lg={4} xl={4}>
                      <Input size="large" placeholder="Year of Establishment" prefix={<HomeOutlined />}/>
                  </Col>
                  <Col xs={10} lg={4} xl={4} offset={1}>
                      <Input size="large" placeholder="Brand" prefix={<UserOutlined />}/>
                  </Col>
              </Row>
              <Row justify="center" style={{marginTop:'1rem'}}>
                  <Col xs={21} lg={9} xl={9}>
                      <Input size="large" placeholder="Location" prefix={<EnvironmentOutlined />}/>
                  </Col>
              </Row>
              <Row justify="center" style={{marginTop:'1rem'}}>
                  <Col xs={21} lg={9} xl={9}>
                      <Input size="large" placeholder="Values" prefix={<TagsOutlined />}/>
                  </Col>
              </Row>
              <Row justify="center" style={{marginTop:'1rem'}}>
                  <Col xs={21} lg={9} xl={9}>
                      <MyEditor/>
                  </Col>
              </Row>
              <Row justify="center" style={{marginTop:'1rem'}}>
                  <Col xs={21} lg={9} xl={9}>
                      <SliderComponent />
                  </Col>
              </Row>
              <Button type="danger"
                      onClick={() => updateSupplierData({variables:{
                              id: "",
                              brand: "",
                              year: "",
                              values: "",
                              location: ""
                          }})}
              >Save</Button>
          </Content>
      </Layout>
  );
}

export default App;
