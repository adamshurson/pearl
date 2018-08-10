## Subscribe

```js
subscribe(callback: Function, field?: string)
```

Subscribing to a Pearl component will update the subscriber when the Pearl components state has been changed.

- Callback: this function will be called when the Pearl component state is updated. The callback will be provided with a single parameter, which is the new state of the Pearl component.
- Field: an optional parameter. If included, the subscriber will only be updated if the field specified changes in the Pearl component. The callback parameter will be the field, instead of the entire state object.
