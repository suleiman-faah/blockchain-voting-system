import algosdk from 'algosdk';
import dotenv from 'dotenv';

dotenv.config();

let myAccount = algosdk.mnemonicToSecretKey(process.env.ACCOUNT_MNEMONIC);

const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';
const token = {
  'X-API-Key': process.env.API_KEY,
};

// This variable is our client. It is the link between our code and the blockchain
const algodClient = new algosdk.Algodv2(token, baseServer, port);

(async () => {
  try {
    let params = await algodClient.getTransactionParams().do();

    // reciever will be some random address.
    const receiver = 'HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA';
    const enc = new TextEncoder();
    const note = enc.encode('My first transaction on Algo!');

    let amount = 100000; // equivalent to 0.1 ALGO
    let sender = myAccount.addr;

    // creating the transaction
    let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: receiver,
      amount: amount,
      node: note,
      suggestedParams: params,
    });

    console.log('ALGO here');

    let accountInfo = await algodClient.accountInformation(myAccount.addr).do();

    console.log(`Account balance: %${accountInfo.amount} microAlgos`);

    // sign transaction with your private key, which is the mnemonic
    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();

    console.log(`Signed transaction with txID: ${txId}`);

    await algodClient.sendRawTransaction(signedTxn).do();

    // Wait for confirmation
    let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
    accountInfo = await algodClient.accountInformation(myAccount.addr).do();

    console.log(`Transaction Amount: ${confirmedTxn.txn.txn.amt} microAlgos`);
    console.log(`Transaction Fee: ${confirmedTxn.txn.txn.fee} microAlgos`);
    console.log(`Account balance: ${accountInfo.amount} microAlgos`);
  } catch (err) {
    console.error('Failed to get apps from the sdk', err);
    process.exit(1);
  }
})();
