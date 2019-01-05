import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes'; 

export default() =>{
    return(
        <Menu style={{ marginTop: '10px' }}>
            <Link route='/main'>
                <a style={{ marginTop: '10px', marginLeft: '5px' }}>
                    <img src="/static/logofarsfund.png" width="80px" />
                </a>
            </Link>
            <Menu.Menu position="right">
                <Link route='/main'>
                    <a className="item">
                        Projects
                    </a>
                </Link>
                <Link route='/campaigns/new'>
                    <a className="item">
                        Make a Project !
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}