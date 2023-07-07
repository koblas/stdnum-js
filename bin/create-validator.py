#!/usr/bin/env python3

import os
import re
import os.path 
import sys

basedir = os.path.dirname(__file__)

RE = r'{{\s*([a-zA-Z_]+[a-zA-Z0-9_])\s*}}'

def fatal(msg):
    print(msg)
    sys.exit(1)

def replace(tmpl, params):
    return re.sub(RE, lambda match: params.get(match.group(1),''), tmpl)

def main(kind):
    with open(os.path.join(basedir, 'tmpl', 'tin.ts')) as fd:
        tinTmpl = fd.read()
    with open(os.path.join(basedir, 'tmpl', 'tin.spec.ts')) as fd:
        specTmpl = fd.read()

    parts = os.path.split(kind)
    if len(parts) != 2:
        fatal("expected path should be COUNTRY/TIN")
    if '.' in parts[1]:
        fatal("found . in path")

    root = os.path.join(basedir, '..', 'src', parts[0])

    if not os.path.isdir(root):
        os.mkdir(root)

    tinFile = os.path.join(root, "{}.ts".format(parts[1]))
    specFile = os.path.join(root, "{}.spec.ts".format(parts[1]))

    if os.path.isfile(tinFile):
        fatal("TIN file exists {}".format(os.path.normpath(tinFile)))
    if os.path.isfile(specFile):
        fatal("SPEC file exists {}".format(os.path.normpath(specFile)))

    params = {
        'country': parts[0],
        'tincode': parts[1],
        'tincode_upper': parts[1].upper(),
    }

    with open(tinFile, 'w') as fd:
        fd.write(replace(tinTmpl, params))
    with open(specFile, 'w') as fd:
        fd.write(replace(specTmpl, params))
    with open(os.path.join(root, 'index.ts'), 'a') as fd:
        fd.write("export * as {tincode} from './{tincode}';\n".format(**params))
    

main(sys.argv[1])
