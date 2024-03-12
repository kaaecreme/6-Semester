#!/bin/bash

# Run QEMU setup command
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

# Create and use the buildx builder
docker buildx create --use

# Build the Docker image using buildx and push it into the a registry
docker buildx build --platform linux/arm64/v8,linux/amd64 --tag multi_arch_build .
