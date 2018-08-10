## Init

This function is called when the Pearl component is initiated. This is used for setting the initial state of your Pearl component and **must** be implemented. Example:

```js
class MyPearlComponent extends Pearl {
  init() {
    this.setState({
      stateVar: 'foo'
    });
  }
}
```