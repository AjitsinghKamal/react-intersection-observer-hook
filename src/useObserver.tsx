import { useLayoutEffect, useState, useCallback, useMemo } from "react";
import {
	IntersectionObserverCallback,
	IntersectionObserverOptions,
	Targets,
	ObserverDetails,
} from "./types";
import createObserver from "./utils/createObserver";

function observeTarget(
	target: string | Element,
	observer: IntersectionObserver
) {
	try {
		let targetEl: Element | null;
		if (typeof target === "string") {
			targetEl = document.querySelector(target);
		} else {
			targetEl = target;
		}
		targetEl && observer.observe(targetEl);
	} catch (e) {
		console.error(e);
	}
}

/**
 * setup a new Observer instance and
 * store it in state.
 *
 * @export
 * @param {Targets} targets
 * if provided automatically observer the provided targets
 * supports multiple and single target
 *
 * @param {IntersectionObserverCallback} callback
 * any callback that should run when targets intersect
 * the root
 *
 * @param {IntersectionObserverOptions} [options={}]
 *
 * @param {HTMLElement} options.root The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target.
 * @param {string} options.rootMargin Margin around the root.
 * @param {number | number[]} options.threshold indicate at what percentage of the target's visibility the observer's callback should be executed.
 *  @param {boolean} options.shouldDebounce indicate if hook should use raf to debounce callback execution
 *
 * @returns {ObserverDetails}
 */
export default function useObserver(
	targets: Targets,
	callback: IntersectionObserverCallback,
	options: IntersectionObserverOptions = {}
): ObserverDetails {
	const [
		observerInstance,
		setObserverInstance,
	] = useState<IntersectionObserver | null>(null);

	const attachObserver = useCallback(
		(observer) => {
			if (Array.isArray(targets)) {
				targets.forEach(
					(target: string | Element) =>
						target && observeTarget(target, observer)
				);
			} else {
				targets && observeTarget(targets, observer);
			}
		},
		[targets]
	);

	useLayoutEffect(() => {
		const observer = createObserver(callback, options);
		targets && attachObserver(observer);
		setObserverInstance(observer);
		return () => {
			observerInstance && observerInstance.disconnect();
		};
	}, [options.root, options.rootMargin, options.threshold, targets]);

	return useMemo(
		() => ({
			visibilityObserver: observerInstance,
		}),
		[observerInstance]
	);
}
