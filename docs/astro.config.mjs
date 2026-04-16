// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'RFDF',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/spikonado/rfdf' }],
			sidebar: [
				{
					label: 'Specification',
					autogenerate: { directory: 'specification' }
				}
			]
		})
	]
});
