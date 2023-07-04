/* Amplify Params - DO NOT EDIT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIENDPOINTOUTPUT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIIDOUTPUT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { Sha256 } = require('@aws-crypto/sha256-js');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const fetch = require('node-fetch');
const { Request } = fetch;

const GRAPHQL_ENDPOINT = process.env.API_FUNCTIONSONSTEROIDS_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

/**
 * @type {import('@types/aws-lambda').AmplifyGraphQlResolverHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);

  const { id } = event.arguments;
  const existing = await getTodo(id);
  const updated = await toggleIsCompleted(existing);

  console.log(`RESPONSE: ${JSON.stringify(updated, null, 2)}`);
  return updated;
};

async function getTodo(id) {
  const query = /* GraphQL */ `
    query GetTodo($id: ID!) {
      getTodo(id: $id) {
        id
        title
        isCompleted
        createdAt
        updatedAt
        __typename
      }
    }
  `;
  const variables = { id };

  const { getTodo } = await appSyncRequest(query, variables);

  return getTodo;
}

async function toggleIsCompleted(todo) {
  const query = /* GraphQL */ `
    mutation UpdateTodo($input: UpdateTodoInput!) {
      updateTodo(input: $input) {
        id
        title
        isCompleted
        createdAt
        updatedAt
        __typename
      }
    }
  `;
  const variables = {
    input: {
      id: todo.id,
      isCompleted: !todo.isCompleted
    }
  };

  const { updateTodo } = await appSyncRequest(query, variables);

  return updateTodo;
}

async function appSyncRequest(query, variables = {}) {
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
