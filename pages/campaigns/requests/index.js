import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table, TableBody } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';
import web3 from '../../../ethereum/web3';

class RequestIndex extends Component {
    state = {
        address: '',
        loading: false
    }
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        const summary = await campaign.methods.getSummery().call();
        const manager = summary[4];
   
        const requests = await Promise.all(Array.from({ length: requestCount })
            .map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        return { address, requests, requestCount, approversCount, manager };
    }

    myCallback = (dataFromChild) => {
        // console.log(dataFromChild)
         this.setState({ loading: dataFromChild })
     } 

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
                manager={this.props.manager}
                currentAdress={this.state.address}
                callbackFromParent={this.myCallback}
                index={index}
            />;
        });
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        this.setState({ address: accounts[0] });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        let createRequestButton;
        let finalizeRequestButton;

        if (this.props.manager == this.state.address) {
            createRequestButton = <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary floated="right" style={{ marginBottom: 10 }} >Add Request</Button>
                </a>
            </Link>
            finalizeRequestButton = <HeaderCell>Finalize</HeaderCell>
        }

        return (
            <Layout loading={this.state.loading}>
                <h3>Request List</h3>

                {createRequestButton}
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recepient</HeaderCell>
                            <HeaderCell>ApprovalCount</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            {finalizeRequestButton}
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        );
    }

}

export default RequestIndex;