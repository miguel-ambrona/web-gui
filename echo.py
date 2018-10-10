#!/usr/bin/env python

import os
import sys

unbuffered = os.fdopen(sys.stdout.fileno(), 'w', 0)

while True:
    a = raw_input()
    unbuffered.write(a + "\n")
