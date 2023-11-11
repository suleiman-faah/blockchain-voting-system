import algosdk from "algosdk";
import dotenv from "dotenv";

dotenv.config();

const algodToken = process.env.API_KEY;
const algodServer = process.env.SERVER_ADDRESS;

// connecting the wallet to the DApp
export const algodClient = new algosdk.Algodv2(algodToken, algodServer);

export const voterAddress = algodClient.accountInformation(account)
export const voterMnemonic = algodClient.mnemonic;