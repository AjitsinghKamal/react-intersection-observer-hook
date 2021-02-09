/**
 * default intersection observer api
 * these options are supplied by brosers by default
 * when instantiating IntersectionObserver
 *
 * read more about this at here
 * @doc https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
export const DEFAULT_OBSERVER_OPTIONS = Object.freeze({
	root: null,
	threshold: 0,
	rootMargin: "0px 0px 0px 0px",
});

/**
 * extra configuration for the hook
 */
export const DEFAULT_OBSERVER_CONFIG = Object.freeze({
	shouldDebounce: true,
	shouldWaitForIdle: false,
});
