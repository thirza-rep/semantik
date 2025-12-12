import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-pink-600 dark:focus:ring-pink-600 ' +
                className
            }
            ref={localRef}
        />
    );
});
