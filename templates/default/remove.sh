#!/bin/bash
find etc -type f | sed "s|etc|/etc|" | xargs rm
