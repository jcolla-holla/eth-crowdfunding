import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errMsg: '',
        loading: false,
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true, errMsg: '' })
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({ from: accounts[0] });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errMsg: err.message });
        } 
        this.setState({ loading: false })
    }

    render() {
        return ( 
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei"
                            labelPosition="right" 
                            value={this.state.minimumContribution}
                            onChange={e => this.setState({ minimumContribution: e.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Error" content={this.state.errMsg} />
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
         );
    }
}
 
export default CampaignNew;