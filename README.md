# Kushuh's React Utils

> Some utils functions I often use in my applications, all for React.

## List of functions

* *[React Component functions](#react-component-functions)*
    * [addPropsToChildren](#addpropstochildren)
    * [setStateAsync](#setstateasync)

---
### React Component Functions

#### addPropsToChildren

Add the key-value pairs of a javascript object to the properties of a list of React Nodes.

```javascript
const MyComponent = ({children, ...props}) => {
  //...

  const newProps = {foo: 'bar'};

  return (
    <div>
      {addPropsToChildren(children, newProps)}
      <div>
        {
          addPropsToChildren(
            [<Component1/>, <Component2/>, "A text node.", <div/>],
            {opacity: 0.8}
          )
        }
        {
          addPropsToChildren(
            <OtherComponent/>,
            {anotherProp: 'random value'}
          )
        }
      </div>
    </div>
  );
};
```

addPropsToChildren accept two parameters, which are mandatory :
+ children : 0 or more React nodes. They don't have to be React components.
+ props: an Object, or a Function that returns an Object.

⚠️ Children node that aren't React elements, such as text nodes, will be skipped.

⚠️ When adding custom props to HTML nodes (div, span, ...), an occasional React 'unsupported prop' warning can rise up.

✅ Empty node lists are allowed.

✅ Null nodes are allowed. Note they will be removed from the results.

✅ Single children can be a single element,or an array of one element.

#### setStateAsync

Wrap context.setState function in an async Promise.

```javascript
class MyClassComponent extends React.Component {
  //...

  async myMethod() {
    //... my code

    await setAsyncState(this, stateObject);

    //...
  }
}
```

ℹ️ Never rejects.

ℹ️ Resolves Empty.