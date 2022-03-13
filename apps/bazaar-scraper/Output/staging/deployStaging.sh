#!/bin/bash
cp Output/*.json Output/staging/
surge Output/staging/ staging-static-exevopan.surge.sh