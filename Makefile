all: get-bootstrap get-fontawesome get-katex get-ace

get-bootstrap:
	curl -L https://github.com/twbs/bootstrap/releases/download/v5.0.2/bootstrap-5.0.2-dist.zip -o bootstrap.zip
	unzip bootstrap.zip
	mv bootstrap-5.0.2-dist bootstrap
	rm bootstrap.zip

get-fontawsome:
	curl -L https://use.fontawesome.com/releases/v5.15.3/fontawesome-free-5.15.3-web.zip -o fontawesome.zip
	unzip fontawesome.zip
	mv fontawesome-free-5.15.3-web fontawesome
	rm fontawesome.zip

get-katex:
	curl -L https://code.jquery.com/jquery-3.6.0.min.js -o js/jquery-3.6.0.min.js
	curl -L https://github.com/Khan/KaTeX/releases/download/v0.13.11/katex.zip -o katex.zip
	unzip katex.zip
	mv katex imported/
	rm -rf katex*
	rm -rf bootstrap*

get-ace:
	git clone https://github.com/ajaxorg/ace-builds.git
	mv ace-builds imported/
	cp imported/mode-ocaml.js imported/ace-builds/src-noconflict/
	cp imported/theme-mytheme.js imported/ace-builds/src-noconflict/
