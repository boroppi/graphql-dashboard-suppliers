import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import Slider from "@bit/akiran.react-slick.slider";
import { Button, Modal, Form, Input, Transfer } from "antd";

import { Typography } from "antd";
import "./css/SliderComponent.css";
const { Title } = Typography;

export default function SliderComponent({ input, setInput }) {
  const dispatch = useDispatch();
  const collectionsState = useSelector(
    state => state.supplierReducer.supplier.collections,
    shallowEqual
  );

  const allProductsState = useSelector(
    state => state.supplierReducer.allProducts,
    shallowEqual
  );

  const [collectionEditModal, setCollectionEditModal] = useState({
    open: false,
    data: null
  });

  const selectedCollectionIndex =
    collectionEditModal.data && collectionEditModal.data.index;

  const [targetKeys, setTargetKeys] = useState([]);

  useEffect(() => {
    if (selectedCollectionIndex != null) {
      setTargetKeys([
        ...input.collections[selectedCollectionIndex].products.reduce(
          (a, c) => {
            a.push(c.product_id);
            return a;
          },
          []
        )
      ]);
    }
  }, [selectedCollectionIndex]);

  console.info("rowdata", targetKeys);

  const [form] = Form.useForm();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  console.info("qwe", form);

  const handleCollectionItemClicked = (event, item, index) => {
    setCollectionEditModal({ open: true, data: { item, index } });
  };

  /*   const [mutateSupplier] = useMutation(updateSupplierData); */
  const onCreate = values => {
    console.log("Received values of form: ", values);
    //  dispatch(addData(values));
    setCollectionEditModal({ open: false, data: null });
  };
  const handleOnCancel = () => {
    setCollectionEditModal({ open: false, data: null });
  };

  const handleOnOk = () => {
    /*   form
      .validateFields()
      .then(values => {
        form.resetFields();
        onCreate(collection);
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      }); */
  };

  let collection = "";
  if (selectedCollectionIndex != null)
    collection = { ...input.collections[selectedCollectionIndex] };

  const handleChange = ids => {
    targetKeys([...ids]);

    setInput({
      ...input,
      [input.collections[selectedCollectionIndex]]: {
        ...input.collections[selectedCollectionIndex],
        products: [...ids]
      } // edit the collection we actually clicked on
    });
  };

  const handleSearch = (dir, value) => {
    console.log("search:", dir, value);
  };

  const handleInputChanged = (e, name) => {
    const { value } = e.target;
    console.info("input event slider", e);

    collection = { ...collection, [name]: value };
    setInput({
      ...input,
      collections: [
        ...input.collections.filter(col => col.id != collection.id),
        collection
      ]
    });
  };

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
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={
            selectedCollectionIndex != null && {
              ...input.collections[selectedCollectionIndex]
            }
          }
        >
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
          <Slider {...settings}>
            {collectionsState.map((item, index) => {
              return (
                <div
                  onClick={event =>
                    handleCollectionItemClicked(event, item, index)
                  }
                  key={index}
                  className="collection-item"
                >
                  <h6 className="collection-title">{`${item.title}`}</h6>
                  <label>Product Count:&nbsp;</label>
                  <span>{item.products.length}</span>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : null}
    </div>
  );
}
