import React from "react";
import { Menu, Message } from "semantic-ui-react";
import { Link } from "../routes";

export default (props) => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">CrowdFunder</a>
      </Link>
      <Message color="yellow">
        To use this demo app without errors, you must install the{" "}
        <a href="https://metamask.io/" target="_blank">
          Metamask browser extension
        </a>{" "}
        to connect your Ethereum wallet (Rinkeby network)
      </Message>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
