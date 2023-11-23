'use client';

import { Stack } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import {
  ArcElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const labels = [
  { 'name': 'John Doe', 'votes': 12 },
  { 'name': 'Samuel L Jackson', 'votes': 5 },
  { 'name': 'Jane Doe', 'votes': 10 }
];

const total_candidates = labels.length;
const total_votes = labels.reduce((total, label) => total + label.votes, 0);

export const data = {
  labels: labels.map(label => label.name),
  datasets: [
    {
      label: 'Votes',
      data: labels.map(label => label.votes),
      backgroundColor: 'rgb(137 82 224 / 0.7)',
    },
  ],
};

export const pieData = {
  labels: labels.map(label => label.name),
  datasets: [
    {
      label: 'Votes',
      data: labels.map(label => label.votes),
      backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
      hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ]
    },
  ],
}

const AnalyticsPage = () => {
  return (
    <>
      <title>Analytics | Blockchain Voting System </title>

      <Stack spacing={5} direction="row">
        <Stat className="max-w-[200px] rounded-lg border px-4 py-3">
          <StatLabel>Candidates</StatLabel>
          <StatNumber className="text-4xl">{total_candidates}</StatNumber>
        </Stat>
        <Stat className="max-w-[200px] rounded-lg border px-4 py-3">
          <StatLabel>Voters</StatLabel>
          <StatNumber className="text-4xl">{total_votes}</StatNumber>
        </Stat>
      </Stack>

      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:w-1/2 md:w-auto">
          <Bar options={options} data={data} className="mt-12" />
        </div>
        <div className="w-full sm:w-1/2 md:w-auto">
          <Pie options={options} data={pieData} height={400} width={400} className="mt-12 mr-24" />
        </div>
      </div>
      {/* <Bar options={options} data={data} className="mt-12" /> */}
      {/* <Pie options={options} data={pieData} height={400} width={400} className="mt-12" /> */}
    </>
  );
};

export default AnalyticsPage;
