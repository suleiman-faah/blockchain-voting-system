# ⛓️  Blockchain Voting System ⛓️

This is a web3 solution built with [PyTeal](https://developer.algorand.org/docs/sdks/python/) and [Next.js](https://nextjs.org/). The project is deployed on the [Algorand](https://www.algorand.com/) Blockchain network. 
To learn more about how to build web3 solutions on the Algorand network, visit the [Algorand Developer Guide](https://developer.algorand.org/docs/).

The goal of this system is to decentralized the process of voting for any sort of activity that requires voting processes to arrive at some outcome. The system is for now, developed to be utilized in tertiary educational institutions.

___

# 🔑 Key Notes

## A Brief Introduction to Technological Concepts

### Algorand Blockchain

Algorand is an open source decentralized blockchain netowrk on which anyone can build applications. It is a steady growing technology that has solved a fourth problem in the Blockchain ecosystem, which is sustainability.
Not only is it sustainable, it also almost 99% energy-efficient.

A decentralized network of computers, usually termed, nodes, work together to verify transactions before they are finally added to the ledger using a consensus protocol. As a result, the vast majority of a Blockchain's
energy requirement is dependent on the consensus protocol.

**Why Algorand?**

Algorand, with its technology, provides quite a large number of benefits over other blockchain networks. The existing protocols have several issues that have been mitigated in Algorand's Pure-Proof-of-Stake protocol, thereby enhancing sustainability.
Let us look at a comparison between existing protocols with an extract from [Blockbeam](https://platform.blockbeam.io)

### Why Algorand?

| Protocol          | Critical Issues |
|:-----------------:|:----------------|
| Proof of Work (Miners compete with each other to append the next block and earn a reward for the effort, fighting to win an expensive computational battle)     | Huge electrical consumption, Concentration of governance in few mining farms, Soft-forking of the blockchain |
| Bonded Proof of Stake (Validators bind their stake, to show their commitment in validating and appending a new block. Misbehaviors are punished) | Participating in the consensus protocol makes users stake illiquid, Risk of economic barrier to entry |
| Delegated Proof of Stake (Users delegate the validation of new blocks to a fixed committee, through weighted voting based on their stakes.) | Known delegate nodes, therefore exposed to DDoS attacks, Centralization of governance |
*Source: Cosimo Bassi (Algorand Solutions Architect)*

From the table above, it can be seen that the Proof of Work protocol uses a lot of energy and even work is wasted eventually on deleted chains.

Proof of Stake protocols also have issues related to entry barriers and is centralized.

With Algorand's Pure Proof of Stake protocol, each round of consensus protocol appends a new block in the blockchain. The process involved is:
> - One account is chosen to propose a block
> - A committee is chosen to filter and soft vote on the proposal.
> - After 1st phase of certificatoin, another committee is chosen to vote on certifying the block.
> - The block is then written to the blockchain after successfully passing 2nd phase of certificatoin.

**Benefits of the Algorand Blockchain Technology**
One can boast in the following benefits when using the Algorand Blockchain Technology:
> - Algorand has more speed, scalability and security as compared to other networks such as Ethereum.
> - Algorand charges very little transaction fee of 0.001 Algo.
> - Algorand executes 1000 transactions per second.
> - Block finality for Algorand takes only 4.5 seconds.
> - Algorand is carbon negative, hence, safe for the environment.

### Program Flow

**Normal User persective**

> - User creates a wallet
> - User connects wallet to the decentralized application (DApp)
> - User confirms connection via Pera Wallet (mobile application)
> - User signs a vote transaction
> - User confirms signed transaction on phone.

**Admin User persective**
> - User connects wallet to the decentralized application (DApp)
> - User sees votes summary from chart
> - User adds vote items

### The Blockchain Aspect (Code Review)
To use the DApp, it is necessary to note that one must have a wallet. Sample scripts are shown below with explanation to what they represent in the project.
All data is stored on the Algorand network.

**Connecting to the Blockchain**
There are other ways we can connect to the Blockchain, quite overkill (they have limited support and have cumbersome setup), as a result, the shortest and most convenient way is to utilize a third-party provider,
purestake, to interact with the Blockchain network.

1) [Register an account](https://developer.purestake.io/) at purestake for free. You will need the API key to run the DApp and create a wallet in the DApp
At the root of the project, create a ```.env``` file, copy and paste the API key from purestake in there. It should look somewhat like...
```bash
    API_KEY=YOURAPIKEY
    ACCOUNT_MNEMONIC=YOURMNEMONICHERE
    ACCOUNT_ADDRESS=YOURADDRESSHERE
```
The ACCOUNT_MNEMONIC, together with the ACCOUNT_ADDRESS, is got when your wallet is created

In the ```scripts/createAccount``` file, we import the algorand sdk. We create an account using ```algosdk.generateAccount()``` which is stored in ```myAccount``` variable.
Likewise, we get the secret mnemonic, which is unique to every account, using ```let accountMnemonic = algosdk.secretKeyToMnemonic(myAccount.sk)``` and we can view the account's address by calling
```myAccount.addr```. With this, we can now populate the ```ACCOUNT_MNEMONIC``` and the ```ACCOUNT_ADDRESS``` variables in the ```.env``` file.

Running `node scripts/createAccount.js` will create a wallet for interaction from console with JavaScript

2) Fund your wallet. The app is being ran on the testnet but can easily be switched to the mainnet, which we shall see later in the script. To fund your wallet, there are two options.
One of which is to use Perawallet (by importing the account to Perawallet, you can use the testnet faucet available in the DApp), and the other is to use algorand's [Bank Faucet](https://bank.testnet.algorand.network/)
which provides a convenient way to fund your wallet by inserting your wallet address and verifying a capture. After which some specified amount of Algos is transferred to your wallet account.

It can be quite tedious to interact with your wallet via codes alone so we will scale this hurdle by downloading Pera Wallet, available on playstore and appstore. It has an intuitive user interface for interacting with your Algorand wallet.
Once downloaded, press the `+` symbol and then press "Recover with Passphrase". Now in here, input the mnemonic you copied. It can be a hustle to type it all out so you can simply mail it to yourself and access the mail content from your phone.
Hit the "Recover" or "Submit" button and there you have it! You have successfully connected your wallet. All you need to do now is to switch the network by going to `Settings > Developer settings > node` and then switch to testnet. From there, you 
can fund your test wallet account directly within Pera Wallet using the faucet option.

**Creating the Wallet**
Making transactions is just one of the many possibilities available on the blockchain. The process of sending contracts accross the blockchain for other users on the network to interact with it is termed as *smart contract*
Algorand by default has its smart contracts compiled in Transaction Execution Approval Language abbreviated as TEAL, which is a low level language. However, to make things easy, we are provided with a mechanism called PyTeal which 
closely resembles Python, allowing us to write codes code easy to understand and later compile to TEAL.

**Writing the Smart Contract**
1) Activate your Python environment. Since we are going to be scripting in PyTeal, a Python library it would be advisable to create a virtual environment with which we can install the libraries so they don't get installed globally on the system. Currently,
there is a venv folder available in the project's root directory. To activate the virtual environment on a Windows Platform, run `source venv/bin/activate.ps1` and on a Linux Platform, you can run `source venv/bin/activate`

2) Head to the `counter.py` file in the `smart-contract` directory. There are two functions, one for approving transactionas on the smart contract, and another for clearing the state of the smart contract. *Note that this is for removing a smart contract from its 
balance record*. In the `approval_program` function resides all the logic for the contract as well as almost all the necessary calls to the contract. The summary of the `approval_program` in its skeletal form is as seen below.

