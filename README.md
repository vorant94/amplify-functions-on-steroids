# AmplifyFunctionsOnSteroids

An example project for demonstration how boost AWS Amplify Functions by enabling:

- TypeScript support
- shared code between different lambdas
- Amplify CLI Codegen for both UI and lambdas

# Actual post

[AWS Amplify Functions on steroids](https://vorant94.medium.com/aws-amplify-functions-on-steroids-bffbfc09960c)

# TL;DR

- add yourself into `custom-roles.json` to be able to mock functions
- add a new function by running `amplify add function`
- make sure it's type is `commonjs` in `package.json`
- go over official guide [here](https://docs.amplify.aws/cli/function/build-options/)
- move `event.json` from `src` to `events` folder
- add all `.js` files in `src` folder to `.gitignore`
- duplicate all lambdas deps as devDeps in root `package.json`
- download and edit `amplify.yml` that is responsible for CI/CD
- add Angular project to store shared code
- replace `rootDir` of lambda `tsconfig.json` with `rootDirs`
- update `Handler` property in lambda CloudFormation template
- add aliases to `tsconfig.json` in order to make imports shorter
- add `ts-alias` to `amplify:...` scripts from the official guide
- manually edit `.graphqlconfig.yml` to enable multi-target codegen
