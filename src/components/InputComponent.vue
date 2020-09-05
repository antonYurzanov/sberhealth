<template lang="pug">
  li.form-item
    label.form-label(
      :for="$attrs.id"
    ) {{ label }}
    textarea.form-textarea(
      v-if="$attrs.cols"
      :cols="$attrs.cols"
      rows="20"
      v-bind="$attrs"
      :value="value"
      v-on="inputListeners"
      :class="classError"
    )
    input.form-input(
      v-if="$attrs.type === 'text'"
      v-bind="$attrs"
      :value="value"
      v-on="inputListeners"
      :class="classError"
    )
    select.form-select(
      v-if="options.length"
      v-bind="$attrs"
      :value="value"
      v-on="inputListeners"
      :class="classError"
    )
      option(
        value=""
        selected
      ) Не выбрано
      option(
        v-for="opt of options"
        value="opt"
      ) {{ opt }}
</template>

<script>
export default {
  name: 'InputComponent',
  inheritAttrs: false,
  props: {
    classError: {
      type: Object,
      default: () => {
      }
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    inputListeners: function () {
      return Object.assign({},
        this.$listeners,
        {
          input: event => {
            this.$emit('input', event.target.value)
          }
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/functions.scss';

@mixin input {
  padding: rem(8px) rem(16px);
  box-sizing: border-box;
  width: 100%;
  background: white;
  border: 1px solid #dddddd;
  border-radius: $radius;
  color: inherit;

  &.error {
    border-color: #ff0000;
  }

  &.done {
    border-color: green;
  }

  &:focus {
    border-color: #337ab7;
  }

  &::placeholder {
    color: #ccc;
  }
}

.form-item {
  padding: 0;
  margin: 0 0 rem(16px) 0;
  width: 100%;
  @include max(600) {
    width: 100% !important;
  }
}

.form-label {
  display: block;
  margin-bottom: rem(4px);
  font-size: rem(12px);
  color: #323232;
}

.form-input, .form-select {
  @include input;
}

.form-textarea {
  height: rem(80px);
  @include input;
}
</style>
