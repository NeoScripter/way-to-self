import { useEffect, useState } from 'react';
import useEventListener from './use-event-listener';

export default function useMediaQuery(mediaQuery: string): boolean {
    const [isMatch, setIsMatch] = useState(false);
    const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(
        null,
    );

    useEffect(() => {
        if (
            typeof window === 'undefined' ||
            typeof window.matchMedia === 'undefined'
        )
            return;

        const list = window.matchMedia(mediaQuery);
        setMediaQueryList(list);
        setIsMatch(list.matches);
    }, [mediaQuery]);

    useEventListener(
        'change',
        (e: Event) => setIsMatch((e as MediaQueryListEvent).matches),
        mediaQueryList ?? undefined,
    );

    return isMatch;
}
