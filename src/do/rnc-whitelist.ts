/**
 * RNCs that do not match the check digit but were issued nonetheless.
 *
 * Copied from python-stdnum (stdnum/do/rnc.py, commit 006192e).
 */
export const RNC_WHITELIST: ReadonlySet<string> = new Set(
  `
101581601 101582245 101595422 101595785 10233317 131188691 401007374
501341601 501378067 501620371 501651319 501651823 501651845 501651926
501656006 501658167 501670785 501676936 501680158 504654542 504680029
504681442 505038691
`
    .trim()
    .split(/\s+/),
);
