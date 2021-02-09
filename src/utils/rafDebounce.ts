import isClient from "./checkIfClient";

/**
 *
 * light-weight utility
 * to debounce passed function execution
 * to next frame cycle by using
 * requestAnimationFrame api
 *
 * @export
 * @template F
 * @param {F} callee
 * @returns
 */
export function rafDebounce<F extends Function>(callee: F) {
	if (!isClient) {
		return;
	}
	let timeoutId: any = null;
	return (...args: any[]) => {
		timeoutId && window.cancelAnimationFrame(timeoutId);
		timeoutId = window.requestAnimationFrame(() => {
			callee(...args);
		});
	};
}
