/**
 * Type declaration for the worker bundle that `opennextjs-cloudflare build`
 * generates. It does not exist before the first build, so declaring it here
 * keeps `worker.ts` type-safe without needing a ts-ignore.
 */
declare module "./.open-next/worker.js" {
  const handler: {
    fetch(request: Request, env: unknown, ctx: unknown): Promise<Response>;
  };
  export default handler;

  export const BucketCachePurge: unknown;
  export const DOQueueHandler: unknown;
  export const DOShardedTagCache: unknown;
}
