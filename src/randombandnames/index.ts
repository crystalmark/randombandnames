import fetch from 'node-fetch';
import { SentenceManipulator } from './sentencemanipulator';
import { BandNamesService } from '../../lib/bandnames_service';
const BeautifulDom = require('beautiful-dom');

class BandName {
    origin: string; name: string;
    constructor(origin: string, name: string) {
        this.origin = origin;
        this.name = name;
    }
};

const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.'\"";

export const handler = async (event: any = {}): Promise<any> => {


    var randomUrl = 'https://en.wikipedia.org/wiki/Special:Random';

    var bandnames: BandName[] = [];
    var counter = 0;

    const sm = new SentenceManipulator();

    while (bandnames.length < 10 && counter++ < 5) {
        const response = await fetch(randomUrl);
        const body = await response.text();
        const dom = new BeautifulDom(body);
        const paragraphs = dom.getElementsByTagName("p");

        const sentences =
            sm.flatten(paragraphs
                .map((p: any) => p.innerHTML)
                .map((p: string) => sm.separateSentences(p))
            )
                .map(p => sm.clean(p))
                .map(s => sm.firstWords(s))
                .map(s => sm.addThe(s))
                .map(s => sm.removeThe(s))
                .map(s => sm.removeSmalls(s))
                .filter(s => s.length > 2)
                .map(s => sm.pluralize(s))
                .map(s => sm.capitalize(s))
                .filter(s => s != "The " && s != "The")
                .filter(function (s: string, index: number, self: string | string[]) {
                    return index == self.indexOf(s);
                })
                .slice(0, 5);

        bandnames = bandnames.concat(toBandnames(sentences, response.url));
    }

    bandnames = shuffle(bandnames);

    // console.log("Total created " + bandnames.length);
    // console.log(JSON.stringify(bandnames.slice(0, 5)));

    return { "isBase64Encoded": false, headers: {}, statusCode: 200, body: JSON.stringify(bandnames.slice(0, 5)) };
};

function toBandnames(sentences: string[], origin: string) {
    return sentences.map(s => new BandName(origin, s));
}

function shuffle(bandnames: any[]) {
    var currentIndex = bandnames.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = bandnames[currentIndex];
        bandnames[currentIndex] = bandnames[randomIndex];
        bandnames[randomIndex] = temporaryValue;
    }

    return bandnames;
}
