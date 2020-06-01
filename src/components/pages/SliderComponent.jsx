import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import Slider from "@bit/akiran.react-slick.slider";
import { Button, Modal, Form, Input, Transfer } from "antd";

import { Typography } from "antd";
import "./css/SliderComponent.css";

import { EditOutlined } from "@ant-design/icons";
const { Title } = Typography;

export default function SliderComponent({ input, setInput }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const collectionsState = useSelector(
    state => state.supplierReducer.supplier.collections,
    shallowEqual
  );
  /* 
  const [collectionsState, setCollectionsState] = useState([]);
  useEffect(() => {
    if (collectionsReduxState) {
      setCollectionsState([
        ...collectionsReduxState.sort((a, b) => {
          return a.id - b.id;
        })
      ]);
    }
  }, [collectionsReduxState]); */

  const allProductsReduxState = useSelector(
    state => state.supplierReducer.allProducts,
    shallowEqual
  );

  const [allProductsState, setAllProductsState] = useState([]);

  useEffect(() => {
    if (allProductsReduxState) {
      setAllProductsState(
        allProductsReduxState.reduce((a, c) => {
          let data = { key: c.product_id, title: c.title };
          a.push(data);
          return a;
        }, [])
      );
    }
  }, [allProductsReduxState]);

  const [collectionEditModal, setCollectionEditModal] = useState({
    open: false,
    data: null,
    index: null
  });

  const [targetKeys, setTargetKeys] = useState([]);
  const [collection, setCollection] = useState({});

  useEffect(() => {
    if (collectionEditModal.data) {
      const { index } = collectionEditModal;
      let tempCollections = Object.assign([], input.collections);

      setTargetKeys([
        ...tempCollections[index].products.reduce((a, c) => {
          a.push(c.product_id);
          return a;
        }, [])
      ]);

      setCollection({
        ...tempCollections[index]
      });
    } else {
      setTargetKeys([]);

      setCollection({});
    }
  }, [collectionEditModal.data]);

  useEffect(() => {
    form.setFieldsValue({ ...collection });
  }, [collection]);

  console.info("rowdata", targetKeys);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  console.info("qwe", form);

  const handleCollectionItemClicked = (event, item, index) => {
    event.preventDefault();
    setCollectionEditModal({ open: true, data: item, index: index });
  };

  /*   const [mutateSupplier] = useMutation(updateSupplierData); */
  const onCreate = values => {
    console.log("Received values of form: ", values);
    const { index } = collectionEditModal;
    setInput({
      ...input,
      collections: [
        ...input.collections.map((col, i) => {
          if (i == index) {
            col = values;
          }
          return col;
        })
      ]
    });
    setCollectionEditModal({ open: false, data: null, index: null });
  };
  const handleOnCancel = () => {
    setCollectionEditModal({ open: false, data: null, index: null });
  };

  const handleOnOk = () => {
    form
      .validateFields()
      .then(values => {
        console.info("form values", values);
        form.resetFields();
        onCreate(collection);
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  const handleChange = targetKeys => {
    setTargetKeys([...targetKeys]);

    let tempProducts = targetKeys.map(id => {
      return {
        product_id: id,
        title: allProductsState.find(data => data.key == id).title || ""
      };
    });

    setCollection({ ...collection, products: tempProducts });
    /*  setInput({
      ...input,
      [input.collections[selectedCollectionIndex]]: {
        ...input.collections[selectedCollectionIndex],
        products: [...ids]
      } // edit the collection we actually clicked on
    }); */
  };

  const handleSearch = (dir, value) => {
    console.log("search:", dir, value);
  };

  const handleInputChanged = (e, name) => {
    const { value } = e.target;

    setCollection({
      ...collection,
      [name]: value
    });

    // setCollection({ ...collection, [name]: value });
    /*  setInput({
      ...input,
      collections: [
        ...input.collections.filter(col => col.id != collection.id),
        collection
      ]
    }); */
  };
  console.info("collection", collection, collectionEditModal.data);

  const renderEditCollectionModal = () => {
    return (
      <Modal
        visible={collectionEditModal.open}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleOnCancel}
        onOk={handleOnOk}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!"
              }
            ]}
          >
            <Input onInput={e => handleInputChanged(e, "title")} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input onInput={e => handleInputChanged(e, "description")} />
          </Form.Item>
          <Form.Item name="products" label="Add a product to the Collection">
            <Transfer
              dataSource={allProductsState}
              showSearch
              listStyle={{ width: 215, height: 300 }}
              targetKeys={targetKeys}
              onChange={handleChange}
              onSearch={handleSearch}
              render={item => item.title}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div className="container">
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      {renderEditCollectionModal()}

      {collectionsState && collectionsState.length !== 0 ? (
        <div className="collection-items-wrapper">
          <Title level={4}>My Collections</Title>
          {collectionsState.map((item, index) => {
            return (
              <div key={index} className="collection-wrapper">
                <div className={"collection-item-title-wrapper"}>
                  <Title
                    className={"collection-item-title"}
                    onClick={event =>
                      handleCollectionItemClicked(event, item, index)
                    }
                    level={4}
                  >
                    {item.title}
                    &nbsp;
                    <EditOutlined />
                  </Title>
                </div>

                <Slider {...settings}>
                  {item.products.map(product => {
                    return (
                      <div className="collection-item-wrapper">
                        <div className="collection-item">
                          <div className="collection-item--content">
                            <h6 className="collection-title">{`${product.title}`}</h6>
                            <label>product id:&nbsp;</label>
                            <span>{product.product_id}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