```pyteal
def approval_program():
    program = Cond(
        [Txn.application_id() == Int(0), handle_creation],
        [Txn.on_completion() == OnComplete.OptIn, handle_optin],
        [Txn.on_completion() == OnComplete.CloseOut, handle_closeout],
        [Txn.on_completion() == OnComplete.UpdateApplication, handle_updateapp],
        [Txn.on_completion() == OnComplete.DeleteApplication, handle_deleteapp],
        [Txn.on_completion() == OnComplete.NoOp, handle_noop]
    )
    return compileTeal(program, Mode.Application, version=5)
```

The above code, is a method that contains conditional statements to handle each type of transaction called on our smart contract. In the case where there is no `application_id`, the `handle_creation` function is called, which we will elablorate on.

```pyteal
def approval_program():
    handle_creation = Seq(
        App.globalPut(Bytes("Count"), Int(0)),
        Return(Int(1))
    )
    handle_optin = Return(Int(0))
    handle_closeout = Return(Int(0))
    handle_updateapp = Return(Int(0))
    handle_deleteapp = Return(Int(0))
    scratchCount = ScratchVar(TealType.uint64)
    add = Seq([
        scratchCount.store(App.globalGet(Bytes("Count"))),
        App.globalPut(Bytes("Count"), scratchCount.load() + Int(1)),
        Return(Int(1))
    ])
    handle_noop = Seq(
            # First, fails immediately if this transaction is grouped with others
            Assert(Global.group_size() == Int(1)), 
            Cond(
                [Txn.application_args[0] == Bytes("Add"), add], 
            )
        ) # The NoOp transaction type is what makes all the generic calls to an application, in this case that will be to add/deduct from our counter variable
    program = Cond(
        [Txn.application_id() == Int(0), handle_creation],
        [Txn.on_completion() == OnComplete.OptIn, handle_optin],
        [Txn.on_completion() == OnComplete.CloseOut, handle_closeout],
        [Txn.on_completion() == OnComplete.UpdateApplication, handle_updateapp],
        [Txn.on_completion() == OnComplete.DeleteApplication, handle_deleteapp],
        [Txn.on_completion() == OnComplete.NoOp, handle_noop]
    )
return compileTeal(program, Mode.Application, version=5)
```
In the above snippet, we define the `handle_creation` funtion in PyTeal syntax. Remember that this function is only called when our smart contract is inexistent. We use *Seq()* to inform the computer that our function will contain a sequence of 
This count is tied to only one instance of a vote item, in the main application, we have 3 items, hence, we will create two more counts "Count2" and "Count3" respectively to handle counts for each vote item.
expressions, then we define a global variable called Count, to store integer byte data, and we set the value to zero. This will keep track of the a counter on the number of votes transacted on the smart contract.
Next, we create functions to handle the rest of the smart contract transactions. These will also return Integer type values.

