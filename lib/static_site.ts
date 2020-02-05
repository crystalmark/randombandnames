import cloudfront = require('@aws-cdk/aws-cloudfront');
import s3 = require('@aws-cdk/aws-s3');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import cdk = require('@aws-cdk/core');
import { Construct } from '@aws-cdk/core';
import fs = require('fs');
import { BandNamesService } from './bandnames_service';

export class StaticSite extends Construct {
    constructor(scope: Construct, id: string, apiService: BandNamesService) {
        super(scope, id);

        new cdk.CfnOutput(this, 'API Service URL ', { value: apiService.getAPIUrl() });

        // Content bucket
        const siteBucket = new s3.Bucket(this, 'SiteBucket', {
            bucketName: "randombandnamessite",
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'error.html',
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
        });
        new cdk.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });

        // CloudFront distribution that provides HTTPS
        const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: siteBucket
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                }
            ]
        });
        new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

        // fs.writeFile('./website/site.properties', 'apiurl: ' + apiUrl, function (err: any) {
        //     if (err) {
        //         return console.error(err);
        //     }
        // });

        // Deploy site contents to S3 bucket
        new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
            sources: [s3deploy.Source.asset('./website')],
            destinationBucket: siteBucket,
            distribution,
            distributionPaths: ['/*'],
        });
    }
}