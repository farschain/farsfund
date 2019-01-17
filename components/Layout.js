import React from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';


export default (props) => {
    const loading = props.loading;
    return (
        <Container>
            <Dimmer active={loading} style={{ position: 'fixed !important' }}>
                <Loader>Loading</Loader>
            </Dimmer>
            <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
                <style jsx global>
                    {`
                  .ui.popup:before{
                    postion: unset !important;
                    display: none !important;
                  }
               `}
                </style>
            </Head>
            <Header />
            {props.children}
        </Container>
    );
};