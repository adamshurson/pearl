## Getting Started

Writing a Pearl component is easy.

```javascript
import Pearl from 'pearl';
export default class MyPearlComponent extends Pearl {
  init() {
    this.setState({
      myVar: 'foo'
    });
  }
}
```

The only function you have to write is the init. This will be called when the component is used in other classes.