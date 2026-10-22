import React, { useEffect, useState } from 'react';
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { fetchOrders, matchesQuery, sortByNewest, type Order } from '../lib/orders';

type OrderView = Order & { totalLabel: string; dateLabel: string };
type RowProps = { order: OrderView; expanded: boolean; onToggle: () => void };

function OrderRow({ order, expanded, onToggle }: RowProps) {
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <Image source={{ uri: order.photoUrl }} style={styles.thumb} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name}>{order.customerName}</Text>
        <Text style={styles.meta}>
          {order.dateLabel} · {order.itemCount} items
        </Text>
        {order.giftCount && <Text style={styles.gift}>{order.giftCount} gift-wrapped</Text>}
        {expanded && order.note && <Text style={styles.note}>{order.note}</Text>}
      </View>
      <Text style={styles.total}>{order.totalLabel}</Text>
    </Pressable>
  );
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const load = async () => {
    setRefreshing(true);
    try {
      setOrders(await fetchOrders());
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const day = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  const visible: OrderView[] = sortByNewest(orders)
    .filter((order) => matchesQuery(order, query))
    .map((order) => ({
      ...order,
      totalLabel: new Intl.NumberFormat('en-US', { style: 'currency', currency: order.currency }).format(order.totalCents / 100),
      dateLabel: day.format(new Date(order.placedAt)),
    }));

  return (
    <ScrollView
      style={styles.screen}
      keyboardShouldPersistTaps="handled"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
    >
      <TextInput
        style={styles.search}
        placeholder="Search by customer or order number"
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.count}>{visible.length} orders</Text>
      {visible.map((order, index) => (
        <OrderRow
          key={index}
          order={order}
          expanded={expandedIndex === index}
          onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fafaf7' },
  search: { margin: 16, padding: 12, borderRadius: 10, backgroundColor: '#fff' },
  count: { marginHorizontal: 16, marginBottom: 8, color: '#666' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  thumb: { borderRadius: 6, backgroundColor: '#eee' },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666', marginTop: 2 },
  gift: { color: '#8a5a00', marginTop: 2 },
  note: { marginTop: 6, fontStyle: 'italic' },
  total: { fontSize: 16, fontVariant: ['tabular-nums'] },
});
