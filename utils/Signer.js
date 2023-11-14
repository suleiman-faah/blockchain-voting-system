import {useRef} from 'react';

const Signer = async () => {

  try {
    const accounts =  await AlgoSigner.accounts({
      ledger: 'TestNet'
    });
    return accounts && accounts.length > 0 ? accounts[0]['address'] : '';
  } catch (error) {
    console.error('Error fetching user account:', error);
    return '';
  }
}
export default Signer;
