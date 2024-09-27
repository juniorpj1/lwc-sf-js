import { LightningElement } from 'lwc';

export default class HelloWebComponent extends LightningElement {
	greeting = 'Trailblazer';
    currentDate = new Date().toDateString();

    handleGreetingChange(event) {
        this.greeting = event.target.value;
    }

    get capitalizedGreeting() {
        return `Hello ${this.greeting.toUpperCase()}!`;
    }

    /* 
    As you can see, expressions allow us to keep component templates clear of logic. In fact, using expressions is the only way to transform a property value before displaying it.
    That’s it for this step. You’ve set up a basic hello world component with base components, data binding, and expressions.
    Notice that the data binding is one-way, from the component to the parent. There are several other types of data binding that LWC provides. We’ll cover them in the next unit.
    In this step, you learned how to use expressions to display dynamic data in a component. Expressions are a powerful feature of LWC that allow you to display dynamic data in your templates. You can use expressions to display property values, call methods, and perform other operations. 
    */

}