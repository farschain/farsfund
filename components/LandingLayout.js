import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
//import Header from './Header';


export default (props) => {
    return (
        <div>
            <Head>
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