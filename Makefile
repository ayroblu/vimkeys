# Example from
# https://tech.davis-hansson.com/p/make/
# Also consider reference at: http://www.gnu.org/software/make/manual/

## Initial setup
SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eux -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

ifeq ($(origin .RECIPEPREFIX), undefined)
  $(error This Make does not support .RECIPEPREFIX. Please use GNU Make 4.0 or later)
endif
.RECIPEPREFIX = >

## ------------------------- Main part of the build file
AppName := vimkeys
AppTargetName := 'vimkeys (macOS)'
Configuration := Debug

# Default - top level rule is what gets ran when you run just `make`
build: DerivedData/${AppName}/Build/Products/${Configuration}/${AppName}.sentinel
.PHONY: build

# ------------------

dist/content.js: src/content.ts
> npx tsc
> cp "$@" "Shared (Extension)/Resources/content.js"

DerivedData/${AppName}/Build/Products/${Configuration}/${AppName}.sentinel: $(shell rg --files 'Shared (App)' 'Shared (Extension)' 'iOS (App)' 'iOS (Extension)' 'macOS (App)' 'macOS (Extension)' '${AppName}.xcodeproj' | sed 's: :\\ :g') dist/content.js
> xcodebuild -scheme ${AppTargetName} -target ${AppTargetName} -configuration ${Configuration} -destination arch=arm64 build || xcodebuild -scheme ${AppTargetName} -target ${AppTargetName} -configuration ${Configuration} -destination arch=arm64 clean build
> touch "$@"
