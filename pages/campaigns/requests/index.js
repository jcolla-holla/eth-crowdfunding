import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((ele, idx) => {
                return campaign.methods.requests(idx).call();
            })
        )

        return { address, requests, requestCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((request, idx) => (
          <RequestRow
            id={idx}
            key={idx}
            request={request}
            address={this.props.address}
            approversCount={this.props.approversCount}
          />
        ));
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
          <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
              <a>
                <Button
                  primary
                  floated="right"
                  style={{ marginBottom: "10px" }}
                >
                  Add Request
                </Button>
              </a>
            </Link>
            <Table>
              <Header>
                <Row>
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Description</HeaderCell>
                  <HeaderCell>Amount</HeaderCell>
                  <HeaderCell>Recipient</HeaderCell>
                  <HeaderCell>Approval Count</HeaderCell>
                  <HeaderCell>Approve</HeaderCell>
                  <HeaderCell>Finalize</HeaderCell>
                </Row>
              </Header>
              <Body>{this.renderRows()}</Body>
            </Table>
            <div>Found: {this.props.requestCount}</div>
          </Layout>
        );
    }
}

export default RequestIndex;