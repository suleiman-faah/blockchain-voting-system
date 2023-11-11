const algosdk = require('algosdk');

const ALGO_FAUCET_BASE_URL = 'https://bank.testnet.algorand.network/';

const createAccount = () => {
  const newAccount = algosdk.generateAccount();
  const newAccountAddress = newAccount.addr;


  (async() => {
    let params = await algodClient.getTransactionParams().do();
  
    // NOTE: Using params to create "txn" and 
    // obtaining recoveredAccount are in the full GitHub example
    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    let sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    
    console.log("Transaction : " + sendTx.txId);
  })().catch(e => {
      console.log(e);
  });

  // const newAccountID = a
  console.log('');
  console.log(`Account Address: ${newAccountAddress}`);
  const newAccountMnemonic = algosdk.secretKeyToMnemonic(newAccount.sk);
  console.log('');
  console.log(`Account Mnemonic: ${newAccountMnemonic}`);
  console.log('');
  // console.log(`Account ID: ${newAccountID}`);
  // console.log('');
  console.log('**********************************************');
  console.log('Account created. Save off Mnemonic and address');
  console.log('**********************************************');
  console.log('');
  console.log(
    'You can fund account here: ',
    `${ALGO_FAUCET_BASE_URL}?account=${newAccountAddress}`,
  );
  console.log('');
};

createAccount();
