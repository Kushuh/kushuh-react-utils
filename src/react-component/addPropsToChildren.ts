import * as React from 'react';

const alterChild: (props, child, index) => React.ReactNode =
    (
        props: ((child: React.ReactNode, index: number) => Record<string, unknown>) | (Record<string, unknown>),
        child: React.ReactNode,
        index: number
    ) => {
        /**
         * Null is valid Element, but we don't want it as it doesn't hold props.
         */
        if (child != null && React.isValidElement(child)) {
            /**
             * Remove all props from original child and copy the rest (React elements are built from Objects, like all
             * js types except null). Removing old props now allows to filter them in a Props Function.
             */
            const {props: childProps, ...childParams} = child;

            /**
             * Build new props on top of the old ones.
             */
            const newProps = typeof props === 'function' ?
                props(childProps, index) :
                Object.assign({...childProps}, {...props});

            /**
             * Since user can return anything from Props Function, we ensure it returns a valid default Object.
             */
            if (newProps.constructor !== Object) {
                throw new Error(`Invalid props returned : expected Object, got ${newProps.constructor.name}.`)
            }

            return React.cloneElement({...childParams, props: {}}, newProps);
        } else if (child == null || typeof child === 'number' || typeof child === 'string') {
            /**
             * Non React Element Nodes don't hold any prop, so their is no need to alter them.
             */
            return child == null ? null : child;
        } else {
            /**
             * Only allow valid React Child.
             */
            throw new Error(`${child.constructor.name} is not a valid React child.`);
        }
    };

/**
 * Parse a list of react nodes, and add props to them if possible.
 *
 * @param children
 * @param props
 */
const addPropsToChildren: (children, props) => React.ReactNode | React.ReactNodeArray =
    (
        children: React.ReactNode | React.ReactNodeArray,
        props: ((child: React.ReactNode, index: number) => Record<string, unknown>) | (Record<string, unknown>)
    ) => {
        /**
         * Props are required and have to be valid props. Type check is required since TypeScript doesn't prevent
         * wrong arguments to be passed.
         */
        if (props == null) {
           throw new Error('props cannot be set to null : please pass a valid javascript Object.')
        } else if (props.constructor !== Object && props.constructor !== Function) {
            throw new Error(`Non valid properties : expected Object, got ${props.constructor.name}.`);
        }

        /**
         * Convert undefined or other null types to null, since it is the only one accepted by React as Child.
         */
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