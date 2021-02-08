import hotkeys from "hotkeys-js";

export default {
  computed: {
    orderedStepAsc() {
      return [...this.steps?.sort((a, b) => a.order - b.order)]
    },
    orderedStepDesc() {
      return [...this.steps?.sort((a, b) => b.order - a.order)]
    },
    nextStep() {
      return this.orderedStepAsc?.find(step => step.order > this.currentStep.order) || null;
    },
    previousStep() {
      // console.log('previouseStep',this.orderedStepDesc?.find(step => console.log(step.order < this.currentStep.order ? step.order: "not found")))
      return this.orderedStepDesc.find(step => step.order < this.currentStep.order) || null;
    },
    currentStep() {
      return this.orderedStepAsc?.find(step => step.id === this.$route.query.step) ?? this.orderedStepAsc[0]
    },
    currentStepIndex() {
      return this.orderedStepAsc.findIndex(e => e.id === this.currentStep.id)
    }
  },
  mounted() {
    this.registerKeyboardShortCut()
  },
  methods: {
    goToStep(step) {
      this.$router.push({
        query: {
          step: step.id
        }
      })
    },
    registerKeyboardShortCut() {
      hotkeys('ctrl+shift+left, ctrl+shift+right', (event, handler) => {
        switch (handler.key) {
          case 'ctrl+shift+left':
            if (this.previousStep) this.goToStep(this.previousStep)
            break;
          case 'ctrl+shift+right':
            if (this.nextStep) this.goToStep(this.nextStep)
            break;
        }
      })
    }
  }
}
