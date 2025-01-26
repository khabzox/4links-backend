declare module "@khabzox/4links-backend" {
  export function connectDB(): Promise<void>;
  export function setupMiddleware(app: any): void;
  export function createUrl(req: any, res: any): Promise<void>;
  export function readUrl(req: any, res: any): Promise<void>;
  export function updateUrl(req: any, res: any): Promise<void>;
  export function deleteUrl(req: any, res: any): Promise<void>;
  export function getAllUrls(req: any, res: any): Promise<void>;
  export function getShortenedUrl(req: any, res: any): Promise<void>;
  export function redirectUrl(req: any, res: any): Promise<void>;
}
