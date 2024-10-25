// Basic utility for unwrapping a single Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// Examples
type A = UnwrapPromise<Promise<string>>;  // string
type B = UnwrapPromise<Promise<number>>;  // number
type C = UnwrapPromise<string>;          // string (unchanged)

// More examples
type Example1 = UnwrapPromise<Promise<{ id: number }>>; // { id: number }
type Example2 = UnwrapPromise<string[]>; // string[] (unchanged)


//Nested Promise
// Example: Basic Promise unwrapping
const stringPromise = Promise.resolve("Hello");
type UnwrappedType = UnwrapPromise<typeof stringPromise>; // string

type DeepUnwrapPromise<T> = T extends Promise<infer U>
    ? DeepUnwrapPromise<U>
    : T extends Array<infer V>
    ? Array<DeepUnwrapPromise<V>>
    : T extends object
    ? { [K in keyof T]: DeepUnwrapPromise<T[K]> }
    : T;


// Nested Promises
type AA = DeepUnwrapPromise<Promise<Promise<string>>>; // string

// Arrays with Promises
type BB = DeepUnwrapPromise<Promise<string[]>>; // string[]
type CC = DeepUnwrapPromise<Promise<Array<Promise<number>>>>; // number[]

// Objects with Promises
interface ComplexType {
    name: Promise<string>;
    data: Promise<{
        id: Promise<number>;
        tags: Promise<string[]>;
    }>;
}

type D = DeepUnwrapPromise<ComplexType>;
/* Result:
{
    name: string;
    data: {
        id: number;
        tags: string[];
    };
}
*/
console.log(stringPromise);
