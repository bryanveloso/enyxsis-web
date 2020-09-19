/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.graphqls' {
  import { DocumentNode } from 'graphql'
  export default typeof DocumentNode
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.yml'