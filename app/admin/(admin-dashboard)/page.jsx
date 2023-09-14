'use client';

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const DashboardIndexPage = () => {
  return (
    <>
      <title>Candidate Details</title>

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
              <Td isNumeric>0</Td>
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
              <Td isNumeric>0</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DashboardIndexPage;
