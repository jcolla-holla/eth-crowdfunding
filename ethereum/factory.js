import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xB044a605BabABc9574EDdA2725F9b6C7309bEaEc" // the address that the contract was deployed already manually w deploy.js
);

export default instance;