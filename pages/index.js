import React, { Component } from 'react';
import { Card, Popup, Image, Segment, Container, Grid, Header } from 'semantic-ui-react';
import LandingLayout from '../components/LandingLayout';
import { Router } from '../routes';

class Landing extends Component {

    state = {
        errorMessage: '',
        showModal: false
    };

    goToMain = () => {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {

            // Use the browser's ethereum provider
            //var provider = web3.currentProvider;
            if (web3.version.network != "4") {
                this.setState({ errorMessage: 'Put metamask network on Rinkeby', showModal: true });
                return;
            }
            var accounts = web3.eth.accounts;
            if (accounts.length == 0) {
                this.setState({ errorMessage: 'Please, login into metamask', showModal: true });
                return;
            }
        } else {
            this.setState({ errorMessage: 'You have to install metamask', showModal: true });
            return;
        }

        Router.pushRoute('/home');
    }

    CardExampleColumnCount() {
        const metamask = '/static/metamask-black.svg';
        const ledger = '/static/ledger-black.svg';
        const keystore = '/static/json-black.svg';
        const trezor = '/static/trezor-black.svg';
        const key = '/static/pk-black.svg';

        return (
            <div>
                <Container>
                <Segment padded="very" size='large' style={{ backgroundColor:'#163150' }}>
                <Header style={{color: '#fff'}} as="h2" textAlign="center">How would you like to access your wallet?</Header>
                    <Grid stackable>
                        <Grid.Row columns={5}>

                            <Grid.Column>
                                <Popup
                                    trigger={<Card raised onClick={this.goToMain}><Image src={metamask} centered style={{ background: 'unset', marginTop: '20px', marginBottom: '20px' }} width='30px' height='30px' /><Card.Content><Card.Header textAlign="center">Metamask</Card.Header> <Card.Meta textAlign='center'><br /></Card.Meta></Card.Content></Card>}
                                    size='large'
                                    position="bottom left"
                                    open={this.state.showModal}
                                    onClose={() => { this.setState({ errorMessage: '', showModal: false }) }}
                                    content={this.state.errorMessage} />
                            </Grid.Column>
                            <Grid.Column>
                                <Card raised>
                                    <Image src={ledger} centered style={{ background: 'unset', marginTop: '20px', marginBottom: '20px' }} width='30px' height='30px' />
                                    <Card.Content>
                                        <Card.Header textAlign="center">Ledger</Card.Header>
                                        <Card.Meta textAlign='center'>Coming Soon</Card.Meta>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card raised>
                                    <Image src={keystore} centered style={{ background: 'unset', marginTop: '20px', marginBottom: '20px' }} width='30px' height='30px' />
                                    <Card.Content>
                                        <Card.Header textAlign="center">Json</Card.Header>
                                        <Card.Meta textAlign='center'>Coming Soon</Card.Meta>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card>
                                    <Image src={trezor} centered style={{ background: 'unset', marginTop: '20px', marginBottom: '20px' }} width='30px' height='30px' />
                                    <Card.Content>
                                        <Card.Header textAlign="center">Trezor</Card.Header>
                                        <Card.Meta textAlign='center'>Coming Soon</Card.Meta>

                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card>
                                    <Image src={key} centered style={{ background: 'unset', marginTop: '20px', marginBottom: '20px' }} width='30px' height='30px' />
                                    <Card.Content>
                                        <Card.Header textAlign="center">Private Key</Card.Header>
                                        <Card.Meta textAlign='center'>Coming Soon</Card.Meta>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                </Container>
            </div>
        );
    }

    render() {
        return (
            <LandingLayout>
                <br />
                <Container>
                    <img src='/static/homatech.png' width="80px" />
                </Container>
                <br />
                {this.CardExampleColumnCount()}
            </LandingLayout>
        );
    }

}

export default Landing;