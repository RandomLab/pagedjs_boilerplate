import fs from 'fs'

import { dirname, resolve } from 'path'
import path from 'path'
import { fileURLToPath } from 'url'

import { marked } from 'marked'
import fm from 'front-matter'

import { config } from './config.js'
const __dirname = dirname(fileURLToPath(import.meta.url))


/* -------------------
index
----------------------*/

const indexHtml = (pages) => {
    return `<!DOCTYPE html>
    <html>
        <head>
        <meta charset="UTF-8" />
        <title>Digital Tools for Creative Collaboration</title>
        <link href="css/book.css" rel="stylesheet" />
        <script>
            var Hyphenopoly = {
            require: {
                "en-us": "FORCEHYPHENOPOLY"
            },
            paths: {
                patterndir: "./js/hyphenopoly/patterns/",
                maindir: "./js/hyphenopoly/"
            },
            setup: {
                //   set the language for the content
                defaultLanguage: "en-us",
                dontHyphenateClass: "noHyphen",
                safeCopy: true,
                // timeOut: 1000,
                hide: "none",
                selectors: {
                "p, li, blockquote": {
                    minWordLength: 12
                  }
                }
            },
            handleEvent: {
                hyphenopolyEnd: function (e) {
                window.PagedPolyfill.preview();
                }
            }
            }

            window.PagedConfig = {
            auto: false
            }
        </script>
        <script src="js/hyphenopoly/Hyphenopoly_Loader.js"></script>
        <script src="js/pagedjs/paged.polyfill.js"></script>
        </head>


        <body>

        ${pages.join('')}

        </body>

    </html>`
}


/* -------------------
configuration markdown
----------------------*/

marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })

/* -------------------
on lit les .md et on fait l'html
----------------------*/

const articlesHtml = (data) => {

    return (`
    <div class="page ${data.attributes.class}">
        ${ marked(data.body) }
    </div>`)
  }

const createPost = postPath => {
    const data = fs.readFileSync(postPath, "utf8")
    const content = fm(data)
    const article = articlesHtml(content)
    return article
  }

const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach((file) => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        if (path.extname(file) === '.md') {
          arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
        } else {
          if (path.extname(file) !== '.backup' || path.extname(file) !== '.ini') {
            fs.cp(path.join(__dirname, dirPath, "/", file), path.join(__dirname, config.dev.distdirimg, file), (err) => {
              if (err) {
                console.error(err)
              }
            })
          }
        }
      }
    })

    return arrayOfFiles
}

const result = getAllFiles(config.dev.srcMD)

const getAllPages = (arrayOfArticles, allPages) => {

    allPages = allPages || []

    arrayOfArticles.forEach((postMd) => {
        const post = createPost(postMd)
        allPages.push(post)
    })

    return allPages

}

const finalPage = getAllPages(result)

/* -------------------
on enregistre le fichier index
----------------------*/

const index = indexHtml(finalPage)

const createIndex = (indexPage) => {
  if (!fs.existsSync(config.dev.distdir)) fs.mkdirSync(config.dev.distdir)
  fs.writeFile(
      `${config.dev.distdir}/index.html`,
      indexPage,
      (error) => {
        if (error) throw error;
        console.log(`index was created successfully`);
      }
  )
}

createIndex(index)
