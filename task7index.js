//method One
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.message = message;
    }
    Greeter.prototype.greet = function (value) {
        if (typeof value === "number") {
            return "$" + value.toString();
        }
        else if (typeof value === "string") {
            return value.substring(0, 10) + "...";
        }
        else {
            if (value instanceof Date) {
                var year = value.getFullYear();
                var month = (value.getMonth() + 1);
                var day = value.getDate();
                var returnValue = year + "-" + month + "-" + day;
                return returnValue.toString();
            }
        }
        return "";
    };
    return Greeter;
}());
var greeter = new Greeter("Hello");
var price = greeter.greet(42.99);
console.log({ price: price });
var longText = greeter.greet("Very long text");
console.log({ longText: longText });
var date = greeter.greet(new Date());
console.log({ date: date });
//--------------------------------------------------------//
//Method Two
var Formatter1 = /** @class */ (function () {
    function Formatter1() {
    }
    Formatter1.prototype.format = function (input, stringCount) {
        if (input instanceof Date) {
            var year = input.getFullYear();
            var month = (input.getMonth() + 1);
            var day = input.getDate();
            var returnValue = year + "-" + month + "-" + day;
            return returnValue.toString();
        }
        else if (typeof input === 'number') {
            return "$" + input.toString();
        }
        else {
            return input.substring(0, stringCount) + "...";
        }
    };
    return Formatter1;
}());
var formatter = new Formatter1();
console.log(formatter.format(new Date(), 0));
console.log(formatter.format(42.99, 0));
console.log(formatter.format("Very long text", 10));
