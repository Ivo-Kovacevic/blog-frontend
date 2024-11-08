/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as IndexImport } from './routes/index'
import { Route as UserUserIdImport } from './routes/user/$userId'
import { Route as PostPostIdImport } from './routes/post/$postId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserUserIdRoute = UserUserIdImport.update({
  id: '/user/$userId',
  path: '/user/$userId',
  getParentRoute: () => rootRoute,
} as any)

const PostPostIdRoute = PostPostIdImport.update({
  id: '/post/$postId',
  path: '/post/$postId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/post/$postId': {
      id: '/post/$postId'
      path: '/post/$postId'
      fullPath: '/post/$postId'
      preLoaderRoute: typeof PostPostIdImport
      parentRoute: typeof rootRoute
    }
    '/user/$userId': {
      id: '/user/$userId'
      path: '/user/$userId'
      fullPath: '/user/$userId'
      preLoaderRoute: typeof UserUserIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/post/$postId': typeof PostPostIdRoute
  '/user/$userId': typeof UserUserIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/post/$postId': typeof PostPostIdRoute
  '/user/$userId': typeof UserUserIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/post/$postId': typeof PostPostIdRoute
  '/user/$userId': typeof UserUserIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/register' | '/post/$postId' | '/user/$userId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/register' | '/post/$postId' | '/user/$userId'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/register'
    | '/post/$postId'
    | '/user/$userId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  PostPostIdRoute: typeof PostPostIdRoute
  UserUserIdRoute: typeof UserUserIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  PostPostIdRoute: PostPostIdRoute,
  UserUserIdRoute: UserUserIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/register",
        "/post/$postId",
        "/user/$userId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/post/$postId": {
      "filePath": "post/$postId.tsx"
    },
    "/user/$userId": {
      "filePath": "user/$userId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
