import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Input, Message, Dimmer, Loader } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';


class RequestNew extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    state = {
        description: '',
        amount: '',
        recipient: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        const campaign = Campaign(this.props.address);
        const { description, amount, recipient } = this.state;
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest
                (description, web3.utils.toWei(amount, 'ether'), recipient).send({
                    from: accounts[0]
                });
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false, amount: '', description: '', recipient: '' });
    };

    render() {
        return (
            <Layout loading={this.state.loading}>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        Back
                    </a>
                </Link>
                <h3>Create a Request</h3>
                <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            placeholder='Enter description...'
                            value={this.state.description}
                            onChange={event =>
                                this.setState({ description: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount</label>
                        <Input label='ether'
                            labelPosition="right"
                            placeholder='Enter value for request...'
                            value={this.state.amount}
                            onChange={event =>
                                this.setState({ amount: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            placeholder='Enter Address...'
                            value={this.state.recipient}
                            onChange={event =>
                                this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Error!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary >Create</Button>
                </Form>
            </Layout>
        );
    }

}

export default RequestNew;