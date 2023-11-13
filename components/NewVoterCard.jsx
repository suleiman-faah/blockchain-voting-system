/**
 * @param {string} party
 * @param {string} candidate
 * @param {()=>void} onVote
 * @returns {JSX.Element}
 */

import React from 'react';
import { promises as fs } from 'fs';

const NewVoterCard = async ({ }) => {
  // const candidate = props.candidates;
  // const voters = props.voters;
  const file = await fs.readFile(process.cwd() + 'app/voters.json', 'utf8');
  const data = JSON.parse(file);
  console.log(data);

  return (
    <div>
      <div>
        {/* {candidates.map(candidate =>
          <div key={candidate.id}>
            <h2>{candidate.name}</h2>
            <h3>{candidate.party}</h3>
            <h3>{candidate.age}</h3>
            <h3>{candidate.qualification}</h3>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default NewVoterCard;

