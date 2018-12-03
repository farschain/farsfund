import React, { Component } from 'react';
import factory from '../ethereum/factory'
import { Card, Header, Button, Grid, Image, Input, Label, Popup, Form } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class CampaignIndex extends Component {
    state = {
        isOpen: false
    }

    static async getInitialProps() {

        const campaignsAddress = await factory.methods.getDeployedCampaigns().call();

        const campaigns = await Promise.all(Array.from({ length: campaignsAddress.length })
            .map((element, index) => {
                const campaign = Campaign(campaignsAddress[index]);
                return campaign.methods.getSummery().call();
            })
        );

        const campaignss = campaigns
            .map((element, index) => {
                return {
                    a: campaignsAddress[index],
                    c: element[5],
                    d: element[1],
                    e: element[6]
                }
            });

        //console.log(campaignss);

        return { campaigns: campaignss }
    }

    renderCampaign() {
        const timeoutLength = 1000;
        let img;
   
        const cards = this.props.campaigns.map((item, index) => (
            <Grid.Column computer={4} mobile={16} tablet={8} key={index}>
                <Card>
                   <Image src={`https://ipfs.io/ipfs/${item.e}`} width='450px' height='300px' />
                    <Card.Content>
                        <Card.Header>{item.c}</Card.Header>
                        <Card.Description style={{ overflowWrap: 'break-word' }}>
                            <CopyToClipboard onCopy={() => { this.setState({ isOpen: true }); this.timeout = setTimeout(() => { this.setState({ isOpen: false }) }, timeoutLength) }} text={item.a}>
                                <span style={{ cursor: 'pointer' }}>{item.a.substring(0, 18)}...</span>
                            </CopyToClipboard>
                            <br />
                            <br />
                            <Input size='mini' disabled labelPosition='right' type='text' value={`${web3.utils.fromWei(item.d, 'ether')} ether`} label='Balance' labelPosition='left' />
                        </Card.Description>
                        <Card.Description>
                            {/* <Input disabled label='ether' labelPosition="right" value={web3.utils.fromWei(item.d, 'ether')} /> */}
                            <br />
                            <Link route={`/campaigns/${item.a}`}>
                                <Button floated="right"> Show Project </Button>
                            </Link>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>
        ));

        return cards;
    }

    render() {
        const style = {
            right: '50%',
            marginTop: '20px'
        }

        return (
            <Layout>
                <div>
                    <Popup
                        content={`Copied to clipboard.`}
                        open={this.state.isOpen}
                        onClose={() => { this.setState({ isOpen: false }); clearTimeout(this.timeout) }}
                        position='top right'
                        style={style}
                    />
                    <Header as="h2" textAlign="center"> Open Projects </Header>

                    <Grid>
                        {this.renderCampaign()}
                    </Grid>
                </div>
            </Layout>
        );
    }

}

export default CampaignIndex;