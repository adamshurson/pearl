## SetState

```js
setState(updatedFields: object)
```

Setting the state is the preffered way of manipulating a Pearl components state. After the state is updated, the Pearl component will automatically update its subscribers.

- updatedFields: similar to React.js setState, the updatedFields parameter is a javascript object containing the updated state.