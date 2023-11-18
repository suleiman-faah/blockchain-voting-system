'use client';

import { Stack } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const labels = ['John Doe', 'Samuel L Jackson', 'Jane Doe'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Votes',
      data: labels.map(() => faker.number.int({ min: 0, max: 3 })),
      backgroundColor: 'rgb(137 82 224 / 0.7)',
    },
  ],
};

const AnalyticsPage = () => {
  return (
    <>
      <title>Analytics | Admin</title>

      <Stack spacing={5} direction="row">
        <Stat className="max-w-[200px] rounded-lg border px-4 py-3">
          <StatLabel>Candidates</StatLabel>
          <StatNumber className="text-4xl">3</StatNumber>
        </Stat>
        <Stat className="max-w-[200px] rounded-lg border px-4 py-3">
          <StatLabel>Voters</StatLabel>
          <StatNumber className="text-4xl">3</StatNumber>
        </Stat>
      </Stack>

      <Bar options={options} data={data} className="mt-12" />
    </>
  );
};

export default AnalyticsPage;
