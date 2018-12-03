import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Input, Message, Dimmer, Loader } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import Routes from 'next-routes';
import ipfs from '../../ethereum/ipfs';

class CampaignNew extends Component {
    
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false,
        title: '',
        buffer: null
    };

    onSubmit = (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            ipfs.files.add(this.state.buffer, async (error, result) => {
                if (error) {
                    throw (error);
                } else {
                    const ipfsImageHash = result[0].hash;

                    const accounts = await web3.eth.getAccounts();
                    await factory.methods
                        .createCampaign(this.state.minimumContribution, this.state.title, ipfsImageHash)
                        .send({
                            from: accounts[0],
                            gas: '2000000'
                        });
                    Router.pushRoute('/main');
                }
            });

        } catch (err) {
            this.setState({ loading: false, minimumContribution: '', title: '', buffer: null });
            this.setState({ errorMessage: err.message });
        }
    };

    onCapture = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result), loading: false });
        }
    }

    render() {
        return (
            <Layout loading={this.state.loading}>
                <h3>Create a Project</h3>
                <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Project Title</label>
                        <Input
                            placeholder='Enter Title ...'
                            value={this.state.title}
                            onChange={event => this.setState({ title: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Minimum Contributions Amounts</label>
                        <Input label='wei'
                            labelPosition="right"
                            placeholder='Enter Value ...'
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Image</label>
                        <Input
                            placeholder='Select Image ...'
                            type='file'
                            onChange={this.onCapture} />
                    </Form.Field>
                    <Message error header="Ooops!" visible={!!this.state.errorMessage} content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary >Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;