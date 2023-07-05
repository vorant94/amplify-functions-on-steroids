import {GraphQLResult} from "@aws-amplify/api-graphql";
import {SignatureV4} from "@aws-sdk/signature-v4";
import {defaultProvider} from "@aws-sdk/credential-provider-node";
import {Sha256} from "@aws-crypto/sha256-js";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {default as fetch, Request} from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env['API_FUNCTIONSONSTEROIDS_GRAPHQLAPIENDPOINTOUTPUT']!;
const AWS_REGION = process.env['AWS_REGION'] || 'us-east-1';

export async function appSyncRequest<TResponse = any, TVariables = any>(
  query: string,
  variables: TVariables
): Promise<NonNullable<GraphQLResult<TResponse>['data']>> {
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({query, variables}),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  const response = await fetch(request);
  const body = await response.json();
  if (body.errors) {
    throw body.errors;
  }

  return body.data;
}
