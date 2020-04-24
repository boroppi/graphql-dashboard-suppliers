import React, { useState, useEffect } from "react";
import classes from "./Styles/Home.module.css";
import history from "../../history";
import getListOfSupplierVIDS from "../../graphql/queries/getListOfSupplierVIDS";
import { useQuery } from "@apollo/react-hooks";

import { Select, Button } from "antd";

const { Option } = Select;

const Home = ({ c11Client }) => {
  const [listOfVids, setListOfVids] = useState([]);

  const [selectedVid, setSelectedVid] = useState("");

  const { data, loading, error } = useQuery(getListOfSupplierVIDS, {
    client: c11Client
  });

  useEffect(() => {
    if (data && !loading && !error) {
      setListOfVids(
        data.getVendors.reduce((a, c) => {
          a.push(c.vendorId);
          return a;
        }, [])
      );
    }
  }, [data]);

  const handleButtonClicked = () => {
    if (selectedVid) {
      history.push(`/supplier/${selectedVid}`);
    } else {
      alert("Supplier VID is not selected");
    }
  };

  const handleSelectChanged = value => {
    console.info("select", value);
    setSelectedVid(value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>You can edit the supplier's "About Us" information here</h1>
        <p>Select a supplier vid to begin.</p>
        <div className={classes.inputWrapper}>
          <Select
            showSearch
            style={{ width: "50%" }}
            placeholder="Select a vid"
            optionFilterProp="children"
            onChange={handleSelectChanged}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {listOfVids.map(vid => {
              return <Option value={vid}>{vid}</Option>;
            })}
          </Select>
          <Button onClick={handleButtonClicked}>OK</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
