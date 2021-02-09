export type IntersectionObserverCallback = (
	entries: IntersectionObserverEntry[],
	observer: IntersectionObserver
) => void;

export type IntersectionObserverExtraOptions = {
	shouldDebounce?: boolean;
	shouldWaitForIdle?: boolean;
};

export type IntersectionObserverOptions = IntersectionObserverExtraOptions &
	IntersectionObserverInit;

export type Targets = string | string[] | HTMLElement | HTMLElement[] | null;

export interface ObserverDetails {
	visibilityObserver: IntersectionObserver | null;
}
