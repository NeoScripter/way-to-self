import { useEffect } from 'react';
import useTimeout from './use-timeout';

type Callback = () => void;

export default function useDebounce(
    callback: Callback,
    delay: number,
    dependencies: React.DependencyList,
): void {
    const { reset, clear } = useTimeout(callback, delay);

    useEffect(reset, [...dependencies, reset]);
    useEffect(clear, []);
}
