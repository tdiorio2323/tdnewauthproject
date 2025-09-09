import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import CreatorPage from './CreatorPage';

vi.mock('@/env', () => ({ SUPABASE_ENABLED: true }));
vi.mock('@/services/supabase', () => ({
  fetchPublicByHandle: vi.fn(async (_h: string) => ({
    profile: { id: 'user1', handle: 'tester', display_name: 'Tester', bio: 'bio', avatar_url: null },
    page: { theme: 'gradient', font: 'inter', color_scheme: 'purple-teal', button_layout: 'stacked', button_style: 'rounded', sections: { customText: true, customTextContent: 'Hello' } },
    links: [{ label: 'Instagram', url: 'https://ig', position: 0 }, { label: 'Shop', url: 'https://shop', position: 1 }],
  }))
}));

describe('CreatorPage', () => {
  it('renders saved links and custom text', async () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/tester"]}>
          <Routes>
            <Route path="/:handle" element={<CreatorPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    await waitFor(() => expect(screen.queryByText(/Loading creator page/i)).not.toBeInTheDocument());

    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});

