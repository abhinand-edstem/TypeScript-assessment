"use strict";
//Nested Promise
// Example: Basic Promise unwrapping
const stringPromise = Promise.resolve("Hello");
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
