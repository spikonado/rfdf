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
