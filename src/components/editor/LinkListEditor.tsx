import { useState } from 'react';
import type { LinkItem } from '@/types';

interface Props {
  value: LinkItem[];
  onChange: (links: LinkItem[]) => void;
}

export default function LinkListEditor({ value, onChange }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const add = () => onChange([...value, { label: '', url: '', position: value.length }]);
  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx).map((l, i) => ({ ...l, position: i })));
  const update = (idx: number, patch: Partial<LinkItem>) => onChange(value.map((l, i) => i === idx ? { ...l, ...patch } : l));

  const onDragStart = (idx: number) => setDragIndex(idx);
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const onDrop = (idx: number) => {
    if (dragIndex === null || dragIndex === idx) return setDragIndex(null);
    const arr = [...value];
    const [moved] = arr.splice(dragIndex, 1);
    arr.splice(idx, 0, moved);
    onChange(arr.map((l, i) => ({ ...l, position: i })));
    setDragIndex(null);
  };

  return (
    <div className="border rounded-3xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light">Links</h3>
        <button onClick={add} className="px-3 py-1 rounded-lg bg-white text-black text-sm">Add</button>
      </div>
      <div className="space-y-3">
        {value.map((l, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl border border-white/20 bg-white/5"
            draggable
            onDragStart={() => onDragStart(idx)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(idx)}
          >
            <div className="flex gap-2">
              <input
                placeholder="Label"
                className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20"
                value={l.label}
                onChange={(e) => update(idx, { label: e.target.value })}
              />
              <input
                placeholder="https://..."
                className="flex-[2] px-3 py-2 rounded-xl bg-white/10 border border-white/20"
                value={l.url}
                onChange={(e) => update(idx, { url: e.target.value })}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Drag to reorder</span>
              <button onClick={() => remove(idx)} className="text-red-400">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

