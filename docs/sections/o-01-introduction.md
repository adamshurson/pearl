## Introduction

Many other state management projects depend on a central, synchronized state store. It felt like an anti-pattern to me, so I started Pearl.

Modern-day frontend is all about components and, in turn, reducing the centrality of applications. To combine central state management with this seemed silly.

Pearl is a libary for creating components that encapsulate a single concern of your application. These components have their own state, and must be explicitly subscribed to. They do not know how to update their dependents, they only know when.

Similarily, when a component of your application subscribes to a Pearl component, your component will not know when it needs to update its own state. It will provide the Pearl component with instructions on how to update it, and the Pearl component will take care of the rest.

Pearl can be used with any other library / frameworks you love using. As long as you are using ES6, you can take advantage of what Pearl has to offer.