# @glowsrc/dns
A simple dns resolver which wraps node:dns

# usage

```ts
import { resolve } from "@glowsrc/dns";
resolve("google.com").then(console.log)
// {
//  ip4: [ '142.250.206.238' ],
//  ip6: [ '2404:6800:400a:80e::200e' ],
//  cname: []
// }
```

# options
```ts
resolve("google.com", { dns:[ "1.1.1.1", "8.8.8.8" ] })
```
You can set your own dns to use(In `[string]`)