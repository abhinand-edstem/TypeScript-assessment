
//method One
class Formatter {
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

const methodone = new Formatter("Hello");
console.log(methodone.greet(42.99));
console.log(methodone.greet("Very long text"));
console.log(methodone.greet(new Date()));

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

const mathodTwo = new Formatter1();
console.log(mathodTwo.format(new Date(), 0));
console.log(mathodTwo.format(42.99, 0));
console.log(mathodTwo.format("Very long text", 10));