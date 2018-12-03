import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {

    state = {
        approvalCount: this.props.request.approvalCount,
        stat: false,
        errorMessage: '',
    }

    async componentDidMount() {
        //console.log('hre');
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.props.address);
        //console.log(accounts[0]);
        //console.log(campaign);
        //   const isContribute = await campaign.methods.getApproverValidity(accounts[0]).call();
        // console.log(isContribute);
        //   if (isContribute) {  
        this.onLoad(accounts[0], campaign);


        // console.log(isContribute)
        //   }else{
        //     this.setState({ stat: false });

        // }
    }

    onLoad = async (account, campaign) => {
        try {
            // const accounts = await web3.eth.getAccounts();
            // const campaign = Campaign(this.props.address);
            const has = await campaign.methods.getApprovals(this.props.index, account).call();
            this.setState({ stat: has });
            const isContribute = await campaign.methods.approvers(account).call();
            if (!isContribute) {
                this.setState({ stat: false, errorMessage: '-' });
            }
            // console.log(isContribute);
        } catch (err) {
            console.log(err.message)
        }
    };

    onApprove = async () => {
        try {
            this.props.callbackFromParent(true);
            const campaign = Campaign(this.props.address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
            const current = parseInt(this.state.approvalCount) + 1;
            this.setState({ approvalCount: current, stat: true });
        } catch (err) { }
        this.props.callbackFromParent(false);
    };

    onFinalize = async () => {
        try {
            this.props.callbackFromParent(true);
            const campaign = Campaign(this.props.address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizedRequest(this.props.id).send({
                from: accounts[0]
            });
        } catch (err) { }

        this.props.callbackFromParent(false);
        this.setState({ spam: true });
    };

    render() {
        const { Row, Cell } = Table;
        const { id, request } = this.props;
        const readyTofinalize = this.state.approvalCount > this.props.approversCount / 2;
        let finalizeButton;

        if (this.props.manager == this.props.currentAdress && readyTofinalize) {
            finalizeButton = <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
        }

        return (
            <Row disabled={request.complete} positive={readyTofinalize && !request.complete} negative={!readyTofinalize}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{this.state.approvalCount}/{this.props.approversCount}<span style={{ display: 'none' }}></span></Cell>
                <Cell>
                    {this.state.stat ? (<span>Voted!</span>) : this.state.errorMessage ? this.state.errorMessage : (<Button color="green" basic onClick={this.onApprove}>Approve</Button>)}
                </Cell>
                <Cell>
                    {finalizeButton}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow; 