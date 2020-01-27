#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RandombandnamesStack } from '../lib/randombandnames-stack';

const app = new cdk.App();
new RandombandnamesStack(app, 'RandombandnamesStack');
