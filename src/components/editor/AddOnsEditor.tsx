import { useTheme } from '@/contexts/ThemeContext';

export default function AddOnsEditor() {
  const { preferences, updatePreferences } = useTheme();
  const s = preferences.sections;

  const set = (patch: Partial<typeof s>) => updatePreferences({ sections: { ...s, ...patch } });

  return (
    <div className="border rounded-3xl p-6 space-y-4">
      <h3 className="text-lg font-light">Add-Ons</h3>
      <label className="flex items-center justify-between gap-4">
        <div>
          <div>Image Box</div>
          <p className="text-xs text-muted-foreground">Show a featured image/card</p>
        </div>
        <input type="checkbox" checked={s.imageBox} onChange={(e) => set({ imageBox: e.target.checked })} />
      </label>
      {s.imageBox && (
        <input
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/20"
          placeholder="Image URL"
          value={s.imageUrl || ''}
          onChange={(e) => set({ imageUrl: e.target.value })}
        />
      )}

      <label className="flex items-center justify-between gap-4">
        <div>
          <div>Booking Form</div>
          <p className="text-xs text-muted-foreground">Collect requests via email</p>
        </div>
        <input type="checkbox" checked={s.bookingForm} onChange={(e) => set({ bookingForm: e.target.checked })} />
      </label>
      {s.bookingForm && (
        <input
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/20"
          placeholder="Booking email (mailto will be used)"
          value={s.bookingEmail || ''}
          onChange={(e) => set({ bookingEmail: e.target.value })}
        />
      )}

      <label className="flex items-center justify-between gap-4">
        <div>
          <div>Shop</div>
          <p className="text-xs text-muted-foreground">External shop link</p>
        </div>
        <input type="checkbox" checked={s.shop} onChange={(e) => set({ shop: e.target.checked })} />
      </label>
      {s.shop && (
        <input
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/20"
          placeholder="Shop URL"
          value={s.shopUrl || ''}
          onChange={(e) => set({ shopUrl: e.target.value })}
        />
      )}

      <label className="flex items-center justify-between gap-4">
        <div>
          <div>Custom Text</div>
          <p className="text-xs text-muted-foreground">Small footer note</p>
        </div>
        <input type="checkbox" checked={s.customText} onChange={(e) => set({ customText: e.target.checked })} />
      </label>
      {s.customText && (
        <input
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/20"
          placeholder="Your message"
          value={s.customTextContent || ''}
          onChange={(e) => set({ customTextContent: e.target.value })}
        />
      )}
    </div>
  );
}

