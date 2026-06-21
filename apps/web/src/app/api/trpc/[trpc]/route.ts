import type { NextRequest } from 'next/server'
import { createContext } from '@jiangui-resume/api/context'
import { appRouter } from '@jiangui-resume/api/router'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
  })
}
export { handler as GET, handler as POST }