> - `optin`: Is the function that handles the instance when an account Opts into the DApp.
> - `closeout`: Is the function that handles the instance when an account closes out of the DApp.
> - `updateapp`: Is the function that handles the edit and update of the approval program.
> - `deleteapp`: Is the function that handles the deletion of a DApp from the creator's account, thereby removing all global states that have been stored.
> - `scratchcount`: This is a temporary variable used to store, modiy and update our global count in the computer's scratch space.

We now define a noop function to make all generic calls to our DApp, the calls we will make in this case is only an add count call. So as you can see in the `add = Seq()` function, we increment count each time there is an interaction and store it in the scratch space.

*NB:* The process of signing in a transaction can be likened to OptIn

The next blocks of code below are for clearing the program state and writing to the `counter_approval` and `counter_clear` TEAL files.

```pyteal
def clear_state_program():
    program = Return(Int(1))
    return compileTeal(program, Mode.Application, version=5)

if __name__ == "__main__":

    path = "./smart-contract/artifacts"

    with open(os.path.join(path, "counter_approval.teal"), 'w') as f:
        f.write(approval_program())

    with open(os.path.join(path, "counter_clear.teal"), 'w') as f:
        f.write(clear_state_program())
print(approval_program());
```

Now that the smart contract is ready, all we need to do is fire up the terminal and run `python3 smart-contract/counter.py` command to compile the code to *TEAL* language.
*NB:* You may need to create an empty `counter_approval.teal` file in the `smart-contract/artifacts/` directory before running the command to compile the conter.py file.

