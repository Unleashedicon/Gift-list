const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const merkleTree = new MerkleTree(niceList);
  const yourName = "Norman Block";
  const index = niceList.findIndex(n => n === yourName);
  if (index === -1) {
    console.log("Your name is not in the list.");
    return;
  }
  const proof = merkleTree.getProof(index);
  console.log('Client: Proof is', proof);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: yourName,
    proof: proof,// TODO: add request body parameters here!
  });
  console.log({ gift });
}

main();