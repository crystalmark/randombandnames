import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import Randombandnames = require('../lib/randombandnames-stack');
import Lambda = require('../src/randombandnames')

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

test('Lambda returns Tim woz ere', () => {
  expect.assertions(1);
  const expectedResponse = { "body": JSON.stringify(["Tim woz ere", "Tim is still here"]), "headers": {}, "isBase64Encoded": false, "statusCode": 200};
  return expect(Lambda.handler()).resolves.toHaveBeenCalled();
});
