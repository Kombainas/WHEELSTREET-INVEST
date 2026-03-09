export type Member = {
  id: number;
  token: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type MemberPrivate = {
  id: number;
  member_id: number;
  name: string | null;
  surname: string | null;
  email: string | null;
  phone: string | null;
  member_since: string | null;
  notes: string | null;
  photo_path: string | null;
  password_hash: string | null;
  created_at: string;
  updated_at: string;
};

export type MemberWithPrivate = Member & {
  member_private: MemberPrivate | null;
};

export type Partner = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  location: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Discount = {
  id: number;
  partner_id: number;
  title: string;
  description: string | null;
  discount_value: string;
  terms: string | null;
  valid_from: string | null;
  valid_to: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type DiscountWithPartner = Discount & {
  partners: Partner;
};