**Deploying to testnet**
At this stage, we are ready to see things in action. Things will go very bad here if the `.env` constant variables are not set rightly. Let's take a look at the code below.

```pyteal
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
const port = '';
const token = {
    'X-API-Key': process.env.API_KEY
}

const algodClient = new algosdk.Algodv2(token, baseServer, port); 

let myaccount = algosdk.mnemonicToSecretKey(process.env.ACCOUNT_MNEMONIC);
let sender = myaccount.addr;

async function compileProgram(client, TealSource) {
    let encoder = new TextEncoder();
    let programBytes = encoder.encode(TealSource);
    let compileResponse = await client.compile(programBytes).do();
    let compileBytes = new Uint8Array(Buffer.from(compileResponse.result, "base64"));

    return compileBytes;
}
```

In the snippet above, we set our base server, port, and token. The token contains our API_KEY which is located in the `.env` file. Next, we pass these variables as arguments to the initialized
`algosdk.Algodv2` which is an algosdk daemon, as our client. We then set our account and sender variables making reference to the `ACCOUNT_MNEMONIC` set in the `.env` file. For security 
purposes, the `.env` file is not shipped with the DApp, you will need to create it. Now, we create an async helper function named compileProgram to compile our TEAL program to binary for deployment. The function
encodes the TEAL codes and compiles to base64 binary file and is returned as `compileBytes`

```pyteal
(async () => {
    try {
        const localInts = 0
        const localBytes = 0
        const globalInts = 1
        const globalBytes = 0

        let approvalProgramfile = await open('./smart-contract/artifacts/counter_approval.teal');
        let clearProgramfile = await open('./smart-contract/artifacts/counter_clear.teal');

        const approvalProgram = await approvalProgramfile.readFile();
        const clearProgram = await clearProgramfile.readFile();
        const approvalProgramBinary = await compileProgram(algodClient, approvalProgram);
        const clearProgramBinary = await compileProgram(algodClient, clearProgram);

        let params = await algodClient.getTransactionParams().do();
        const onComplete = algosdk.OnApplicationComplete.NoOpOC;

        console.log("Deploying Application. . . . ");

        let txn = algosdk.makeApplicationCreateTxn(sender, params, onComplete, 
            approvalProgramBinary, clearProgramBinary, 
            localInts, localBytes, globalInts, globalBytes,);
        let txId = txn.txID().toString();

        // Sign the transaction
        let signedTxn = txn.signTxn(myaccount.sk);
        console.log(`Signed transaction with txID: ${ txId }`);

        // Submit the transactiom
        await algodClient.sendRawTransaction(signedTxn).do();

        // Wait for confirmation
        await algosdk.waitForConfirmation(algodClient, txId, 2);

        // print the app-id
        let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
        let appId = transactionResponse['application-index'];
        console.log(`Created new with app-id: ${ appId }`);
} catch (err) {
    console.error(`Failed to deploy! ${ err }`);
    process.exit(1);
}
})()
```

Now, with the help of our helper function, we are able to read and compile the content of our TEAL files into set variables. We then fetch suggested parameters from the client DApp (`let params...`), and define what to do 
when we finish creating our DApp using the `onComplete` constant variable. Next, we store the transaction_id using `let txn = algosdk.makeApplicationCreateTxn(...)` as `txnId`. From here, we are able to submit the contract
after a confirmation. After confirmation, our `appId` is consoled to terminal. We now have to simply run `node scripts/deployCounter.js` and wait for confirmation. After which an `appID` is consoled to terminal. Copy this Id.


*NB:* Without the binary code, we cannot deploy our smart contract


## 🐎 Getting Started

First, run the development server:


`npm run dev` or `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

