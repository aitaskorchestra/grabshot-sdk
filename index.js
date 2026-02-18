const https = require('https');
const http = require('http');

class GrabShot {
  /**
   * @param {string} apiKey - Your GrabShot API key (get one free at grabshot.dev)
   * @param {object} [options]
   * @param {string} [options.baseUrl] - API base URL (default: https://grabshot.dev)
   */
  constructor(apiKey, options = {}) {
    if (!apiKey) throw new Error('API key required. Get one free at https://grabshot.dev');
    this.apiKey = apiKey;
    this.baseUrl = (options.baseUrl || 'https://grabshot.dev').replace(/\/$/, '');
  }

  /**
   * Capture a screenshot of a URL
   * @param {string} url - URL to screenshot
   * @param {object} [options]
   * @param {number} [options.width=1440] - Viewport width
   * @param {number} [options.height=900] - Viewport height
   * @param {string} [options.format=png] - Output format (png, jpeg, webp)
   * @param {boolean} [options.fullPage=false] - Capture full scrollable page
   * @param {number} [options.delay=0] - Wait ms before capture
   * @param {boolean} [options.aiCleanup=false] - AI-powered cleanup (paid plans)
   * @returns {Promise<Buffer>} Screenshot image buffer
   */
  async screenshot(url, options = {}) {
    const params = new URLSearchParams({
      url,
      apiKey: this.apiKey,
      width: String(options.width || 1440),
      height: String(options.height || 900),
      format: options.format || 'png',
    });

    if (options.fullPage) params.set('fullPage', 'true');
    if (options.delay) params.set('delay', String(options.delay));
    if (options.aiCleanup) params.set('aiCleanup', 'true');

    const reqUrl = `${this.baseUrl}/v1/screenshot?${params}`;
    return this._request(reqUrl);
  }

  /**
   * Generate an OG image for a URL
   * @param {string} url - URL to generate OG image for
   * @param {object} [options]
   * @param {string} [options.template] - OG template name
   * @returns {Promise<Buffer>} OG image buffer
   */
  async ogImage(url, options = {}) {
    const params = new URLSearchParams({
      url,
      apiKey: this.apiKey,
    });
    if (options.template) params.set('template', options.template);

    const reqUrl = `${this.baseUrl}/v1/og?${params}`;
    return this._request(reqUrl);
  }

  /** @private */
  _request(url) {
    return new Promise((resolve, reject) => {
      const mod = url.startsWith('https') ? https : http;
      mod.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return this._request(res.headers.location).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          let body = '';
          res.on('data', (c) => body += c);
          res.on('end', () => {
            try { body = JSON.parse(body); } catch {}
            reject(new Error(body.error || body.message || `HTTP ${res.statusCode}`));
          });
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      }).on('error', reject);
    });
  }
}

module.exports = GrabShot;
module.exports.default = GrabShot;
module.exports.GrabShot = GrabShot;
