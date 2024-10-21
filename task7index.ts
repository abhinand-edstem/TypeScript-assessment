
//method One
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    greet(price: number): string;
    greet(longText: string): string;
    greet(todayDate: Date): string;
    greet(value: unknown) {
        if (typeof value === "number") {
            return "$" + value.toString();
        } else if (typeof value === "string") {
            return value.substring(0, 10) + "..."
        } else {
            if (value instanceof Date) {
                const year = value.getFullYear();
                const month = (value.getMonth() + 1);
                const day = value.getDate()
                const returnValue = year + "-" + month + "-" + day
                return returnValue.toString()
            }
        }
        return "";
    }
}

const greeter = new Greeter("Hello");
const price = greeter.greet(42.99);
console.log({ price });
const longText = greeter.greet("Very long text");
console.log({ longText });
const date = greeter.greet(new Date());
console.log({ date });

//--------------------------------------------------------//

//Method Two
class Formatter1 {
    format(input: Date | number | string, stringCount: number): string {
        if (input instanceof Date) {
            const year = input.getFullYear();
            const month = (input.getMonth() + 1);
            const day = input.getDate()
            const returnValue = year + "-" + month + "-" + day
            return returnValue.toString()
        }
        else if (typeof input === 'number') {
            return "$" + input.toString();
        }
        else {
            return input.substring(0, stringCount) + "..."
        }
    }
}

const formatter = new Formatter1();
console.log(formatter.format(new Date(), 0));
console.log(formatter.format(42.99, 0));
console.log(formatter.format("Very long text", 10));