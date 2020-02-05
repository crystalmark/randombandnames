import core = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");

export class BandNamesService extends core.Construct {
  private api: apigateway.RestApi;

  constructor(scope: core.Construct, id: string) {
    super(scope, id);


    const handler = new lambda.Function(this, "BandNameHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.asset("build/randombandnames"),
      handler: "index.handler",
      environment: {
      }
    });

    this.api = new apigateway.RestApi(this, "bandnames-api", {
      restApiName: "Random Band Names",
      description: "Generate random band names.",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: ['GET']
      }
    });

    const getBandNamesIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    this.api.root.addMethod("GET", getBandNamesIntegration);

    new core.CfnOutput(this, 'ApiUrl', { value: this.api.url });

  }

  public getAPIUrl() {
    // https://wc8ifn7koc.execute-api.eu-west-2.amazonaws.com/prod
    return this.api.url;
  }

}