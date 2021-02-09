/**
 * determines if window object accessible
 * useful to determine if a block of code
 * is running on client-side and avoid SSR gotchas
 *
 *
 * @returns true if window is accessible
 */
export default function isClient() {
	return window && typeof window !== "undefined";
}
