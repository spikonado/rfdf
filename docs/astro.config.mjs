// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// Astro 7 defaults to JSX whitespace rules, which can glue adjacent inline
	// elements in Starlight chrome. Keep the previous HTML-aware behavior.
	compressHTML: true,
	integrations: [
		starlight({
			title: 'RFDF',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/spikonado/rfdf' }],
			sidebar: [
				{
					label: 'Specification',
					// Starlight 0.39+ requires autogenerate to live inside `items`.
					items: [{ autogenerate: { directory: 'specification' } }]
				}
			]
		})
	]
});
