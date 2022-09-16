import {defineConfig} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: 'hydrogen-preview.myshopify.com',
    storefrontToken: '3b580e70970c4528da70c98e097c2fa0',
    // storeDomain: 'chris-testing-shop.myshopify.com',
    // storefrontToken: 'ce20de5ec8b2de194037b99432299e73',
    storefrontApiVersion: '2022-07',
  },
});
