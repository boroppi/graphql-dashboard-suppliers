import React, { useState } from "react";
import classes from "./Styles/Home.module.css";
import history from "../../history";

const Home = () => {
  const [input, setInput] = useState({ supplierVid: "" });

  const handleInputChanged = e => {
    e.persist();
    let { name, value } = e.target;
    if (name == "year") value = value * 1;
    setInput(input => {
      return { ...input, [name]: value };
    });
  };

  const handleButtonClicked = () => {
    if (input.supplierVid.length > 0) {
      history.push(`/supplier/${input.supplierVid}`);
    } else {
      alert("Supplier VID is not entered");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>You can edit the supplier's "About Us" information here</h1>
        <p>Enter a supplier vid to begin.</p>
        <div className={classes.inputWrapper}>
          <label>Supplier VID:</label>&nbsp;
          <input name="supplierVid" onChange={handleInputChanged}></input>
          <button onClick={handleButtonClicked}> > GO</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
