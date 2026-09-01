// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// Keep HTML-aware whitespace. Astro 7 defaults to JSX rules, which can glue
	// adjacent inline elements in Starlight's docs chrome (sidebar, hero, asides).
	compressHTML: true,
	integrations: [
		starlight({
			title: 'RFDF',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/spikonado/rfdf' }],
			sidebar: [
				{
					label: 'Specification',
					// Starlight 0.39+ requires autogenerate inside `items`, which also lets
					// us mix generated spec pages with a link to the example package.
					items: [
						{ autogenerate: { directory: 'specification' } },
						{
							label: 'Example ROS 2 package',
							link: 'https://github.com/spikonado/rfdf/tree/main/rfdf_example_ros2',
							badge: { text: 'GitHub', variant: 'note' },
							attrs: { target: '_blank', rel: 'noopener noreferrer' }
						}
					]
				}
			]
		})
	]
});
