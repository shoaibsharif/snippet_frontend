<template>
  <div v-html="markdown" class="prose dark:prose-dark max-w-none dark:text-white"></div>
</template>

<script>
import Vue from "vue";
import AppCopyButton from "@/components/CopyButton";

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
  mounted() {
    setTimeout(function () {
      const blocks = document.querySelectorAll("pre.hljs")
      for (const block of blocks) {
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el);
      }
    }, 250)
  },
  computed: {
    markdown() {
      let mode, wrapBody = this.step.body;
      if (process.client == true) {
        mode = this.detectMode(this.step.title)

      }

      if (mode === 'markdown') {
        return markdownIt.render(wrapBody);
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
      const getExtensionFromTitle = title.split('.')
      if (getExtensionFromTitle[getExtensionFromTitle.length - 1] && hljs.getLanguage(getExtensionFromTitle[getExtensionFromTitle.length - 1])) {
        return getExtensionFromTitle[getExtensionFromTitle.length - 1]

      }

    }
  },
}
</script>

<style src="highlight.js/styles/paraiso-dark.css">

</style>
<style lang="scss">
.hljs {
  @apply rounded font-fira transition-all duration-300 relative;
  &:hover {
    button.copyclipboard {
      @apply opacity-100 visible;
    }
  }

  button.copyclipboard {
    @apply absolute bottom-1 right-2 invisible opacity-10 transition-opacity duration-300;
    svg {
      @apply bg-gray-600 rounded p-1;
    }

  }

}
</style>
