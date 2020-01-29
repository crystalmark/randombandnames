import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import Randombandnames = require('../lib/randombandnames-stack');
import Lambda = require('../src/randombandnames')
import { SentenceManipulator } from '../src/randombandnames/sentencemanipulator';


test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Randombandnames.RandombandnamesStack(app, 'BandNames');
  // THEN
  // expectCDK(stack).to(matchTemplate({
  //   "Resources": {}
  // }, MatchStyle.EXACT))

  expectCDK(stack);
});

test('Shuffle', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;

  const test = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
  const expectedResult = ['a', 'j', 'b', 'h', 'c', 'l', 'd', 'i', 'e', 'k', 'f', 'm', 'g'];

  const sm = new SentenceManipulator();
  return expect(sm.shuffle(test)).toEqual(expectedResult);

});

test('Clean', () => {
  const test = 'a!b\"<span>c</span>£d(e)f{g}h<i>j';
  const expected = 'abcdefghj'

  const sm = new SentenceManipulator();
  return expect(sm.clean(test)).toEqual(expected);

});

test('separateSentences', () => {
  const test = 'aa.bb(cc)dd\"ee,ff;g g';
  const expected = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'g g']

  const sm = new SentenceManipulator();
  return expect(sm.separateSentences(test)).toEqual(expected);

});

test('Remove Small Words', () => {
  const test = 'Timmy he woz ere at home in Yorkshire';
  const expected = 'Timmy woz ere home Yorkshire'

  // Lambda.handler();

  const sm = new SentenceManipulator();
  return expect(sm.removeSmalls(test)).toEqual(expected);

});

