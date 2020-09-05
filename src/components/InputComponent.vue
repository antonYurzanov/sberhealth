<template lang="pug">
  li.form-item
    label.form-label(
      :for="$attrs.id"
    ) {{ label }}
    input.form-input(
      v-bind="$attrs"
      :value="value"
      v-on="inputListeners"
      :class="classError"
    )
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
    value: {
      type: String,
      required: true
    }
  },
  mounted () {
    console.log(this.inputListeners)
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

.form-input {
  @include input;
}
</style>
