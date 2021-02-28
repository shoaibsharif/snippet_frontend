<template>
  <div v-html="markdown" class="prose dark:text-white"></div>
</template>

<script>
const hljs = require('highlight.js')
const vueHighlight = require('vue-highlight.js/lib/languages/vue')
hljs.registerLanguage('vue', vueHighlight);
const markdownIt = require('markdown-it')({
  highlight(str, lang) {

    if (lang && hljs.getLanguage(lang)) return `<pre class="hljs language-${lang.toLowerCase()}"><code>${hljs.highlightAuto(str).value}</code></pre>`
    return `<pre class="hljs language-text"><code>${markdownIt.renderInline(str)}</code></pre>`
  }
})
export default {
  props: {
    step: {
      required: true
    }
  },
  data() {
    return {
      codeMode: null
    }
  },
  computed: {
    markdown() {
      let mode, wrapBody = this.step.body;
      if (process.client == true) {
        mode = this.detectMode(this.step.title)

      }
      if (mode) {

        wrapBody = "```" + mode + "\n"
          + this.step.body + "\n"
          + "```"
      } else if (this.step.title.includes('.')) {
        wrapBody = "```" + "\n"
          + this.step.body + "\n"
          + "```"
      }
      return markdownIt.render(wrapBody)
    }
  },

  methods: {
    detectMode(title) {
      const CodeMirror = require('codemirror')
      require("codemirror/mode/meta")

      let val = title, m, mode, spec;
      if (m = /.+\.([^.]+)$/.exec(val)) {
        const info = CodeMirror.findModeByExtension(m[1]);
        if (info) {
          mode = info.mode;
          spec = info.mime;
        }
      } else if (/\//.test(val)) {
        const info = CodeMirror.findModeByMIME(val);
        if (info) {
          mode = info.mode;
          spec = val;
        }
      } else {
        mode = spec;
      }
      if (mode && mode !== 'null') {
        return mode;
      }
      const arr = title.split('.')
      if (arr[arr.length - 1] && hljs.getLanguage(arr[arr.length - 1])) {
        console.log(arr[arr.length - 1])
        return arr[arr.length - 1]

      }

    }
  },
}
</script>

<style src="highlight.js/styles/paraiso-dark.css">

</style>
<style>
.hljs {
  @apply rounded font-fira;
}
</style>
