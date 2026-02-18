# grabshot

Capture website screenshots with a simple Node.js API. No headless browser required.

## Install

```bash
npm install grabshot
```

## Quick Start

```js
const GrabShot = require('grabshot');
const fs = require('fs');

const client = new GrabShot('your-api-key');

// Take a screenshot
const image = await client.screenshot('https://github.com');
fs.writeFileSync('github.png', image);

// Full page capture
const full = await client.screenshot('https://example.com', {
  fullPage: true,
  width: 1440,
  format: 'webp'
});

// Custom viewport (mobile)
const mobile = await client.screenshot('https://example.com', {
  width: 375,
  height: 812,
  format: 'jpeg'
});
```

## API

### `new GrabShot(apiKey, options?)`

- `apiKey` - Your API key ([get one free](https://grabshot.dev))
- `options.baseUrl` - Custom API URL (default: `https://grabshot.dev`)

### `.screenshot(url, options?)`

Returns a `Promise<Buffer>` with the screenshot image.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | number | 1440 | Viewport width in pixels |
| `height` | number | 900 | Viewport height in pixels |
| `format` | string | `'png'` | Output format: `png`, `jpeg`, `webp` |
| `fullPage` | boolean | `false` | Capture full scrollable page |
| `delay` | number | `0` | Wait ms before capture |
| `aiCleanup` | boolean | `false` | AI-powered cleanup (paid plans) |

### `.ogImage(url, options?)`

Generate an Open Graph image for a URL. Returns `Promise<Buffer>`.

## Pricing

- **Free**: 25 screenshots/month
- **Starter** ($9/mo): 2,500 screenshots/month + AI cleanup
- **Pro** ($29/mo): 15,000 screenshots/month + priority
- **Business** ($79/mo): 50,000 screenshots/month + dedicated support

[Sign up free at grabshot.dev](https://grabshot.dev)

## License

MIT
