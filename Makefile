inkscape= $(shell which inkscape || which /Applications/Inkscape.app/Contents/Resources/bin/inkscape)

files= \
 Better_UT-mate.user.js \
 manifest.json \
 icon48.png \
 icon128.png

outzip= BetterUTmate.zip

all: $(outzip)

$(outzip): $(files)
	zip $@ $(files)

icon48.png: UTmate.svg
	$(inkscape) -e "$(abspath $@)" -w 48 -h 48 "$(abspath $<)"
	optipng -o7 $@

icon128.png: UTmate.svg
	$(inkscape) -e "$(abspath $@)" -w 128 -h 128 "$(abspath $<)"
	optipng -o7 $@
