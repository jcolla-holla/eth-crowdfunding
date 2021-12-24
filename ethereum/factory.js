import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x7dBB77f942A65D4c011ABeFa11BF290c6D2dbDCF" // the address that the contract was deployed already manually w deploy.js
);

export default instance;