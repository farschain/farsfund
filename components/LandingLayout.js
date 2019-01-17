import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
//import Header from './Header';


export default (props) => {
    return (
        <div>
            <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
                <style jsx global>{`
                  body{
                    background: #F7F7F7 !important
                  }
               `}</style>
            </Head>
           
            {/* <Header /> */}
            {props.children}
        </div>
    );

};