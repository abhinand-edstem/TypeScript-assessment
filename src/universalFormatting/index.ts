class Formatter {
    // Function overloads
    format(date: Date): string;
    format(price: number): string;
    format(text: string, maxLength?: number): string;

    // Implementation
    format(input: Date | number | string, maxLength: number = 10): string {
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
        } catch (error) {
            console.error("Formatting error:", error);
            return this.getDefaultValue(input);
        }
    }

    private formatDate(date: Date): string {
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }

        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    }

    private formatCurrency(amount: number): string {
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

    private formatText(text: string, maxLength: number): string {
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

    private getDefaultValue(input: unknown): string {
        if (input instanceof Date) return "Invalid Date";
        if (typeof input === "number") return "$0.00";
        if (typeof input === "string") return "";
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
    } catch (e) {
        console.error(e);
    }

    console.log('\nCurrency Formatting:');
    console.log(formatter.format(42.99));      // "$42.99"
    console.log(formatter.format(1234.5));     // "$1,234.50"
    console.log(formatter.format(0.1));        // "$0.10"

    console.log('\nText Formatting:');
    console.log(formatter.format("Short text"));                    // "Short text"
    console.log(formatter.format("Very long text that needs truncating", 15)); // "Very long text..."
    console.log(formatter.format(""));                             // ""

    // Error cases
    console.log('\nError Handling:');
    try {
        console.log(formatter.format("Text", -1)); // Throws error
    } catch (e) {
        console.error(e);
    }
}

// Alternative implementation with specific formatters
class AdvancedFormatter {
    formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }

        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        return new Intl.DateTimeFormat('en-US', options || defaultOptions)
            .format(date);
    }

    formatCurrency(amount: number, currency: string = 'USD'): string {
        if (!isFinite(amount)) {
            throw new Error("Invalid number");
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    formatText(text: string, options: {
        maxLength: number;
        ellipsis?: string;
        preserveWords?: boolean;
    }): string {
        const { maxLength, ellipsis = '...', preserveWords = true } = options;

        if (!text) return "";
        if (maxLength <= 0) throw new Error("Max length must be positive");
        if (text.length <= maxLength) return text;

        let truncated = text.substring(0, maxLength);

        if (preserveWords) {
            const lastSpace = truncated.lastIndexOf(' ');
            if (lastSpace > maxLength * 0.5) { // Only truncate at word if we're not losing too much
                truncated = truncated.substring(0, lastSpace);
            }
        }

        return `${truncated.trim()}${ellipsis}`;
    }
}

// Example usage of AdvancedFormatter
function demonstrateAdvancedFormatter() {
    const formatter = new AdvancedFormatter();

    console.log('\nAdvanced Date Formatting:');
    const date = new Date('2024-02-15');
    console.log(formatter.formatDate(date)); // Default: "02/15/2024"
    console.log(formatter.formatDate(date, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })); // "Thursday, February 15, 2024"

    console.log('\nAdvanced Currency Formatting:');
    console.log(formatter.formatCurrency(1234.56));     // "$1,234.56"
    console.log(formatter.formatCurrency(1234.56, 'EUR')); // "€1,234.56"

    console.log('\nAdvanced Text Formatting:');
    console.log(formatter.formatText("This is a long sentence that needs truncating", {
        maxLength: 20,
        preserveWords: true
    })); // "This is a long..."

    console.log(formatter.formatText("This_is_a_long_string_without_spaces", {
        maxLength: 15,
        preserveWords: false,
        ellipsis: '→'
    })); // "This_is_a_long_→"
}

// Run demonstrations
demonstrateFormatter();
demonstrateAdvancedFormatter();