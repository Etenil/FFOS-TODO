.PHONY: all

all: icons appcache

icons:
	bash applogos/icons.sh

appcache: clear-appcache
	echo "CACHE MANIFEST" >> todo.appcache
	find . -iname '*.html' -o -iname '*.png' -o -iname '*.css' -o -iname '*.js' | sed 's%\./%%g' >> todo.appcache

clear-appcache:
	rm todo.appcache

