## Practical Usage

Once you have created a Pearl component, you can subscribe your React/Vue/etc. components to the Pearl component state. Below is an example with React:

```javascript
import MyPearlComponent from 'MyPearlComponent';
class MyReactComponent extends React.Component {
  constructor() {
    this.state = {
      name: 'World'
    };
    // create a variable that references our Pearl component
    this.MyPearlComponent = new MyPearlComponent();
    // subscribe to changes in the Pearl components state
    this.MyPearlComponent.subscribe( (newMyPearlComponentState) => {
      this.setState({
        name: newMyPearlComponentState.name
      });
    });
  }
  render() {
    return <h1>Hello, {this.state.name}</h1>;
  }
}
```

A few things:

- Using the arrow function notation is **required** if your callback references MyReactComponent (which it probably will)
- You can use MyPearlComponent (and other extensions of Pearl) in any number of your own components. All pearl extensions act as singletons, so declaring a new MyPearlComponent() will still return the same reference
- This is important for adding your own functionalities to your Pearl components, such as methods that manipulate the component state