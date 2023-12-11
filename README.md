# Web2print

## 2 dossiers de travail

1. BASE : fichiers html/css avec la bibliothèque javascript paged.js

> Fichier index.html avec le contenu
> Style css pour l'interface, la gestion des pages, le design de la page

- serveur http
`python -m http.server`

2. COMPLET : l'html est généré par un script node.js depuis du markdown

> Gestion des césures avec Hyphenopoly
> Serveur node.js
> Markdown vers html

- première installation
`npm install`
`npm run start`

- pour parser md, html et css
`npm run all`

- pour prévisualiser
`npm run serve`

Basé sur le boilerplate de Julien Taquet et la publication DTCC:
https://gitlab.coko.foundation/pagedjs/pagedjs-book-template
https://github.com/RandomLab/New_Pedagogical_online_offline_Realities.pub

## Pré traitement du texte

Avec pandoc :
https://pandoc.org/

- On convertit un fichier de texte (.docx, .odt) vers markdown
`pandoc -s texte.docx --wrap=none --reference-links -t markdown -o texte.md`

- markdown vers html
`pandoc -s index.md -o dist/index.html --template template.html --css assets/style.css`

https://github.com/RandomLab/memoires.sh

## Post traitement

## parser le mardown
pandoc ajouter 

### ajouter la gestion des césures
hyphenopoly
https://github.com/mnater/Hyphenopoly

### ajouter des notes dans la marge
Plugin pour paged.js
https://gitlab.coko.foundation/pagedjs/pagedjs-plugins/margin-notes

### Ghostscript
Interpréteur Postscript et pour le traitement des PDF
https://www.ghostscript.com/

#### ajouter un profil CMJN spécifique

- télécharger et copier le fichier de profil .icc  

`gs \
-sOutputFile=cmyk.pdf \
-dNOPAUSE \
-dBATCH \
-sDEVICE=pdfwrite \
-sProcessColorModel=DeviceCMYK \
-sColorConversionStrategy=CMYK \
-sColorConversionStrategyForImages=CMYK \
-sDefaultCMYKProfile='/usr/share/color/icc/Coated_Fogra39L_VIGC_300.icc' \
-sOutputICCProfile='/usr/share/color/icc/Coated_Fogra39L_VIGC_300.icc' \
-dOverrideICC=true \
input.pdf`

#### compresser le pdf

- préréglages : printer, prepress, screen
https://gist.github.com/guifromrio/6390547

`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/printer -dNOPAUSE -dQUIET -dBATCH -sOutputFile=compressed_PDF_file.pdf input_PDF_file.pdf`

### hook js
capture des images TODO

## Autres outils
- Plugins pour paged.js
https://gitlab.coko.foundation/pagedjs/pagedjs-plugins

- weasyprint
https://weasyprint.org/
