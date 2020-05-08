import * as React from 'react';

const setStateAsync: (s, state) => Promise<void> =
    (component: React.Component<unknown, unknown>, state: Record<string, unknown>) => new Promise(
        resolve => {
            component.setState(state, resolve);
        }
    );

export {setStateAsync};
