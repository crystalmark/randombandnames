import * as cdk from '@aws-cdk/core';
import bandnames_service = require('./bandnames_service');
import { StaticSite } from './static_site';

export class RandombandnamesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const service = new bandnames_service.BandNamesService(this, 'BandNames');

    new StaticSite(this, 'StaticSite', service);
  }
}
