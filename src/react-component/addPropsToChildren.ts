import * as React from 'react';

const alterChild: (props, child, index) => React.ReactNode =
    (
        props: ((child: React.ReactNode, index: number) => Record<string, unknown>) | (Record<string, unknown>),
        child: React.ReactNode,
        index: number
    ) => {
        if (child != null && React.isValidElement(child)) {
            const {props: childProps, ...childParams} = child;
            const newProps = typeof props === 'function' ?
                props(childProps, index) :
                Object.assign({...childProps}, {...props});

            if (newProps.constructor !== Object) {
                throw new Error(`Invalid props returned : expected Object, got ${newProps.constructor.name}.`)
            }

            return React.cloneElement(
                {...childParams, props: {}},
                newProps
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
        children: React.ReactNode | React.ReactNodeArray,
        props: ((child: React.ReactNode, index: number) => Record<string, unknown>) | (Record<string, unknown>)
    ) => {
        if (props == null) {
           throw new Error('props cannot be set to null : please pass a valid javascript object.')
        } else if (props.constructor !== Object && props.constructor !== Function) {
            throw new Error(`Non valid properties : expected Object, got ${props.constructor.name}.`);
        }

        if (children == null) {
            return null;
        } else if (children.constructor === Array) {
            return React.Children.map(
                children,
                (child, index) => alterChild(props, child, index)
            );
        } else {
            return alterChild(props, children, 0);
        }
    };

export {addPropsToChildren};