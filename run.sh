#!/usr/bin/env sh
flatpak run org.flatpak.Builder --install --user --force-clean _build build-aux/io.github.flattool.Ignition.json \
&& flatpak run io.github.flattool.Ignition//master
