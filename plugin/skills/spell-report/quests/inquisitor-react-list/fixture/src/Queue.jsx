import { useEffect, useState } from 'react';

// Mossbasket lets editors reorder a queue while each row keeps its draft.
function Row({ item, onPick }) {
  const [draft, setDraft] = useState(item.title);
  return <div onClick={() => onPick(item.id)}>
    <input aria-label="Draft title" value={draft} onChange={e => setDraft(e.target.value)} />
    <span>{item.title}</span>
  </div>;
}

export function Queue({ items, channelId, subscribe, onPick }) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    return subscribe(channelId, setMessage);
  }, []);
  return <section aria-label="Editing queue">
    <p>{message}</p>
    {items.map((item, index) => <Row key={index} item={item} onPick={onPick} />)}
  </section>;
}
