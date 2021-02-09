import { rafDebounce } from "./rafDebounce";
import {
	IntersectionObserverCallback,
	IntersectionObserverExtraOptions,
	IntersectionObserverOptions,
} from "../types";
import { DEFAULT_OBSERVER_OPTIONS, DEFAULT_OBSERVER_CONFIG } from "./constants";

/**
 * attaches the passed custom callback to
 * innteral IntersectionObserver callback
 * that runs each time the tracked object
 * intersects the root
 *
 * @param {IntersectionObserverCallback} callback
 * @param {IntersectionObserverExtraOptions} config
 * @returns modified callback passed to Observer constructor
 */
function setupCallbackHandler(
	callback: IntersectionObserverCallback,
	config: IntersectionObserverExtraOptions
) {
	const observerIntersectionHandler: IntersectionObserverCallback = (
		entries
	) => {
		let _cb: any = callback;
		if (config.shouldDebounce) {
			_cb = rafDebounce(callback);
		} else if (config.shouldWaitForIdle) {
			_cb = rafDebounce(callback); //TODO: update with idle handler
		}
		entries.forEach((entry: IntersectionObserverEntry) => {
			_cb(entry);
		});
	};
	return observerIntersectionHandler;
}

/**
 *
 * modifies passed prop callback and
 * create a new Intersection Observer merging the supplied
 * options with the default options
 *
 * @export
 * @param {IntersectionObserverCallback} callback
 * @param {IntersectionObserverOptions} [options={}]
 * @returns {IntersectionObserver} new Observer instance
 */
export default function createObserver(
	callback: IntersectionObserverCallback,
	options: IntersectionObserverOptions = {}
): IntersectionObserver {
	const _mergedOptions = Object.assign(
		{},
		DEFAULT_OBSERVER_OPTIONS,
		DEFAULT_OBSERVER_CONFIG,
		options
	);

	const {
		shouldDebounce,
		shouldWaitForIdle,
		...observerOptions
	} = _mergedOptions;

	const modifiedCallback = setupCallbackHandler(callback, {
		shouldDebounce,
		shouldWaitForIdle,
	});
	return new IntersectionObserver(modifiedCallback, observerOptions);
}
