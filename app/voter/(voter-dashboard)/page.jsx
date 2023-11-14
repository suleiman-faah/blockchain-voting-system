'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_VOTE } from '~/redux/reducers/voteSlice';
import VoterCard from '~/components/VoterCard';
import dotenv from 'dotenv';
import algosdk from 'algosdk';
import NoOp from '~/utils/NoOp';

dotenv.config();

const VotingAreaPage = () => {
  const token = {
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY
  };
  const explorer = process.env.EXPLORER;
  const [userAddress, setUserAddress] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const app_id = parseInt(process.env.NEXT_PUBLIC_APP_ID, 10);

  const modalContent = (
    <div id="popup-modal" tabindex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You can go to <a href={explorer} target="_blank">Algo Explorer</a> to see the transaction details.</h3>
            <button onClick={() => setShowModal(false)} data-modal-hide="popup-modal" type="button" className="w-full text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const votees = [
    {
      "uuid": "3ff0f22ef8844d149b851f618d019ac0",
      "name": "John Doe",
      "party": "LFR",
      "age": 24,
      "qualification": "Masters"
    },
    {
      "uuid": "632b735c01254a2caf3422a7920f2433",
      "name": "Samuel L. Jackson",
      "party": "NDA",
      "age": 22,
      "qualification": "Diploma"
    },
    {
      "uuid": "d1e738c735844d3bbc5177cefbc5985d",
      "name": "Jane Doe",
      "party": "ICE",
      "age": 21,
      "qualification": "PHD"
    }
  ];

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_JSON, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token',
        },
        body: JSON.stringify(process.env.NEXT_PUBLIC_JSON ),
        mode: 'no-cors', // Add this line
      });
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

  const submitVoteHandler = (id, name) => {
    //log clicked button
    console.log(`You voted user candidate with ID: ${id} corresponding to ${name}`);
    console.log(`App ID: ${app_id}`);

    dispatch(SET_VOTE({ id }));

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = true;
    })

    NoOp(app_id, name, client);
    // return <Modal candidate={candidateValue} />
    setShowModal(true);
    if (showModal) {
      const modalButton = document.getElementById('popup-modal');
      modalButton.disabled = false;
    }
    // noop(process.env.NEXT_PUBLIC_APP_ID, value);
  }

  return (
    <div className="flex flex-wrap gap-5">
      {
        votees.map((votee, idx) => (
          <div key={idx}>
            <VoterCard 
              name={votee.name}
              party={votee.party}
              onVote={() => submitVoteHandler(votee.uuid, votee.name)}
            />
          </div>
        ))
      }
      {showModal && modalContent}
    </div>
  );
};

export default VotingAreaPage;
