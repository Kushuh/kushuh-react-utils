import * as React from 'react';

const alterChild: (props, child, index) => React.ReactNode =
    (
        props: ((child: React.ReactNode, index: number) => Record<string, unknown>) | (Record<string, unknown>),
        child: React.ReactNode,
        index: number
    ) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(
                child,
                typeof props === 'function' ? props(child, index) : Object.assign(child.props, props)
            );
        } else {
            /**
             * Cannot alter props of a non React element
             */
            return child;
        }
    };

/**
 * Parse a list of react nodes, and add props to them if possible.
 *
 * @param children
 * @param props
 */
const addPropsToChildren: (children, props) => React.ReactNode =
    (
        children: React.ReactNode,
        props: ((child: unknown, index: number) => Record<string, unknown>) | (Record<string, unknown>)
    ) => {
        if (children.constructor === Array) {
            return React.Children.map(
                children,
                (child, index) => alterChild(props, child, index)
            )
        } else {
            return alterChild(props, children, 0)
        }
    };

export {addPropsToChildren};