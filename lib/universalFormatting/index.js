"use strict";
class Formatter {
    // Implementation
    format(input, maxLength = 10) {
        try {
            if (input instanceof Date) {
                return this.formatDate(input);
            }
            if (typeof input === "number") {
                return this.formatCurrency(input);
            }
            if (typeof input === "string") {
                return this.formatText(input, maxLength);
            }
            throw new Error("Unsupported input type");
        }
        catch (error) {
            console.error("Formatting error:", error);
            return this.getDefaultValue(input);
        }
    }
    formatDate(date) {
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }
        return date.toISOString().split('T')[0]; // 2024-10-21T00:00:00.000Z / Returns YYYY-MM-DD
    }
    formatCurrency(amount) {
        if (!isFinite(amount)) {
            throw new Error("Invalid number");
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
    formatText(text, maxLength) {
        if (!text) {
            return "";
        }
        if (maxLength <= 0) {
            throw new Error("Max length must be positive");
        }
        if (text.length <= maxLength) {
            return text;
        }
        return `${text.substring(0, maxLength).trim()}...`;
    }
    getDefaultValue(input) {
        if (input instanceof Date)
            return "Invalid Date";
        if (typeof input === "number")
            return "$0.00";
        if (typeof input === "string")
            return "";
        return "Invalid Input";
    }
}
// Example usage and testing
function demonstrateFormatter() {
    const formatter = new Formatter();
    console.log('\nDate Formatting:');
    console.log(formatter.format(new Date('2024-02-15'))); // "2024-02-15"
    try {
        console.log(formatter.format(new Date('invalid'))); // Shows error and returns "Invalid Date"
    }
    catch (e) {
        console.error(e);
    }
    console.log('\nCurrency Formatting:');
    console.log(formatter.format(42)); // "$42.99"
    console.log(formatter.format(1234.5)); // "$1,234.50"
    console.log(formatter.format(0.1)); // "$0.10"
    console.log('\nText Formatting:');
    console.log(formatter.format("Short text")); // "Short text"
    console.log(formatter.format("Very long text that needs truncating", 15)); // "Very long text..."
    console.log(formatter.format("")); // ""
    // Error cases
    console.log('\nError Handling:');
    try {
        console.log(formatter.format("Text", -1)); // Throws error
    }
    catch (e) {
        console.error(e);
    }
}
// Run demonstrations
demonstrateFormatter();
