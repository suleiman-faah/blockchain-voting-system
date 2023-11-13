/**
 * @param {string} party
 * @param {string} candidate
 * @param {()=>void} onVote
 * @returns {JSX.Element}
 */

import React from 'react';

const VoterCard = ({ name, party, age, qualificaton, onVote }) => {
// const VoterCard = ({ candidate, party, onVote, isDisabled }) => {
  return (
    <div className="w-max">
      <div className="photo flex h-[300px] w-full flex-col bg-black px-3 py-2 md:max-w-[200px]">
        <span className="text-white">
          {name}
        </span>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <span className="text-white">
          {party}
        </span>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <span className="text-white">
          {age}
        </span>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <span className="text-white">
          {qualificaton}
        </span>
      </div>
      <button
        onClick={onVote}
        className="block w-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
      >
        Vote
      </button>
    </div>
  );
};

export default VoterCard;
