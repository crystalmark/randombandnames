var pluralize = require('pluralize')

export class SentenceManipulator {

    constructor() {
    }

    public shuffle(sentences: string[]) {
        var currentIndex = sentences.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = this.random(currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = sentences[currentIndex];
            sentences[currentIndex] = sentences[randomIndex];
            sentences[randomIndex] = temporaryValue;
        }

        return sentences;
    }

    public clean(text: string) {
        var replaced: string = text.replace(/<[^>]*>/g, '');

        "/\[]:|<>+=;,?*\"!£(){}".split('').forEach((c) => {
            replaced = replaced.replace(c, '');
        });

        return replaced;
    }

    public separateSentences(text: string) {
        return text.split(/[.,;\"():!]+/).map((t: string) => t.trim()).filter((t: string) => t.length > 1);
    }

    public flatten(array: Array<any>) {
        var flatarray = new Array<string>();
        array.forEach(element => flatarray = flatarray.concat(element));
        return flatarray;
    }

    public firstWords(sentence: string) {
        const words = sentence.split(" ");
        var count = 1;
        if (words.length <= 6) {
            count = this.random(words.length);
        }
        else {
            count = this.random(6);
        }
        return words.slice(0, count).join(" ");
    }

    public removeThe(sentence: string) {
        if (sentence.toLowerCase().endsWith(" the")) {
            return sentence.substr(0, sentence.length - 4);
        } else return sentence;
    }

    public addThe(sentence: string) {
        if (sentence.toLowerCase().startsWith("the ")) {
            if (this.random(100) < 50) {
                return sentence.substring(4);
            }
            else {
                return sentence;
            }
        }
        else if (sentence.split(" ").length == 1) {
            if (this.random(100) < 50) {
                return "The " + sentence;
            }
            else {
                return sentence;
            }
        }
        else {
            if (this.random(100) < 20) {
                return "The " + sentence;
            }
            else {
                return sentence;
            }
        }
    }

    public capitalize(sentence: string) {
        return (sentence.toLowerCase().replace(/(?:^|\s)\S/g, (a) => { return a.toUpperCase(); }));
    };

    private smalls = new RegExp("^(at|i|in|a|of|it|are|or|and|to|he|was|is|her|their|they)$");
    public removeSmalls(sentence: string) {
        return sentence.split(' ')
            .filter((t: string) => !this.smalls.test(t.toLowerCase()))
            .join(' ');
    }

    private random(max: number): number {
        return Math.floor(Math.random() * max);
    }

    public pluralize(sentence: string) {
        if (this.random(100) > 33) {
            const words = sentence.split(' ');
            const i = words.length - 1;
            words[i] = pluralize(words[i]);
            return words.join(' ');
        }
        else return sentence;
    }
}