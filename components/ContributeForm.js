import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3'
import { Router } from "../routes";



class ContributeForm extends Component {
    state = {
        value: '',
        errMsg: '',
        loading: false,
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true, errMsg: '' });
        try {
          const campaign = Campaign(this.props.address);
          const accounts = await web3.eth.getAccounts();
          await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, "ether"),
          });
          
          // refresh page to update displayed data
          Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
            this.setState({ errMsg: err.message });
        }
        this.setState({ loading: false });
    };

    render() {
        return (
          <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
            <Form.Field>
              <label>Amount to Contribute</label>
              <Input
                label="ether"
                labelPosition="right"
                value={this.state.value}
                onChange={(e) => this.setState({ value: e.target.value })}
              />
            </Form.Field>
            <Message error header="Error" content={this.state.errMsg} />
            <Button primary loading={this.state.loading}>
              Contribute
            </Button>
          </Form>
        );
    }
}

export default ContributeForm;
