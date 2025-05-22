/**
 * Returns a promise that resolves after the specified number of milliseconds.
 * @param ms Number of milliseconds to wait before resolving.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
