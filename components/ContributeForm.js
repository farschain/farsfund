import React, { Component } from 'react';
import { Message, Form, Input, Button, Dimmer, Loader } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {

    state = {
        contributionValue: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' }); 
        this.props.callbackFromParent(true);
        const campaign = Campaign(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.contributionValue, 'ether')
            });
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false, contributionValue: '' });
        this.props.callbackFromParent(false);
    };

    render() {
        return (
            <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input label='ether'
                        labelPosition="right"
                        placeholder='Enter value to contribute...'
                        value={this.state.contributionValue}
                        onChange={event =>
                            this.setState({ contributionValue: event.target.value })}
                    />
                </Form.Field>
                <Message error header="Error!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary >Send</Button>
            </Form>
        );
    }
}

export default ContributeForm;