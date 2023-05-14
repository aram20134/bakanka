/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost', '192.168.1.248', 'api.bakanskoeozero.ru', 'bakanskoeozero.ru']
  },
  // env: {
  //   NEXT_APP_API_URL: 'http://192.168.1.248:5999/api',
  //   NEXT_APP_STATIC_URL: 'http://192.168.1.248:5999/static'
  // }
}

module.exports = nextConfig
