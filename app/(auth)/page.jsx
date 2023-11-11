'use client';

import React, {useRef, useState} from 'react';
import { Form, FormLayout, SubmitButton } from '@saas-ui/react';
import { Lock, User } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import algosdk from 'algosdk';
import dotenv from 'dotenv';
import Alert from '~/components/Alert';

dotenv.config();

export default function Home() {

  const client = new algosdk.Algodv2(process.env.NEXT_PUBLIC_API_KEY, process.env.NEXT_PUBLIC_SERVER_ADDRESS, process.env.NEXT_PUBLIC_SERVER_PORT);

  const router = useRouter();

  let userAccount = useRef();
  const connectAlgoSigner = async () => {
  
    await AlgoSigner.connect();
    register();
    getUserAccount();
  
  };

  const getUserAccount = async () => {
    userAccount.current =  await AlgoSigner.accounts({
      ledger: 'TestNet'
    })
    const address = userAccount.current[0]['address'];
    console.log(`Connected address: ${address}`);
    router.push('/voter');
    //  console.log(userAccount.current)
      
  };

  const register = () => {
    if(userAccount.current === undefined){
      // alert("Connect your wallet")
      Alert("Connect your wallet");
    }else{
      Optin(userAccount.current[0].address, process.env.NEXT_PUBLIC_APP_ID)
    }

  } 

   //OPTIN
  // create unsigned transaction
  const Optin = async (sender, index) => {
    try{
      let params = await client.getTransactionParams().do()
      params.fee = 1000;
      params.flatFee = true;

      let txn = algosdk.makeApplicationOptInTxn(sender, params, index);
      // sign, send, await
      // Sign the transaction

      const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(txn.toByte());

      let signedTxs  = await AlgoSigner.signTxn([{txn: txn_b64}])
      console.log(signedTxs)

      // Get the base64 encoded signed transaction and convert it to binary
      let binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);

        // Send the transaction through the SDK client
      let txId = await client.sendRawTransaction(binarySignedTx).do();
      console.log(txId)
                            
      // Wait for transaction to be confirmed
      const confirmedTxn = await algosdk.waitForConfirmation(client, txId, 4);
      console.log("confirmed" + confirmedTxn)

      //Get the completed Transaction
      console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
          // display results
      let transactionResponse = await client.pendingTransactionInformation(txId).do();
      console.log("Opted-in to app-id:",transactionResponse['txn']['txn']['apid'])
    }catch(err){
      Alert("An issue occured while optin-in transaction");
      console.error(err)
    }
  }


  return (
    <>
      <Form onSubmit={() => {getUserAccount()}}>
        <FormLayout className="flex flex-col items-center">
          <h2 className="mb-4 text-2xl font-semibold">Login to continue</h2>
          <SubmitButton
            className="bg-primary"
            type="button"
            size={'lg'}
            onClick={connectAlgoSigner}
            // onClick={handlePeraWalletLogin}
          >
            <User weight="fill" className="mr-2 text-white" size={20} />
            <span>As a voter (with AlgoSigner)</span>
          </SubmitButton>

          {/* <SubmitButton
            className="border border-primary bg-transparent text-primary hover:bg-transparent"
            type="button"
            onClick={() => router.push('/admin-login')}
          >
            <Lock weight="fill" className="mr-2 text-primary" size={20} />
            <span>As an admin</span>
          </SubmitButton> */}
        </FormLayout>
      </Form>
    </>
  );
}
