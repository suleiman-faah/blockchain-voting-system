'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_VOTE } from '~/redux/reducers/voteSlice';
import VoterCard from '~/components/VoterCard';
import Modal from '~/components/Modal';
import Alert from '~/components/Alert';
import dotenv from 'dotenv';
import algosdk from 'algosdk';

dotenv.config();

const VotingAreaPage = () => {
  const token = {
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY
  };
  const [userAddress, setUserAddress] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/candidates.json');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };

  let client = new algosdk.Algodv2(token, process.env.NEXT_PUBLIC_SERVER_ADDRESS, process.env.NEXT_PUBLIC_SERVER_PORT);

  let userAccount = useRef();
  const dispatch = useDispatch();

  const getUserAccount = async () => {
    userAccount.current =  await AlgoSigner.accounts({
      ledger: 'TestNet'
    })
    if (userAccount.current) {
      setUserAddress(userAccount.current[0]['address']);
    } else { console.log(`Got nothing for userAddress: ${userAddress}`) }
  }

  useEffect(() => {
    getUserAccount();
  }, [userAddress]);
  // console.log(`User Address: ${userAddress}`)

  const args = [
    btoa("RegBegin"),
    btoa("RegEnd"),
    btoa("VoteBegin"),
    btoa("VoteEnd"),
    btoa("Creator"),
  ];

  //  CALL(NOOP)
  // call application with arguments
  const noop = async (index, choice)  => {
    try{
      userAccount.current = await AlgoSigner.accounts({
        ledger: 'TestNet'
      });
      const sender = userAccount.current[0]['address']
      // console.log(userAccount.current[0]['address'])
      console.log(userAccount.current)

      let vote = "vote";
      // let choice = localStorage.getItem("candidate")
      // console.log("choice is " + choice)
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
    console.log("Called app-id: ",transactionResponse['txn']['txn']['apid']);
    if (transactionResponse['global-state-delta'] !== undefined ) {
      console.log("Global State updated: ",transactionResponse['global-state-delta']);
    }
    if (transactionResponse['local-state-delta'] !== undefined ) {
      console.log("Local State updated: ",transactionResponse['local-state-delta']);
    }
    }catch(err){
      Alert(err);
      console.error(err);
    }
  };

  const submitVoteHandler = (id) => {
    //log clicked button
    console.log(`You voted user candidate with ID: ${id}`);

    const value = candidateValue;
    console.log(value);
    dispatch(SET_VOTE({ candidateValue }));

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = true;
    })

    // noop(process.env.NEXT_PUBLIC_APP_ID, value);
    noop(buttonIndex, value);

    // return <Modal candidate={candidateValue} />

    // noop(process.env.NEXT_PUBLIC_APP_ID, value);
  }

  return (
    <>
      {/* {getStaticProps()} */}
      <div className="flex flex-wrap gap-5">
        {candidates.map((candidate) =>
          <div key={candidate.id}>
            <VoterCard 
              name={candidate.name}
              party={candidate.party}
              age={candidate.age}
              qualificaton={candidate.qualificaton}
              onVote={() => submitVoteHandler(candidate.id)}
            />
          </div>
        )}
      </div>

    </>
  );
};

export default VotingAreaPage;
