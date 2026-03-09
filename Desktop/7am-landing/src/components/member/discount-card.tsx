import { MapPin } from "lucide-react";

interface DiscountCardProps {
  discount: {
    id: number;
    title: string;
    description: string | null;
    discount_value: string;
    terms: string | null;
    partner: {
      name: string;
      category: string;
      logo_url: string | null;
      location: string | null;
    };
  };
}

const categoryColors: Record<string, string> = {
  restaurant: "bg-orange-500/15 text-orange-400",
  gym: "bg-blue-500/15 text-blue-400",
  shop: "bg-purple-500/15 text-purple-400",
  cafe: "bg-amber-500/15 text-amber-400",
  wellness: "bg-emerald-500/15 text-emerald-400",
  other: "bg-gray-500/15 text-gray-400",
};

export function DiscountCard({ discount }: DiscountCardProps) {
  const colorClass =
    categoryColors[discount.partner.category] || categoryColors.other;

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 hover:bg-white/[0.07] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-200">{discount.partner.name}</h3>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${colorClass}`}>
            {discount.partner.category}
          </span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-blue-400">
            {discount.discount_value}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-300 mb-1">{discount.title}</p>
      {discount.description && (
        <p className="text-sm text-gray-500 mb-2">{discount.description}</p>
      )}
      {discount.terms && (
        <p className="text-xs text-gray-600 mb-2">* {discount.terms}</p>
      )}
      {discount.partner.location && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="w-3 h-3" />
          {discount.partner.location}
        </div>
      )}
    </div>
  );
}
