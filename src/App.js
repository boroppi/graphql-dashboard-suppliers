import React, { useState, useEffect } from "react";
import { Row, Col, Input, Layout, Typography, Button } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import getSupplierData from "./graphql/queries/getSupplierData";

import {
  UserOutlined,
  EnvironmentOutlined,
  TagsOutlined,
  HomeOutlined
} from "@ant-design/icons";
import MyEditor from "./MyEditor";
import SliderComponent from "./SliderComponent";

const { Content } = Layout;

export const App = () => {
  const [input, setInput] = useState({
    brand: "",
    year: "",
    location: "",
    description: "NEED TO IMPLEMENT THIS"
  });

  const [validationErrors, setValidationErrors] = useState([]);

  const handleInputChanged = e => {
    e.persist();
    let { name, value } = e.target;
    if (name == "year") value = value * 1;
    setInput(input => {
      return { ...input, [name]: value };
    });
  };
  console.info("input", input);

  const renderValidationErrors = () => {
    if (validationErrors.length > 0) {
      return (
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col xs={21} lg={9} xl={9}>
            <p style={{ color: "red", padding: "10px" }}>
              {validationErrors.join(", ")} cannot be empty.
            </p>
          </Col>
        </Row>
      );
    }
  };

  return (
    <Layout>
      <Content style={{ marginTop: "75px" }}>
        <Row justify="center">
          <Col xs={10} lg={4} xl={4}>
            <Input
              onChange={handleInputChanged}
              name="year"
              size="large"
              type="number"
              placeholder="Year of Establishment"
              prefix={<HomeOutlined />}
            />
          </Col>
          <Col xs={10} lg={4} xl={4} offset={1}>
            <Input
              onChange={handleInputChanged}
              name="brand"
              size="large"
              placeholder="Brand"
              prefix={<UserOutlined />}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col xs={21} lg={9} xl={9}>
            <Input
              onChange={handleInputChanged}
              name="location"
              size="large"
              placeholder="Location"
              prefix={<EnvironmentOutlined />}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col xs={21} lg={9} xl={9}>
            <Input
              disabled
              name="values"
              size="large"
              placeholder="Values"
              prefix={<TagsOutlined />}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col xs={21} lg={9} xl={9}>
            <MyEditor
              input={input}
              setValidationErrors={setValidationErrors}
              renderValidationErrors={renderValidationErrors}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col xs={21} lg={9} xl={9}>
            <SliderComponent />
          </Col>
        </Row>
        {/*    <Button
          type="danger"
          onClick={() =>
            updateSupplierData({
              variables: {
                id: "",
                brand: "",
                year: "",
                values: "",
                location: ""
              }
            })
          }
        >
          Save
        </Button> */}
      </Content>
    </Layout>
  );
};

export default App;
