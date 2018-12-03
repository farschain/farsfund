import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes'

class CampaignShow extends Component {
    state = {
        loading: false
    }

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummery().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            title: summary[5]
        };
    }


    renderCards() {

        const { balance, manager, minimumContribution, requestCount, approversCount, title } = this.props;

        const items = [
            {
                header: title,
                description: 'Project Address : ' + this.props.address,
                meta: 'Title of Project',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: manager,
                description: 'Manager created this Project and can create request to withdraw money',
                meta: 'Address of Manager',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                description: 'You most contribute at least this much wei to become an approver',
                meta: 'Minimum Contributions (wei)',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestCount,
                description: 'A request tries to withdraw money from contract. Request must be approve by approvers',
                meta: 'Number of Requests',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                description: 'Number of people who have already donated to this Project',
                meta: 'Number of Approvers',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                description: 'The balance is how much money this Project has left to spend.',
                meta: 'Project Balance (ether)',
                style: { overflowWrap: 'break-word' }
            }
        ];

        return <Card.Group itemsPerRow={2} items={items} />
    }

    myCallback = (dataFromChild) => {
       // console.log(dataFromChild)
        this.setState({ loading: dataFromChild })
    }

    render() {
        return (
            <Layout loading={this.state.loading}>
                <h3>Project Show</h3>
                <Grid stackable reversed='mobile'>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} callbackFromParent={this.myCallback} />
                    </Grid.Column>

                </Grid>

                <Grid stackable>
                    <Grid.Column width={16}>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>

                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;