import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
export class CdkprimerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, "OgVpc-1", {maxAzs: 2});

    const cluster = new ecs.Cluster(this, "OgCluster-1", {vpc: vpc});

      new ecs_patterns.ApplicationLoadBalancedFargateService(this, "OgFargateService-1", {

          cluster: cluster,

          taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample") },

          publicLoadBalancer: true

      });

  }
}
