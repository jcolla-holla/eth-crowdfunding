import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Router } from "../../../routes";

class RequestNew extends Component {
  state = {
    errMsg: "",
    loading: false,
    description: "",
    value: "",
    recipient: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    console.log("address: ", this.props.address)
    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
      Router.replaceRoute(`/campaigns/${this.props.address}`); // return to show page of campaign
    } catch (err) {
      this.setState({ errMsg: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient Address</label>
            <Input
              value={this.state.recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Error" content={this.state.errMsg} />
          <Button primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
