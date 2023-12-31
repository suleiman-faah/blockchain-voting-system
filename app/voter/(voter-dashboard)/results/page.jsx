'use client';
import { useEffect } from 'react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useReward } from 'react-rewards';

const ChangeStatePage = () => {
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

  useEffect(() => {
    setTimeout(() => {
      reward();
      balloonsReward();
    }, 500);
  }, []);

  return (
    <>
      <div className="mb-24 flex flex-col items-center">
        <h2 className="mb-8 text-2xl font-bold">We have a Winner!</h2>

        <p id="confettiId" className="text-3xl font-black">
          John Doe — Some Useless party
        </p>
        <p id="balloonsId" className="mt-8 text-xl text-primary">
          2 votes
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
            <Tr>
              <Td>John Doe</Td>
              <Td isNumeric>67</Td>
              <Td>Some Useless Party</Td>
              <Td>Masters</Td>
              <Td isNumeric>2</Td>
            </Tr>
            <Tr>
              <Td>Samuel L Jackson</Td>
              <Td isNumeric>52</Td>
              <Td>Another Useless Party</Td>
              <Td>Diploma</Td>
              <Td isNumeric>0</Td>
            </Tr>
            <Tr>
              <Td>Jane Doe</Td>
              <Td isNumeric>40</Td>
              <Td>Yet Another Useless Party</Td>
              <Td>PhD</Td>
              <Td isNumeric>1</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ChangeStatePage;
