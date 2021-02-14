<template>
  <div class="form-input">
    <label class="form-input--label" for="name">
      {{ label }}
    </label>
    <input :value="value" @input="$emit('input', $event.target.value)"
           :class="[ error && error.length && 'border border-red-500', additionalClasses]"

           class="form-input--text text-opacity-25 disabled:text-opacity-75"
           :name="name" :id="name" :type="type" :placeholder="placeholder" :disabled="disabled" v-bind="$attrs">
    <p class="form-input--error" v-if="error && error.length">
      {{ error && error.length && error.join(' ') }}</p>
  </div>
</template>
<script>
// ["label", "type", "placeholder", "error", "value", "name"]
export default {
  props: {
    label: String,
    type: String,
    placeholder: String,
    error: Array,
    name: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    additionalClasses: String
  }

}
</script>
