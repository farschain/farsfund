import PropTypes from 'prop-types';
import Head from 'next/head';
import React, { Component } from 'react';
import { Link } from '../routes';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Card
} from 'semantic-ui-react';
import css from '../assets/css/custom.css';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const ImageExampleFluid = () => <Image src='/static/logofarsfund.png' fluid style={{width:'65%',left:'17%'}}/>
const HomepageHeading = ({ mobile }) => (
    <Container text>
    <div>
    <ImageExampleFluid />
    </div>
        <Header
            as='h1'
            content='Raise fund for your dreams'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                 marginTop: mobile ? '1.5em' : '1.5em',
            }}
        />
        <Header
            as='h2'
            content='Blockchain fundrasing platform'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '0.5em',
            }}
        />
        <Button size='huge' style={{marginTop:'0.5em'}}>
            Get Started
      <Icon name='right arrow' />
        </Button>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props;
        const { fixed } = this.state;

        return (

            <Responsive minWidth={Responsive.onlyTablet.minWidth} getWidth={() => {
                if (typeof window !== 'undefined') {
                    return window.innerWidth;
                } else {
                    return Responsive.onlyTablet.minWidth;
                }
            }}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em', backgroundColor: '#142b1a' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                            </Container>
                        </Menu>
                        <HomepageHeading />
                    </Segment>

                </Visibility>
                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {
    state = {}

    handlePusherClick = () => {
        const { sidebarOpened } = this.state

        if (sidebarOpened) this.setState({ sidebarOpened: false })
    }

    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                <Sidebar.Pushable>
                    {/* <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
                        <Menu.Item as='a'>Log in</Menu.Item>
                        <Menu.Item as='a'>Sign Up</Menu.Item>
                    </Sidebar> */}

                    <Sidebar.Pusher
                        dimmed={sidebarOpened}
                        onClick={this.handlePusherClick}
                        style={{ minHeight: '100vh' }}
                    >
                        <Segment
                            inverted
                            textAlign='center'
                            className="g-py-mobile"
                            style={{ minHeight: 350, padding: '1em 0em' ,backgroundColor:'rgb(20, 43, 26)'}}
                            vertical
                        >
                            {/* <Container>
                                <Menu inverted pointing secondary size='large'>
                                    <Menu.Item onClick={this.handleToggle}>
                                        <Icon name='sidebar' />
                                    </Menu.Item>
                                    <Menu.Item position='right'>
                                        <Button as='a' inverted>
                                            Log in
                    </Button>
                                        <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                                            Sign Up
                    </Button>
                                    </Menu.Item>
                                </Menu>
                            </Container> */}
                            <HomepageHeading mobile />
                        </Segment>

                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}


const HomepageLayout = () => (
    <ResponsiveContainer>
        <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
            {/* <link rel="stylesheet" href="/assets/css/custom.css"></link> */}
        </Head>
        <Segment style={{ padding: '4em 0em' }} vertical className="g-mx-15">
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        Decentralized open innovation platform
            </Header>
                        <p style={{ fontSize: '1.33em',textAlign: 'justify' }} >
                        Farsfund is a decentralized open innovation platform that 
                        help philanthropists and social activists to fundraise their ideas,
                         allowing them to create and manage projects on a transparent and
                          democratic vote-based eco-system.
                        Removing a third party for trust, it allows the public to
                         follow the capital and how it has been used and make it possible for donors to validate the progress of the project and stop or accelerate if necessary. This will help the community to tailor their efforts in the right direction.
                         </p>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        Open-source project
            </Header>  
                        <p style={{ fontSize: '1.33em',textAlign: 'justify' }}>
                        By moving the open-source ecosystem onto the blockchain,
                         we enable all of this activity to happen in the open, in a network that cannot be censored or
                          controlled by any one party. The code is in the hands of the users. 
                        Anyone can read the code that runs or copy the code to create a new version that suits their needs.
            </p>
                    <div style={{textAlign:'left',paddingTop:'10px'}}>
                    <Button href="https://github.com/farschain/farsfund" as="a" basic color='black' style={{borderRadius: '20px'}}>Contribute Code</Button>
                    </div>
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image bordered rounded size='large' src='/static/shutter.png' />
                    </Grid.Column>
                </Grid.Row>   
            </Grid>
        </Segment>
<Segment
 style={{ padding: '0',borderBottom:'unset !important', backgroundColor: '#142b1a' }}
  vertical >
    <Grid container stackable verticalAlign='middle' className="g-mx-15">
    <Grid.Row style={{}}>
                    <Grid.Column textAlign='center' style={{}} className="g-height-mobile">
                    <div style={{display: 'flex',    justifyContent: 'center'}}>
                    <div style={{marginTop:'15px',height:'50px'}}>
                        <p style={{ fontSize: '1.33em',color:'#fff',paddingRight:'20px' }}>
                        Launch your own campaign using one of Farsfund project templates.
                        </p>
                        </div>
                        <div>
                    </div>

                        <Link route={`/main`}>
                            <Button as="a" size='huge' style={{marginTop:'15px',marginBottom:'30px'}}>Go to Projects</Button>
                        </Link>
                        </div>

                    </Grid.Column>
                </Grid.Row>
    </Grid>
</Segment>

        <Segment inverted vertical>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                    <Grid.Column width={15} className="g-mx-15">
                            <p style={{marginTop:'5px', fontSize: '10px'}}>
                                Powered By
                            <a style={{marginLeft:'10px', fontSize: '12px'}} href="http://www.farschain.com">farschain.com</a>
                            </p>
                            <p>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </ResponsiveContainer>
)


export default HomepageLayout