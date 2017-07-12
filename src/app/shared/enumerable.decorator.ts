declare var Reflect: any;

var renameFunction = function (name, fn) {
  return (new Function("return function (call) { return function " + name +
    " () { return call(this, arguments) }; };")())(Function.apply.bind(fn));
};

export function enumerableClassProperty() {
  return (target: any): any | void => {
    const config: EnumerableDecoratorConfig = Reflect.getMetadata(ENUMERABLE_KEY, target);
    const descriptor = Object.getOwnPropertyDescriptor(target, config.propertyKey) || {};
    if (descriptor.enumerable != config.value) {
      const original = target;
      const newConstructor = function (...args) {
        original.apply(this, args);
        const newClassPropertyDescriptior = Object.getOwnPropertyDescriptor(this, config.propertyKey) || {};
        newClassPropertyDescriptior.enumerable = config.value;

        Object.defineProperty(this, config.propertyKey, newClassPropertyDescriptior);
      };
      Object.defineProperty(newConstructor, 'name', { writable: true });
      newConstructor.prototype = original.prototype;

      return renameFunction(original.name, newConstructor);
    }
  };
}

const ENUMERABLE_KEY = '__enumerable';

interface EnumerableDecoratorConfig {
  propertyKey: string;
  value: boolean;
}

export function enumerable(value: boolean) {
  return (target: any, propertyKey: string | symbol): void => {
    Reflect.defineMetadata(ENUMERABLE_KEY, { 'propertyKey': propertyKey, 'value': value }, target.constructor);
  };
}
