'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import Providers from './Providers';
import algosdk from 'algosdk';
import dotenv from 'dotenv';

dotenv.config();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [showResult, setShowResult] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const token = {
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY
  };

  let client = new algosdk.Algodv2(token, process.env.NEXT_PUBLIC_SERVER_ADDRESS, process.env.NEXT_PUBLIC_SERVER_PORT);

  // read global state of application
  const readGlobalState = async (index) => {
    try{
      let applicationInfoResponse = await client.getApplicationByID(index).do();
      let globalState = applicationInfoResponse['params']['global-state']
      return globalState.map((state) =>{
        return state
      })
    }catch(err){
      console.log(err)
    }
  };

  const args = [
    btoa("RegBegin"),
    btoa("RegEnd"),
    btoa("VoteBegin"),
    btoa("VoteEnd"),
    btoa("Creator"),
  ];

  const resultHandler = async () =>{
    let filteredItems = [];
    setLoading("loading...");
    const gloablState = await readGlobalState(process.env.NEXT_PUBLIC_APP_ID);
    gloablState.forEach(item => {
    if (!args.includes(item.key)) {
      filteredItems.push(item)
      setData(filteredItems)
      setLoading("")
    };
  })
  setShowResult(true);
};

  return (
    <html lang="en" className="relative">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blockchain Voting System</title>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
