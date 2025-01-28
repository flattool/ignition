#!/usr/bin/env bash
# Credit: https://gitlab.gnome.org/World/Upscaler/-/blob/main/update_translation.sh?ref_type=heads

BUILD_DIR="translation-build-wee/"
if [ -d "$BUILD_DIR" ]; then
	rm -r "$BUILD_DIR"
fi

meson "$BUILD_DIR"
meson compile -C "$BUILD_DIR" ignition-pot

rm -r "$BUILD_DIR"
unset BUILD_DIR
