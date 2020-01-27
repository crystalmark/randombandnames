import fetch from 'node-fetch';
const BeautifulDom = require('beautiful-dom');

const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.'\"";

export const handler = async (event: any = {}) : Promise <any> => {


    var randomUrl = 'https://en.wikipedia.org/wiki/Special:Random';
    const response = await fetch(randomUrl)
    const body = await response.text();
    const dom = new BeautifulDom(body);

    const paragraphs = dom.getElementsByTagName("p");

    var bandnames = new Array<String>();
    var counter = 0;

    while ( bandnames.length < 5 && counter++ < 5){
        const sentences = flatten(paragraphs
            .map( (paragraph: { innerHTML: string; }) => {
                return clean(paragraph.innerHTML);
            })
            .map( (paragraph: string) => {
                return separateSentences(paragraph);
            }))
            .map( (sentence: string) => {
                return firstWords(sentence);
            })
            .map( (sentence: string) => {
                return addThe(sentence);
            })
            .map( (sentence: string) => {
                return capitalize(sentence);
            }).filter((sentence: string) => {
                return sentence.length > 2;
            })
            ;

        bandnames = bandnames.concat(sentences);
    }

    return { "isBase64Encoded": false, headers: {}, statusCode: 200, body: JSON.stringify(bandnames.slice(0,5)) };
};

function clean(text: string){
    return text.replace(/<\/?[^>]+(>|$)/g, "").replace("/&#..;/g", "");
}

function separateSentences(text : string){
    return text.split("\. ").map((t: string) => t.trim()).filter((t: string) => t.length > 1);
}

function flatten(array : Array<any>){
    var flatarray = new Array<string>();
    array.forEach( element => flatarray = flatarray.concat(element));
    return flatarray;
}

function firstWords(sentence : string){
    const words = sentence.split(" ");
    var count = 1;
    if ( words.length > 2){
        if ( words.length <= 5 ) {
            count = Math.random()*words.length;
        }
        else {
            count = Math.random()*5;
        }
        return words.slice(0, count).join(" ");
    }
    else {
        return sentence;
    }
}

function addThe(sentence : string){
    if ( sentence.toLowerCase().startsWith("the ")){
        if ( Math.random() < 0.5){
            return sentence.substring(4);
        }
        else {
            return sentence;
        }
    }
    else{
        if ( Math.random() < 0.2){
            return "The "+sentence;
        }
        else {
            return sentence;
        }
    }
}

function capitalize (sentence : string) {
    return (sentence.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }));
};