import React, { useEffect, useState } from "react";

import { Button, Modal, Form, Input, Transfer } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
/* import updateSupplierData from "./graphql/mutations/updateSupplierData"; */
import { GET_ALL_ITEMS } from "../../graphql/graphql_queries";

import {
  addData,
  setAllProductsAction
} from "../../redux/actions/supplierActions";

const CollectionCreateForm = ({ visible, onCreate, onCancel, c11Client }) => {
  const dispatch = useDispatch();

  const collectionsState = useSelector(
    state => state.supplierReducer.collections,
    shallowEqual
  );

  const [collection, setCollection] = useState({});

  const [rowData, setRowData] = useState({
    mockData: [{}],
    targetKeys: []
  });

  const { data, loading, error } = useQuery(GET_ALL_ITEMS, {
    client: c11Client,
    variables: { vendorId: "20170130806" }
  });

  const [form] = Form.useForm();

  useEffect(() => {
    console.info("data", data);
    if (!error && !loading) {
      setRowData({
        ...rowData,
        mockData: data.getItems
      });
      dispatch(setAllProductsAction(data.getItems));
    }
  }, [data]);

  if (error) return `Error! ${error}`;

  rowData.mockData.forEach(
    (object, index) => (object.key = parseInt(object.itemId))
  );

  const handleChange = (targetKeys, direction, moveKeys) => {
    setRowData({
      ...rowData,
      targetKeys
    });

    setCollection({ ...collection, products: targetKeys });
  };

  const handleSearch = (dir, value) => {
    console.log("search:", dir, value);
  };

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(collection);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public"
        }}
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
          <Input
            onInput={e =>
              setCollection({ ...collection, title: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input
            type="textarea"
            onInput={e =>
              setCollection({ ...collection, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item name="products" label="Add a product to the Collection">
          <Transfer
            dataSource={rowData.mockData}
            showSearch
            listStyle={{ width: 215, height: 300 }}
            targetKeys={rowData.targetKeys}
            onChange={handleChange}
            onSearch={handleSearch}
            render={item => item.title}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = ({ c11Client }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  /*   const [mutateSupplier] = useMutation(updateSupplierData); */
  const onCreate = values => {
    console.log("Received values of form: ", values);
    dispatch(addData(values));
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        c11Client={c11Client}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage;
