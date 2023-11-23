'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useReward } from 'react-rewards';

const ChangeStatePage = () => {
  const votes = useSelector((state) => state.vote.votes);
  const { reward } = useReward('confettiId', 'confetti', {
    spread: 180,
    elementCount: 100,
    elementSize: 30,
  });
  const { reward: balloonsReward } = useReward('balloonsId', 'balloons', {
    spread: 120,
    elementCount: 50,
    elementSize: 30,
  });
  const votees = [
    {
      "uuid": "3ff0f22ef8844d149b851f618d019ac0",
      "name": "John Doe",
      "party": "LFR",
      "age": 24,
      "votes": 12,
      "qualification": "Masters"
    },
    {
      "uuid": "632b735c01254a2caf3422a7920f2433",
      "name": "Samuel L. Jackson",
      "party": "NDA",
      "age": 22,
      "votes": 5,
      "qualification": "Diploma"
    },
    {
      "uuid": "d1e738c735844d3bbc5177cefbc5985d",
      "name": "Jane Doe",
      "party": "ICE",
      "age": 21,
      "votes": 10,
      "qualification": "PHD"
    }
  ];

  // Find the candidate with the highest number of votes
  const { name: winner, party: winnerParty, votes: totalVotes } = votees.reduce((prev, current) => {
    return (prev.votes > current.votes) ? prev : current;
  });

  useEffect(() => {
    setTimeout(() => {
      reward();
      balloonsReward();
    }, 500);
  }, []);

  return (
    <>
      <title>Results | Blockchain Voting System</title>
      <div className="mb-24 flex flex-col items-center">
        <h2 className="mb-8 text-2xl font-bold">We have a Winner!</h2>

        <p id="confettiId" className="text-3xl font-black">
          { winner } — { winnerParty }
        </p>
        <p id="balloonsId" className="mt-8 text-xl text-primary">
          { totalVotes } votes
        </p>
      </div>

      <TableContainer>
        <Table size="md" variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Party</Th>
              <Th>Qualification</Th>
              <Th>Votes</Th>
            </Tr>
          </Thead>

          <Tbody>
            {
              votees.map((votee, idx) => (
                <Tr key={idx}>
                  <Td>{votee.name}</Td>
                  <Td>{votee.age}</Td>
                  <Td>{votee.party}</Td>
                  <Td>{votee.qualification}</Td>
                  <Td>{votee.votes}</Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ChangeStatePage;
