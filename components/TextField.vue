<template>
  <div class="form-input">
    <label class="form-input--label" for="name">
      {{ label }}
    </label>
    <input :value="value" v-on:input="$emit('input', $event.target.value)"
           :class="{'border border-red-500' : error && error.length, }"
           class="form-input--text text-opacity-25"

           :name="name" :id="name" :type="type" :placeholder="placeholder" :disabled="disabled">
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
    }
  }

}
</script>
