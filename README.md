A short and simple module for parsing and comparing semantic version numbers, following the [Semantic Versioning 2.0.0](https://semver.org/) specification.

Does not support build metadata.

```js
import semver from "@flourish/semver";

semver.parse("1.0.0");
// Returns [1, 0, 0]

semver.parse("1.0.0-alpha.1.2.3");
// Returns [1, 0, 0, "alpha", 1, 2, 3]
```

```js
semver.join([1, 2, 3]); // "1.2.3"

semver.join([1, 2, 3, "alpha", 2]); // "1.2.3-alpha.2"
```

```js
semver.cmp(semver.parse(""), semver.parse("")); // -1

// Sort a list of version numbers into order
version_numbers
    .map(semver.parse)
    .sort(semver.cmp)
    .map(semver.join);
```
