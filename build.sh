#!/usr/bin/env sh
echo "Building `date`..."
rm -rf dist/
babel src/ -d dist/
echo "Built"
