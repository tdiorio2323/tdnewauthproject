import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VipModule from './VipModule';

// Mock supabase lib used by VipModule
const insertMock = vi.fn();
const fromMock = vi.fn(() => ({
  insert: insertMock,
}));
vi.mock('@/lib/supabase', () => ({
  SUPABASE_ENABLED: true,
  supabase: {
    from: (...args: any[]) => fromMock(...args),
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
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('VIP Code (optional)')).toBeInTheDocument();
    expect(screen.getByText('Request Access')).toBeInTheDocument();
  });

  it('disables submit when email is empty', async () => {
    render(<VipModule />);
    const button = screen.getByText('Request Access');
    expect(button).toBeDisabled();
  });

  it('submits with email and vip_code', async () => {
    insertMock.mockReturnValue({
      select: () => ({ single: async () => ({ data: { id: '1' }, error: null }) }),
    } as any);
    render(<VipModule />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('VIP Code (optional)'), { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Request Access'));

    await waitFor(() => {
      expect(fromMock).toHaveBeenCalledWith('waitlist');
      expect(insertMock).toHaveBeenCalled();
    });
  });

  it('submits with only email when vip_code is empty', async () => {
    insertMock.mockReturnValue({
      select: () => ({ single: async () => ({ data: { id: '1' }, error: null }) }),
    } as any);
    render(<VipModule />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Request Access'));

    await waitFor(() => {
      expect(fromMock).toHaveBeenCalledWith('waitlist');
      expect(insertMock).toHaveBeenCalled();
    });
  });

  it('shows a success message on successful submission', async () => {
    insertMock.mockReturnValue({
      select: () => ({ single: async () => ({ data: { id: '1' }, error: null }) }),
    } as any);
    render(<VipModule />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Request Access'));

    expect(await screen.findByText("You're in!")).toBeInTheDocument();
  });

  it('shows an error message on failed submission', async () => {
    insertMock.mockReturnValue({
      select: () => ({ single: async () => ({ data: null, error: { message: 'An error occurred' } }) }),
    } as any);
    render(<VipModule />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Request Access'));

    expect(await screen.findByText('An error occurred')).toBeInTheDocument();
  });
});
