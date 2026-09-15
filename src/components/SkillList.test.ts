import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import SkillList from './SkillList.astro';

const items = [
  { label: 'Ruby/Rails', years: 7 },
  { label: 'JavaScript', years: 12 },
];

async function render(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  return container.renderToString(SkillList, { props });
}

describe('SkillList', () => {
  it('renders the section label and every item with its years', async () => {
    const html = await render({ label: 'Languages', items });
    expect(html).toContain('Languages');
    for (const item of items) {
      expect(html).toContain(item.label);
      expect(html).toContain(String(item.years));
    }
  });

  it('renders a caption when provided, omits it when not', async () => {
    const withCaption = await render({ label: 'Languages', caption: 'Commercial experience / years', items });
    expect(withCaption).toContain('Commercial experience / years');

    const withoutCaption = await render({ label: 'Frameworks', items });
    expect(withoutCaption).not.toContain('Commercial experience / years');
  });

  it('renders items as plain text, no pill/badge class', async () => {
    const html = await render({ label: 'Languages', items });
    expect(html).not.toMatch(/class="[^"]*rounded-full[^"]*"/);
  });

  it('renders an item without years cleanly', async () => {
    const html = await render({ label: 'Frameworks', items: [{ label: 'Astro' }] });
    expect(html).toContain('Astro');
  });

  it('renders an item with href as a link, inert for "#" and safe target for http', async () => {
    const html = await render({
      label: 'Certificates',
      items: [
        { label: 'Real cert', href: 'https://example.com/cert' },
        { label: 'Placeholder cert', href: '#' },
      ],
    });

    const realAnchor = html.match(/<a[^>]*>(?:(?!<\/a>).)*?Real cert(?:(?!<\/a>).)*?<\/a>/s)?.[0] ?? '';
    expect(realAnchor).toContain('href="https://example.com/cert"');
    expect(realAnchor).toContain('target="_blank"');

    const placeholderAnchor =
      html.match(/<a[^>]*>(?:(?!<\/a>).)*?Placeholder cert(?:(?!<\/a>).)*?<\/a>/s)?.[0] ?? '';
    expect(placeholderAnchor).not.toContain('target="_blank"');
  });

  it('renders items without href as plain text, not links', async () => {
    const html = await render({ label: 'Languages', items });
    expect(html).not.toContain('<a ');
  });

  it('renders a secondary side-project line when provided, omits it when not', async () => {
    const withSecondary = await render({
      label: 'Languages',
      items,
      secondary: { caption: 'Side-project / fast ramp-up', items: ['Go', 'Rust'] },
    });
    expect(withSecondary).toContain('Side-project / fast ramp-up');
    expect(withSecondary).toContain('Go');
    expect(withSecondary).toContain('Rust');

    const withoutSecondary = await render({ label: 'Frameworks', items });
    expect(withoutSecondary).not.toContain('Side-project');
  });
});
