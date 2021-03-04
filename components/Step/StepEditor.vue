<template>
  <textarea id="editor"></textarea>
</template>

<script>


export default {
  props: {
    step: {
      required: true
    }
  },
  data() {
    return {
      codemirror: null
    }
  },
  computed: {
    document() {
      return this.codemirror.getDoc()
    }
  },
  watch: {
    "step.id"() {
      this.document.setValue(this.step.body)
    },

  },
  mounted() {
    require("codemirror/addon/edit/closebrackets")
    require("codemirror/addon/edit/continuelist")
    require("codemirror/addon/runmode/runmode")
    require("codemirror/mode/gfm/gfm")

    // require("codemirror/mode/javascript/javascript")
    // require("codemirror/addon/hint/javascript-hint")
    const Codemirror = require('codemirror')
    this.codemirror = Codemirror.fromTextArea(document.getElementById('editor'), {
      mode: "gfm",
      indentUnit: 2,
      indentWithTabs: false,
      lineNumbers: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      addModeClass: true,
      smartIndent: true,
      theme: "solarized dark",
      extraKeys: {
        Enter: (editor) => {
          editor.execCommand("newlineAndIndentContinueMarkdownList");
        }
      },
    })
    this.document.setValue(this.step.body)
    this.document.on("change", codemirror => {
      this.$emit('input', codemirror.getValue())
    })
    this.changeMode();
    this.$watch("step.title", this.changeMode, {immediate: true})
  },
  methods: {
    changeMode() {
      const CodeMirror = require('codemirror')
      require("codemirror/mode/meta")
      require('codemirror/addon/mode/simple')
      // require('codemirror/mode/')
      let val = this.step.title, m, mode, spec;
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
      if (mode && mode != "null") {
        this.codemirror.setOption("mode", spec);
        require(`codemirror/mode/${mode}/${mode}`)
      } else {
        require(`codemirror/mode/gfm/gfm`)
      }
    }
  },
}
</script>
<style src="codemirror/lib/codemirror.css"></style>
<style src="codemirror/theme/solarized.css"/>
<style>
.CodeMirror {
  @apply w-full font-fira text-base border-dashed border-2 border-gray-600 rounded-lg p-4;
}

.cm-s-solarized.CodeMirror {
  @apply shadow-none h-auto;
}
</style>
