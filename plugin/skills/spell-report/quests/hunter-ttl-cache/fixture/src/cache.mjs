export class TTLCache {
  constructor({ maxSize = 3, ttlMs = 1000, now = Date.now } = {}) {
    if (!Number.isSafeInteger(maxSize) || maxSize < 1) throw new RangeError('maxSize must be a positive safe integer');
    if (typeof ttlMs !== 'number' || !Number.isFinite(ttlMs) || ttlMs < 0) throw new RangeError('ttlMs must be finite and nonnegative');
    if (typeof now !== 'function') throw new TypeError('now must be a function');
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
    this.now = now;
    this.entries = new Map();
    this.count = 0;
  }

  purge(time) {
    for (const [key, entry] of this.entries) {
      if (time >= entry.deadline) {
        this.entries.delete(key);
        this.count--;
      }
    }
  }

  get(key) {
    this.purge(this.now());
    const entry = this.entries.get(key);
    return entry?.value;
  }

  set(key, value) {
    const time = this.now();
    this.purge(time);
    if (this.ttlMs === 0) {
      if (this.entries.delete(key)) this.count--;
      return this;
    }
    this.entries.delete(key);
    this.entries.set(key, { value, deadline: time + this.ttlMs * 1000 });
    this.count++;
    if (this.count > this.maxSize) {
      this.entries.delete(this.entries.keys().next().value);
      this.count--;
    }
    return this;
  }

  get size() {
    this.purge(this.now());
    return this.count;
  }

  delete(key) {
    this.purge(this.now());
    const deleted = this.entries.delete(key);
    if (deleted) this.count--;
    return deleted;
  }

  clear() {
    this.entries.clear();
    this.count = 0;
  }
}
