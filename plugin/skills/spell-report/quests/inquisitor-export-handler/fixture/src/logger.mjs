// JSON logger. Lines go to the shared log search, which support staff and outside contractors can read.
// Fields are serialized by key: `err` keeps message and stack, `req` keeps only method and path.
// Any other field is written exactly as given.
const serializers = {
  err: (err) => ({ message: err.message, stack: err.stack }),
  req: (req) => ({ method: req.method, path: new URL(req.url, 'http://localhost').pathname }),
};

export function createLogger(write = (line) => process.stdout.write(`${line}\n`)) {
  const log = (level) => (fields, msg) => {
    const line = { level, time: new Date().toISOString(), msg };
    for (const [key, value] of Object.entries(fields)) line[key] = serializers[key] ? serializers[key](value) : value;
    write(JSON.stringify(line));
  };
  return { info: log('info'), warn: log('warn'), error: log('error') };
}
