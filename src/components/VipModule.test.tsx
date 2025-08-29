import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VipModule from './VipModule';
import { supabase } from '@/integrations/supabase/client';

// Mock the supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      upsert: vi.fn(() => ({
        error: null,
      })),
    })),
  },
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('VipModule', () => {
  it('renders correctly', () => {
    render(<VipModule />);
    expect(screen.getByText('VIP Access')).toBeInTheDocument();
    expect(screen.getByLabelText('Email for early access')).toBeInTheDocument();
    expect(screen.getByLabelText('VIP access code')).toBeInTheDocument();
    expect(screen.getByText('Request Invite')).toBeInTheDocument();
  });

  it('shows an error message for an invalid email', async () => {
    render(<VipModule />);
    fireEvent.click(screen.getByText('Request Invite'));
    expect(await screen.findByText('Enter a valid email.')).toBeInTheDocument();
  });

  it('calls supabase upsert with email and vip_code', async () => {
    const upsertMock = vi.fn(() => ({ error: null }));
    (supabase.from as vi.Mock).mockReturnValue({ upsert: upsertMock });

    render(<VipModule />);
    fireEvent.change(screen.getByLabelText('Email for early access'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('VIP access code'), { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Request Invite'));

    await waitFor(() => {
      expect(upsertMock).toHaveBeenCalledWith(
        { email: 'test@example.com', source: 'cabana_vip', vip_code: '12345' },
        { onConflict: 'email' }
      );
    });
  });

  it('calls supabase upsert with only email when vip_code is empty', async () => {
    const upsertMock = vi.fn(() => ({ error: null }));
    (supabase.from as vi.Mock).mockReturnValue({ upsert: upsertMock });

    render(<VipModule />);
    fireEvent.change(screen.getByLabelText('Email for early access'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Request Invite'));

    await waitFor(() => {
      expect(upsertMock).toHaveBeenCalledWith(
        { email: 'test@example.com', source: 'cabana_vip' },
        { onConflict: 'email' }
      );
    });
  });

  it('shows a success message on successful submission', async () => {
    render(<VipModule />);
    fireEvent.change(screen.getByLabelText('Email for early access'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Request Invite'));

    expect(await screen.findByText("Thanks! We'll email you early access.")).toBeInTheDocument();
  });

  it('shows an error message on failed submission', async () => {
    const upsertMock = vi.fn(() => ({ error: { message: 'An error occurred' } }));
    (supabase.from as vi.Mock).mockReturnValue({ upsert: upsertMock });

    render(<VipModule />);
    fireEvent.change(screen.getByLabelText('Email for early access'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Request Invite'));

    expect(await screen.findByText('An error occurred')).toBeInTheDocument();
  });
});
