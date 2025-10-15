import { useState } from 'react';

export default function useToggle(
    defaultValue: boolean,
): [boolean, (value?: boolean) => void] {
    const [value, setValue] = useState<boolean>(defaultValue);

    function toggleValue(newValue?: boolean) {
        setValue((currentValue) =>
            typeof newValue === 'boolean' ? newValue : !currentValue,
        );
    }

    return [value, toggleValue];
}
