export const BUTTON_STYLES = ["glass", "solid", "outline"] as const;
export const CARD_STYLES = ["glass", "chrome", "matte"] as const;
export const BACKGROUNDS = ["marble", "sunset", "palms", "none"] as const;
export const EFFECTS = ["grain", "bokeh", "glow", "none"] as const;
export const PAYMENT_LINKS = ["stripe", "paypal", "cashapp", "venmo"] as const;
export const CONTACT_BTNS = ["email", "sms", "whatsapp", "telegram"] as const;

export type Choice = {
  buttons: (typeof BUTTON_STYLES)[number];
  cards: (typeof CARD_STYLES)[number];
  background: (typeof BACKGROUNDS)[number];
  effects: (typeof EFFECTS)[number];
  payment: string[]; // subset of PAYMENT_LINKS
  contact: string[]; // subset of CONTACT_BTNS
};

export type IntakeLink = { label: string; href: string; icon?: string };

