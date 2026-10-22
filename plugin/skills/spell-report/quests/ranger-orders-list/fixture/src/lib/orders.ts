export type Currency = 'USD' | 'CAD' | 'GBP';

export type Order = {
  id: string;
  customerName: string;
  placedAt: string; // ISO 8601, UTC
  itemCount: number;
  giftCount: number; // 0 when nothing in the order is gift-wrapped
  note: string; // '' when the customer left no note
  totalCents: number; // in the order's own currency
  currency: Currency;
  photoUrl: string; // full-size original on the image CDN
};

export async function fetchOrders(): Promise<Order[]> {
  const response = await fetch('https://api.ledgerleaf.example/v1/orders?limit=2000');
  if (!response.ok) throw new Error(`Orders request failed: ${response.status}`);
  return (await response.json()).orders;
}

export function sortByNewest(orders: Order[]): Order[] {
  return [...orders].sort((a, b) => b.placedAt.localeCompare(a.placedAt));
}

export function matchesQuery(order: Order, query: string): boolean {
  const needle = query.trim().toLowerCase();
  return needle === '' || order.customerName.toLowerCase().includes(needle) || order.id.includes(needle);
}
