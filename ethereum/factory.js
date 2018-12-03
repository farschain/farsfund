import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
   //'0xAE419043Bebe574830a61c931F3227451529A1DC'
   //'0xa7bC4bb93118bA59CF865661e33e1DB66ac539E0'
    '0x5Cd8097C2Ffbd6c2767fD2E578Dd6478FF9E6505'
    //'0x05067F79ad80FBb6Bc8F7D42892233B8a1D70B2f'
   );

export default instance;