import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { Row, Col, Input, Layout, Typography, Button } from "antd";
import { useQuery } from "@apollo/react-hooks";
import history from "../../history";
import getSupplierDataByVID from "../../graphql/queries/getSupplierByVID";
import {
  mapDataToSuppliersStateAction,
  unMountSupplierAction,
  changeSupplierVIDAction
} from "../../redux/actions/supplierActions";
import {
  UserOutlined,
  EnvironmentOutlined,
  TagsOutlined,
  HomeOutlined
} from "@ant-design/icons";
import MyEditor from "./MyEditor";
import SliderComponent from "./SliderComponent";
import { useParams } from "react-router-dom";
const { Content } = Layout;
const { Title } = Typography;

const LARGE_SIZE = 13;

const Supplier = ({ c11Client }) => {
  const dispatch = useDispatch();
  const { supplierVid } = useParams();
  const supplierReduxState = useSelector(
    state => state.supplierReducer.supplier,
    shallowEqual
  );

  const [input, setInput] = useState(supplierReduxState);

  useEffect(() => {
    //  dispatch(changeSupplierVIDAction(supplierVid));
    setInput({ ...input, supplierVID: supplierVid });
    return () => {
      dispatch(unMountSupplierAction());
    };
  }, []);

  const { data, loading, error, refetch: reFetchSupplierPage } = useQuery(
    getSupplierDataByVID,
    {
      variables: { vid: supplierVid }
    }
  );

  const newSupplier = !(
    data &&
    data.suppliers &&
    data.suppliers.length > 0 &&
    !error &&
    !loading
  );

  useEffect(() => {
    if (data && data.suppliers.length > 0 && !error && !loading) {
      console.info("input changed", data.suppliers[0], input);

      setInput({ ...input, ...data.suppliers[0] });
    }
  }, [data]);

  useEffect(() => {
    if (input) {
      dispatch(mapDataToSuppliersStateAction(input));
    }
  }, [input]);

  console.info("input change", input, data);

  //console.info("supplierData", supplierVid, data, loading, error);

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
          <Col xs={21} lg={LARGE_SIZE} xl={LARGE_SIZE}>
            <p style={{ color: "red", padding: "10px" }}>
              {validationErrors.join(", ")} cannot be empty.
            </p>
          </Col>
        </Row>
      );
    }
  };

  const renderSupplierStatusText = () => {
    const renderTheText = () => {
      if (
        data &&
        data.suppliers &&
        data.suppliers.length > 0 &&
        !error &&
        !loading
      ) {
        return `You can update your content here.`;
      } else {
        return `You can enter a new supplier content here.`;
      }
    };
    return (
      <Row justify="center" style={{ marginBottom: "1em" }}>
        <Col xs={21} lg={LARGE_SIZE} xl={LARGE_SIZE}>
          <Title level={4}>{renderTheText()}</Title>
        </Col>
      </Row>
    );
  };

  return (
    <Layout>
      <Content style={{ marginTop: "75px" }}>
        <Row justify="center" style={{ marginBottom: "1em" }}>
          <Col xs={21} lg={LARGE_SIZE} xl={LARGE_SIZE}>
            <Button type="default" onClick={() => history.push("/")}>
              Home
            </Button>
          </Col>
        </Row>
        {renderSupplierStatusText()}
        <Row justify="center">
          <Col
            xs={10}
            lg={Math.floor(LARGE_SIZE / 2)}
            xl={Math.floor(LARGE_SIZE / 2)}
          >
            <Input
              onChange={handleInputChanged}
              name="year"
              size="large"
              type="number"
              placeholder="Year of Establishment"
              prefix={<HomeOutlined />}
              value={input.year || ""}
            />
          </Col>
          <Col
            xs={10}
            lg={Math.floor(LARGE_SIZE / 2)}
            xl={Math.floor(LARGE_SIZE / 2)}
            offset={1}
          >
            <Input
              onChange={handleInputChanged}
              name="brand"
              size="large"
              placeholder="Brand"
              prefix={<UserOutlined />}
              value={input.brand}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col xs={21} lg={LARGE_SIZE} xl={LARGE_SIZE}>
            <Input
              onChange={handleInputChanged}
              name="location"
              size="large"
              placeholder="Location"
              value={input.location}
              prefix={<EnvironmentOutlined />}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col xs={21} lg={LARGE_SIZE} xl={LARGE_SIZE}>
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
          <Col xs={21} lg={LARGE_SIZE} xl={LARGE_SIZE}>
            <MyEditor
              newSupplier={newSupplier}
              reFetchSupplierPage={reFetchSupplierPage}
              c11Client={c11Client}
              input={input}
              setInput={setInput}
              setValidationErrors={setValidationErrors}
              renderValidationErrors={renderValidationErrors}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col xs={21} lg={LARGE_SIZE} xl={LARGE_SIZE}>
            <SliderComponent {...{ input, setInput }} />
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

export default Supplier;
