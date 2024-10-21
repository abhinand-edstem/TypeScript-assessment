
//method One
class Formatter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    format(price: number): string;
    format(longText: string): string;
    format(todayDate: Date): string;
    format(value: unknown) {
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
console.log(methodone.format(42.99));
console.log(methodone.format("Very long text"));
console.log(methodone.format(new Date()));

//--------------------------------------------------------//

//Method Two
class Formatter1 {
    format1(input: Date | number | string, stringCount: number): string {
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
console.log(mathodTwo.format1(new Date(), 0));
console.log(mathodTwo.format1(42.99, 0));
console.log(mathodTwo.format1("Very long text", 10));