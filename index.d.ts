declare class GrabShot {
  constructor(apiKey: string, options?: { baseUrl?: string });

  screenshot(url: string, options?: {
    width?: number;
    height?: number;
    format?: 'png' | 'jpeg' | 'webp';
    fullPage?: boolean;
    delay?: number;
    aiCleanup?: boolean;
  }): Promise<Buffer>;

  ogImage(url: string, options?: {
    template?: string;
  }): Promise<Buffer>;
}

export = GrabShot;
export { GrabShot };
