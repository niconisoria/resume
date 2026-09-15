import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import SectionLabel from './SectionLabel.astro';

describe('SectionLabel', () => {
  it('renders the given text as an uppercase-styled label', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SectionLabel, { props: { text: 'Summary' } });
    expect(html).toContain('Summary');
    expect(html).toMatch(/class="[^"]*uppercase[^"]*"/);
  });
});
