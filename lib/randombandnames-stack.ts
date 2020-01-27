import * as cdk from '@aws-cdk/core';
import bandnames_service = require('../lib/bandnames_service');

export class RandombandnamesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new bandnames_service.BandNamesService(this, 'BandNames');
  }
}
