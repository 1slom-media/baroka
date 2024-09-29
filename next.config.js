/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048], // Add or remove sizes based on your needs
    domains: ["dozen.uz", "vipcrm.s3.eu-west-3.amazonaws.com"], // Add the domains where your images are hosted
  },
  i18n: {
    locales: ["default", "uz", "ru", "en"],
    defaultLocale: "default",
    localeDetection: false,
  },
};

module.exports = nextConfig;
