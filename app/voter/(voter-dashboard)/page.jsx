'use client';

import VoterCard from '~/components/VoterCard';

const VotingAreaPage = () => {
  return (
    <>
      <div className="flex flex-wrap gap-5">
        <VoterCard
          candidate="John Doe"
          party="Some Useless Party"
          onVote={() => {
            console.log('onVote: John Doe');
          }}
        />
        <VoterCard
          candidate="Samuel L Jackson"
          party="Another Useless Party"
          onVote={() => {
            console.log('onVote: Samuel L Jackson');
          }}
        />
        <VoterCard
          candidate="Jane Doe"
          party="Yet Another Useless Party"
          onVote={() => {
            console.log('onVote: Jane Doe');
          }}
        />
      </div>
    </>
  );
};

export default VotingAreaPage;
