// Thin client for the card processor's HTTP API.
// charge({ amountCents, currency, paymentMethodId, idempotencyKey }) resolves to { id } or throws an error whose
// code is the processor's reason ('card_declined', 'insufficient_funds', ...).
// The processor stores the first response for an idempotency key for 24 hours and returns it for any later
// request with the same key. Requests time out after 60 seconds.
export function createPayments({ apiKey, fetch = globalThis.fetch }) {
  return {
    async charge({ amountCents, currency, paymentMethodId, idempotencyKey }) {
      const headers = { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' };
      if (idempotencyKey) headers['idempotency-key'] = idempotencyKey;
      const res = await fetch('https://api.processor.example/v1/charges', {
        method: 'POST',
        headers,
        body: JSON.stringify({ amount: amountCents, currency, payment_method: paymentMethodId }),
        signal: AbortSignal.timeout(60_000),
      });
      const body = await res.json();
      if (!res.ok) throw Object.assign(new Error(body.message ?? 'Charge failed'), { code: body.code ?? 'processor_error' });
      return { id: body.id };
    },
  };
}
