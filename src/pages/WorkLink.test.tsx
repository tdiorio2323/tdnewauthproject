import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import WorkLink from './WorkLink';

vi.mock('@/services/supabase', () => ({
  ensureProfile: vi.fn(async (_uid: string, _u?: any) => ({ id: 'user1', handle: 'tester', display_name: null, bio: null, avatar_url: null })),
  getSessionUserId: vi.fn(async () => 'user1'),
  loadOrCreateLinkPage: vi.fn(async () => ({ page: { id: 'p1', user_id: 'user1' }, links: [] })),
  saveLinkPage: vi.fn(async () => {}),
}));

vi.mock('@/env', () => ({ SUPABASE_ENABLED: true }));

describe('WorkLink', () => {
  it('loads and saves prefs', async () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/work/link"]}>
          <Routes>
            <Route path="/work/link" element={<WorkLink />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByText(/Loading editor/i)).not.toBeInTheDocument());

    // Click Save
    const btn = screen.getByRole('button', { name: /Save & View My Page/i });
    fireEvent.click(btn);

    // saveLinkPage called via mocked module
    const mod = await import('@/services/supabase');
    expect(mod.saveLinkPage).toHaveBeenCalled();
  });
});

