<template>
  <div v-html="markdown" class="prose lg:prose-xl"></div>
</template>

<script>
const hljs = require('highlight.js')
const markdownIt = require('markdown-it')({
  highlight(str, lang) {


    if (lang && hljs.getLanguage(lang)) return `<pre class="hljs language-${lang.toLowerCase()}"><code>${hljs.highlightAuto(str).value}</code></pre>`
    return `<pre class="hljs"><code>${str}</code></pre>`
  }
})
export default {
  props: {
    value: {
      required: true
    }
  },
  computed: {
    markdown() {
      return markdownIt.render(this.value)
    }
  }
}
</script>

<style src="highlight.js/styles/paraiso-dark.css">

</style>
<style>
.hljs {
  @apply rounded;
}
</style>
