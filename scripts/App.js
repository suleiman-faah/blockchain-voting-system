import React, { useEffect, useState } from 'react';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from 'algorand-walletconnect-qrcode-modal';
import algosdk from 'algosdk';
import { formatJsonRpcRequest } from '@json-rpc-tools/utils';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const [Samuel, setSamuel] = useState(0);
  const [David, setDavid] = useState(0);
  const [Doris, setDoris] = useState(0);
  const [globalCount, setGlobalCount] = useState(0);
  const [walletbalance, setwalletbalance] = useState();
  const [connector, setConnector] = useState();
  const [connected, setConnected] = useState(false);

  const app_address = YOUR_APP_ID;

  // connecting the wallet to the DApp
  const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
  const port = '';
  const token = {
    'X-API-Key': 'YOUR-APIKEY-HERE',
  };

  const algodClient = new algosdk.Algodv2(token, baseServer, port);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!connector.connected) {
        console.log('No connection');
        return;
      } else {
        console.log('We have connection', connector);
      }
      const { accounts } = connector;
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setCurrentAccount(account);
        // await getAllRecs(); IMPORTANT FOR FUNCTIONALITY LATER
      } else {
        setCurrentAccount();
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    connector.killSession();
    console.log('Killing session for wallet with address: ', currentAccount);
    setCurrentAccount();
    setConnector();
    setConnected(false);
  };

  const connectWallet = async () => {
    try {
      const bridge = 'https://bridge.walletconnect.org';
      const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
      setConnector(connector);

      if (!connector.connected) {
        await connector.createSession();
        console.log('Creating new connector session');
      }
      connector.on('connect', (error, payload) => {
        if (error) {
          throw error;
        }
        // Get provided accounts
        const { accounts } = payload.params[0];
        console.log('connector.on connect: Connected an account with address:', accounts[0]);
        setCurrentAccount(accounts[0]);
        setConnector(connector);
        setConnected(true);
        setCurrentAccount(accounts[0]);
      });
      connector.on('session_update', (error, payload) => {
        if (error) {
          throw error;
        }
        // Get updated accounts
        const { accounts } = payload.params[0];
        setCurrentAccount(accounts[0]);
      });
      connector.on('disconnect', (error, payload) => {
        if (error) {
          throw error;
        }
        setCurrentAccount();
        setConnected(false);
        setConnector();
      });
      if (connector.connected) {
        const { accounts } = connector;
        const account = accounts[0];
        setCurrentAccount(account);
        setConnected(true);
      }
    } catch (error) {
      console.log("something didn't work in creating connector", error);
    }
  };

  // get count
  const getCount = async () => {
    let applicationInfoResponse = await algodClient.getApplicationByID(app_address).do();
    let globalState = [];
    globalState = applicationInfoResponse['params']['global-state'];

    console.log(`Samuel : ${globalState[0]['value']['uint']}`);
    setGlobalCount(globalState[0]['value']['uint']);

    console.log(`David : ${globalState[1]['value']['uint']}`);
    setGlobalCount(globalState[1]['value']['uint']);

    console.log(`Doris : ${globalState[2]['value']['uint']}`);
    setGlobalCount(globalState[2]['value']['uint']);
  };

  const addSamuel = async () => {
    // construct transaction
    let sender = currentAccount;
    let appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from('AddSamuel')));
    let params = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeApplicationNoOpTxn(sender, params, app_address, appArgs);
    let txId = txn.txID().toString();

    // time to sign . . . which we have to do with walletconnect api
    const txns = [txn];
    const txnsToSign = txns.map((txn) => {
      const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64');
      return {
        txn: encodedTxn,
      };
    });

    const requestParams = [txnsToSign];
    const request = formatJsonRpcRequest('algo_signTxn', requestParams);
    const result = await connector.sendCustomRequest(request);

    // have to go on phone and accept the transaction
    const decodedResult = result.map((element) => {
      return element ? new Uint8Array(Buffer.from(element, 'base64')) : null;
    });

    // send and await
    await algodClient.sendRawTransaction(decodedResult).do();
    await algosdk.waitForConfirmation(algodClient, txId, 2);

    let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
    console.log('Called app-id:', transactionResponse['txn']['txn']['apid']);

    if (transactionResponse['global-state-delta'] !== undefined) {
      console.log('Global State updated:', transactionResponse['global-state-delta']);
      await getCount();
    }
  };

  const addDavid = async () => {
    // construct transaction
    let sender = currentAccount;
    let appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from('AddDavid')));
    let params = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeApplicationNoOpTxn(sender, params, app_address, appArgs);
    let txId = txn.txID().toString();

    // time to sign . . . which we have to do with walletconnect api
    const txns = [txn];
    const txnsToSign = txns.map((txn) => {
      const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64');
      return {
        txn: encodedTxn,
      };
    });

    const requestParams = [txnsToSign];
    const request = formatJsonRpcRequest('algo_signTxn', requestParams);
    const result = await connector.sendCustomRequest(request);

    // have to go on phone and accept the transaction
    const decodedResult = result.map((element) => {
      return element ? new Uint8Array(Buffer.from(element, 'base64')) : null;
    });

    // send and await
    await algodClient.sendRawTransaction(decodedResult).do();
    await algosdk.waitForConfirmation(algodClient, txId, 2);

    let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
    console.log('Called app-id:', transactionResponse['txn']['txn']['apid']);

    if (transactionResponse['global-state-delta'] !== undefined) {
      console.log('Global State updated:', transactionResponse['global-state-delta']);
      await getCount();
    }
  };
  const addDoris = async () => {
    // construct transaction
    let sender = currentAccount;
    let appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from('AddDoris')));
    let params = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeApplicationNoOpTxn(sender, params, app_address, appArgs);
    let txId = txn.txID().toString();

    // time to sign . . . which we have to do with walletconnect api
    const txns = [txn];
    const txnsToSign = txns.map((txn) => {
      const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64');
      return {
        txn: encodedTxn,
      };
    });

    const requestParams = [txnsToSign];
    const request = formatJsonRpcRequest('algo_signTxn', requestParams);
    const result = await connector.sendCustomRequest(request);

    // have to go on phone and accept the transaction
    const decodedResult = result.map((element) => {
      return element ? new Uint8Array(Buffer.from(element, 'base64')) : null;
    });

    // send and await
    await algodClient.sendRawTransaction(decodedResult).do();
    await algosdk.waitForConfirmation(algodClient, txId, 2);

    let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
    console.log('Called app-id:', transactionResponse['txn']['txn']['apid']);

    if (transactionResponse['global-state-delta'] !== undefined) {
      console.log('Global State updated:', transactionResponse['global-state-delta']);
      await getCount();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getCount();
    console.log('currentAccount:', currentAccount);
  }, [currentAccount]);

  return (
    <div>
      <div>
        <div>Making a Blockchain Vote App</div>
        {!currentAccount && <button onClick={connectWallet}>Connect Wallet</button>}
        {currentAccount && (
          <>
            <div>Samuel: {addSamuel}</div>
            <div>David: {addDavid}</div>
            <div>Doris: {addDoris}</div>
            <button onClick={add}>Add</button>
            <button onClick={deduct}>Deduct</button>
            <button onClick={disconnectWallet}>Disconnect Wallet</button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
