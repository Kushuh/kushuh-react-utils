# React Component Functions

> Utils function for managing React Components and Classes.

## List of functions

+ **[React Component functions](#react-component-functions)**
    + [addPropsToChildren](#addpropstochildren)
    + [setStateAsync](#setstateasync)
+ **[Copyright](#copyright)**

---

### addPropsToChildren

Add the key-value pairs of a javascript object to the properties of a list of React Nodes.

```javascript
const MyComponent = ({children, ...props}) => {
  //...

  const newProps = {foo: 'bar'};

  return (
    <div>
      {addPropsToChildren(children, newProps)}
    </div>
  );
};
```

addPropsToChildren accept two parameters, which are required :

**Children**, any valid React Node, or Array of React Nodes.

```javascript
// Valid.
addPropsToChildren(<div/>, newProps);

addPropsToChildren(['A text node.', null, <Component/>, 42], newProps);

addPropsToChildren([], newProps);

addPropsToChildren(null, newProps);

// Not valid.

// Component is a React Class, not a React Node
addPropsToChildren(Component, newProps);

// Objects are not accepted as React Nodes
addPropsToChildren({foo: 'bar'}, newProps);
```

**Props** to add to the Children. It has to be a valid javascript pure Object. It can also be a Function that returns such an Object.

A Props function receives two parameters : the original props, and an index to determine the position in the React Node Array (0 if Children is a standalone child).
```javascript
// First example of functional props : add parameters to the original ones.
(props, index) => {
  //... do stuff

  return ({
    foo: 'bar',
    ...props
  });
};

// Second example : remove foo property
({foo, ...props}) => props;

// Third example : remove all props except foo
({foo}) => ({foo});

// Fourth example : will fail since it doesn't return a valid object
() => 'A string';
```

⚠️ Children node that aren't React elements, such as text nodes, will be skipped.

⚠️ When adding custom props to HTML nodes (div, span, ...), an occasional React 'unsupported prop' warning can rise up.

✅ Empty node lists are allowed.

✅ Null nodes are allowed. Note they will be removed from the results in a Node Array.

✅ Single child can be a single element, or an array of one element.

### setStateAsync

Wrap context.setState function in an async Promise.

```javascript
class MyClassComponent extends React.Component {
  //...

  async myMethod() {
    //... my code

    await setStateAsync(this, stateObject);

    //...
  }
}
```

ℹ️ Resolves Empty.

## Copyright
2020 Kushuh - MIT license