import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    }),
      prerender: {
      handleMissingId: 'warn'
    },
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/deltaflag' : ''
    }
  }
};

export default config;
