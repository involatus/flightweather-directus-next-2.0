import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    [process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '']: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  },
  documents: ['app/**/*.tsx', 'app/**/*.ts', 'app/**/*.graphql'],
  generates: {
    './app/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        skipTypename: true,
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;