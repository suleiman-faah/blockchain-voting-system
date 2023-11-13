/** @type {import('next').NextConfig} */

const nextConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['GET', 'POST', 'PUT', 'DELETE'],
  },
};

module.exports = {nextConfig};
