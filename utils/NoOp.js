import Signer from '~/utils/Signer';
import algosdk from 'algosdk';

const NoOp = async (index, choice, client)  => {
  try{
    const address = await Signer();

    const sender = address
    // console.log(userAccount.current)

    // declare application state storage (immutable)
    const localInts = 0;
    const localBytes = 1;
    const globalInts = 24; //# 4 for setup + 20 for choices. Use a larger number for more choices.
    const globalBytes = 1;

    let vote = "vote";
    const appArgs = [];
    appArgs.push(
      new Uint8Array(Buffer.from(vote)),
      new Uint8Array(Buffer.from(choice)),
    );
    let params = await client.getTransactionParams().do()
    params.fee = 1000;
    params.flatFee = true;

    // create unsigned transaction
    let txn = algosdk.makeApplicationNoOpTxn(sender, params, index, appArgs);
    // Sign the transaction

    // Use the AlgoSigner encoding library to make the transactions base64
    const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    let signedTxs  = await AlgoSigner.signTxn([{txn: txn_b64}]);
    console.log(signedTxs)

    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);

    // Send the transaction through the SDK client
    let txId = await client.sendRawTransaction(binarySignedTx).do();
    console.log(txId)

    const confirmedTxn = await algosdk.waitForConfirmation(client, txId, 4);
    console.log("confirmed " + confirmedTxn)

    //Get the completed Transaction
    console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

    // display results
    let transactionResponse = await client.pendingTransactionInformation(txId).do();
    console.log(`Transaction response: ${transactionResponse}`)
    console.log("Called app-id: ",transactionResponse['txn']['txn']['apid']);
    if (transactionResponse['global-state-delta'] !== undefined ) {
      console.log("Global State updated: ",transactionResponse['global-state-delta']);
    }
    if (transactionResponse['local-state-delta'] !== undefined ) {
      console.log("Local State updated: ",transactionResponse['local-state-delta']);
    }
  }catch(err){
    console.log(`A problem occurred while performing transaction: ${err}`);
    console.error(err);
  }
};

export default NoOp;
