export function paginate(items, page = 1, pageSize = 10) {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  if (!Number.isSafeInteger(page) || page < 1) throw new RangeError('page must be a positive safe integer');
  if (!Number.isSafeInteger(pageSize) || pageSize < 1) throw new RangeError('pageSize must be a positive safe integer');
  const start = (page - 1) * pageSize;
  const end = page * pageSize - 1;
  return items.slice(start, end);
}
