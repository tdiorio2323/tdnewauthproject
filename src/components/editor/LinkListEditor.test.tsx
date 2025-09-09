import { render, screen, fireEvent } from '@testing-library/react';
import LinkListEditor from './LinkListEditor';

describe('LinkListEditor', () => {
  it('adds and removes links', () => {
    const handleChange = vi.fn();
    render(<LinkListEditor value={[]} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Add'));
    expect(handleChange).toHaveBeenCalledWith([{ label: '', url: '', position: 0 }]);

    // simulate remove on a rendered item
    const value = [{ label: 'A', url: 'https://a', position: 0 }];
    handleChange.mockClear();
    render(<LinkListEditor value={value} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Remove'));
    expect(handleChange).toHaveBeenCalledWith([]);
  });
});

