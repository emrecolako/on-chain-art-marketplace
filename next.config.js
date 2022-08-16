/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "storage.opensea.io",
      "lh3.googleusercontent.com",
      "localhost",
      "cliffordhall.com",
      "og.forgottenrunes.com",
      "magneticb.github.io",
      "images.mirror-media.xyz",
      "miro.medium.com",
      "mirror-media.imgix.net",
      "i.scdn.co",
      "static1.squarespace.com",
      "publish.one37pm.net",
      "images.ctfassets.net",
      "0xadventures.com",
      "api.beatfoundry.xyz",
      "0xessential.mypinata.cloud",
      "0xmons.xyz"
    ],
  },
  api: {
    bodyParser: false,
  },
  experimental: {
    forceSwcTransforms: true,
  }
}

module.exports = nextConfig
