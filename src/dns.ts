import { Resolver, resolve4, resolve6, resolveCname } from "node:dns/promises";

export interface DNSLookupCallback {
  ip4: Array<string>;
  ip6: Array<string>;
  cname: Array<string>;
}

export interface ResolveOptions {
  resolve4: Function;
  resolve6: Function;
  resolveCname: Function;
  dns: Array<string>;
}

export const DefaultResolveOptions: ResolveOptions = {
  resolve4,
  resolve6,
  resolveCname,
  dns: ["1.1.1.1", "8.8.8.8", "8.8.4.4"],
};

export async function resolve(
  host: string,
  options: ResolveOptions = DefaultResolveOptions
): Promise<DNSLookupCallback> {
  const resolver = new Resolver();
  resolver.setServers(options.dns);
  return Promise.allSettled([
    options.resolve4(host),
    options.resolve6(host),
    options.resolveCname(host),
  ]).then(records => {
    const rec: DNSLookupCallback = {
      ip4: [],
      ip6: [],
      cname: [],
    };
    records.map((x, i) => {
      if (x.status === "rejected") return;
      if (i === 0) return (rec.ip4 = x.value);
      if (i === 1) return (rec.ip6 = x.value);
      if (i === 2) return (rec.cname = x.value);
    });
    return rec;
  });
}

export default resolve;
