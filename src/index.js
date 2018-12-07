function parse(v) {
	const mo = v.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*))?$/);
	if (!mo) throw new Error("Failed to parse version number: " + v);
	return [ mo[1], mo[2], mo[3] ].concat(mo[4] ? mo[4].split(".") : []);
}

function join(a) {
	let r = a.slice(0, 3).join(".");
	if (a.length > 3) r += "-" + a.slice(3).join(".");
	return r;
}

function cmp(a, b) {
	if (a == b) return 0;
	if (a < b) return -1;
	if (a > b) return +1;
}

// Numbers sort numerically; other strings sort lexicographically; numbers come before non-numbers
function cmpAlphanum(a, b) {
	const a_is_numeric = !!a.match(/^\d+$/),
	      b_is_numeric = !!b.match(/^\d+$/);

	if (a_is_numeric && !b_is_numeric) return -1;
	if (!a_is_numeric && b_is_numeric) return +1;

	return a_is_numeric ? cmp(+a, +b) : cmp(a, b);
}

// Compare parsed version numbers per semver spec
function cmpVersions(a, b) {
	const n = Math.min(a.length, b.length);
	for (var i = 0; i < n; i++) {
		const c = cmpAlphanum(a[i], b[i]);
		if (c != 0) return c;
	}
	return cmp(a.length, b.length);
}

export { parse, join, cmpVersions as cmp };
