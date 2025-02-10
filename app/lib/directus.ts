'use client';

import { createDirectus, rest, graphql } from '@directus/sdk';

export type Schema = {
  webcams: {
    id: string;
    name: string;
    url: string;
    id_key: string;
    tags: string;
  }
};

const directus = createDirectus<Schema>('https://directus.lanz.aero')
  .with(rest())
  .with(graphql());

export { directus };