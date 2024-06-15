const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withTM = require('next-transpile-modules')([
  'react-syntax-highlighter',
  'antd',
])

module.exports = withTM(
  withBundleAnalyzer({
    eslint: {
      dirs: ['.'],
      ignoreDuringBuilds: true,
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    output: 'standalone',
    poweredByHeader: false,
    trailingSlash: true,
    basePath: '',
    reactStrictMode: true,
  })
)
