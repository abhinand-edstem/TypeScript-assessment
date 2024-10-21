const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Resolving");
        resolve("done!");
    }, 1000);
});

const nestedPromise: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Resolving");
        resolve(5200);
    }, 1000);
});

const outerPromise: Promise<unknown> = new Promise((resolve, reject) => {
    resolve(nestedPromise);
});