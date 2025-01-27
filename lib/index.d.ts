declare module "@khabzox/4links-backend" {
  /**
   * Connects to the database.
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   */
  export function connectDB(): Promise<void>;

  /**
   * Sets up middleware for the application.
   * @param {any} app - The application instance.
   */
  export function setupMiddleware(app: any): void;

  /**
   * Creates a new URL entry.
   * @param {any} req - The request object.
   * @param {any} res - The response object.
   * @returns {Promise<void>} A promise that resolves when the URL is created.
   */
  export function createUrl(req: any, res: any): Promise<void>;

  /**
   * Reads a URL entry.
   * @param {any} req - The request object.
   * @param {any} res - The response object.
   * @returns {Promise<void>} A promise that resolves when the URL is read.
   */
  export function readUrl(req: any, res: any): Promise<void>;

  /**
   * Updates a URL entry.
   * @param {any} req - The request object.
   * @param {any} res - The response object.
   * @returns {Promise<void>} A promise that resolves when the URL is updated.
   */
  export function updateUrl(req: any, res: any): Promise<void>;

  /**
   * Deletes a URL entry.
   * @param {any} req - The request object.
   * @param {any} res - The response object.
   * @returns {Promise<void>} A promise that resolves when the URL is deleted.
   */
  export function deleteUrl(req: any, res: any): Promise<void>;

  /**
   * Retrieves all URL entries.
   * @param {any} req - The request object.
   * @param {any} res - The response object.
   * @returns {Promise<void>} A promise that resolves when all URLs are retrieved.
   */
  export function getAllUrls(req: any, res: any): Promise<void>;

  /**
   * Retrieves a shortened URL entry.
   * @param {any} req - The request object.
   * @param {any} res - The response object.
   * @returns {Promise<void>} A promise that resolves when the shortened URL is retrieved.
   */
  export function getShortenedUrl(req: any, res: any): Promise<void>;

  /**
   * Redirects to the original URL based on the shortened URL.
   * @param {any} req - The request object.
   * @param {any} res - The response object.
   * @returns {Promise<void>} A promise that resolves when the redirection is complete.
   */
  export function redirectUrl(req: any, res: any): Promise<void>;
}
