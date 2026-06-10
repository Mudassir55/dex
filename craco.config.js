module.exports = {
  // ... your other craco configurations
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: false,
        },
      },
    },
  },
}
