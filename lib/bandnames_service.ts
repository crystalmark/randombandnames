import core = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");

export class BandNamesService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);


    const handler = new lambda.Function(this, "BandNameHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.asset("build/randombandnames"),
      handler: "index.handler",
      environment: {
      }
    });

    const api = new apigateway.RestApi(this, "bandnames-api", {
      restApiName: "Random Band Names",
      description: "Generate random band names."
    });

    const getBandNamesIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getBandNamesIntegration);
  }
}