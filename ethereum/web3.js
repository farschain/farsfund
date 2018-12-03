import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    // we are in the browser and metamask is runnig.
    web3 = new Web3(window.web3.currentProvider);


    (async () => {
        const accounts = await web3.eth.getAccounts();
        const network = await web3.eth.net.getNetworkType();
        if(accounts.length == 0)
        {
            console.log('MetaMask is Locked');
        }
        else
        {
            console.log(`MetaMask installed, unlocked and connected to ${network} Network.`);
        }
    })();
    
    

} else{
        console.log('No MetaMask');
        // we are on the server *OR* the user is not runnig metamask
        const provider = new Web3.providers.HttpProvider(
            'https://rinkeby.infura.io/v3/0a226ab70f0c4aa1952fadf15773518c'
        );
        web3 = new Web3(provider);
}

export default web3;