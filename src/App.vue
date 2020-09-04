<template lang="pug">
  #app
    Popup(
      v-if="popupStatus"
      :status="response"
    )
    .content
      .tabs
        ul.tabs-nav
          li.tabs-nav-item
            button.tabs-nav-button(
              :class="{ isActive: currentTab === 1 }"
              @click="selectTab(1)"
            ) Основные данные
          li.tabs-nav-item
            button.tabs-nav-button(
              :class="{ isActive: currentTab === 2 }"
              @click="selectTab(2)"
              :disabled="$v.order.tab1.$invalid"
              :aria-hidden="$v.order.tab1.$invalid"
            ) Адрес доставки
        .tab(
          v-if="currentTab === 1"
          :key="'tab_1'"
        )
          form.form(
            @submit.prevent="selectTab(2)"
          )
            ul.form-list
              li.form-item.w48
                label.form-label(
                  for="name"
                ) Имя
                input.form-input(
                  id="name"
                  name="name"
                  type="text"
                  size="30"
                  placeholder="Иван"
                  v-model="order.tab1.name"
                  :class="{ error: $v.order.tab1.name.$error, done: !$v.order.tab1.name.$invalid }"
                  :aria-invalid="$v.order.tab1.name.$error"
                  @blur="$v.order.tab1.name.$touch()"
                )
              li.form-item.w48
                label.form-label(
                  for="surname"
                ) Фамилия
                input.form-input(
                  id="surname"
                  name="surname"
                  type="text"
                  size="30"
                  placeholder="Иванов"
                  v-model="order.tab1.surname"
                  :class="{ error: $v.order.tab1.surname.$error, done: !$v.order.tab1.surname.$invalid }"
                  :aria-invalid="$v.order.tab1.surname.$error"
                  @blur="$v.order.tab1.surname.$touch()"
                )
              li.form-item
                label.form-label(
                  for="phone"
                ) Телефон
                input.form-input(
                  id="phone"
                  name="phone"
                  type="text"
                  size="30"
                  placeholder="+79034448889"
                  v-model="order.tab1.phone"
                  :class="{ error: $v.order.tab1.phone.$error, done: !$v.order.tab1.phone.$invalid }"
                  :aria-invalid="$v.order.tab1.phone.$error"
                  @blur="$v.order.tab1.phone.$touch()"
                )
              li.form-item
                label.form-label(
                  for="email"
                ) Email
                input.form-input(
                  id="email"
                  name="email"
                  type="text"
                  size="30"
                  placeholder="anton.yurzanov@gmail.com"
                  v-model="order.tab1.email"
                  :class="{ error: $v.order.tab1.email.$error, done: !$v.order.tab1.email.$invalid }"
                  :aria-invalid="$v.order.tab1.email.$error"
                  @blur="$v.order.tab1.email.$touch()"
                )
              li.form-item.w100
                button.form-button(
                  type="submit"
                  title="Продолжить"
                  :disabled="$v.order.tab1.$invalid"
                  :aria-hidden="$v.order.tab1.$invalid"
                ) Продолжить
        .tab(
          v-if="currentTab === 2"
          :key="'tab_2'"
        )
          form.form(
            @submit.prevent="sendData"
          )
            ul.form-list
              li.form-item
                .form-radio
                  input(
                    id="delivery"
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked="true"
                    v-model="order.tab2.delivery"
                  )
                  label(
                    for="delivery"
                  ) Доставка
              li.form-item
                .form-radio
                  input(
                    id="pickup"
                    type="radio"
                    name="delivery"
                    value="pickup"
                    v-model="order.tab2.delivery"
                  )
                  label(
                    for="pickup"
                  ) Самовывоз
              template(
                v-if="order.tab2.delivery === 'delivery'"
              )
                li.form-item.w30
                  label.form-label(
                    for="country"
                  ) Страна
                  select.form-select(
                    id="country"
                    name="country"
                    v-model="order.tab2.country"
                    :class="{ error: $v.order.tab2.country.$error, done: !$v.order.tab2.country.$invalid }"
                    :aria-invalid="$v.order.tab2.country.$error"
                    @blur="$v.order.tab2.country.$touch()"
                  )
                    option(
                      value=""
                      selected
                    ) Не выбрано
                    option(
                      value="Россия"
                    ) Россия
                    option(
                      value="Япония"
                    ) Япония
                li.form-item.w30
                  label.form-label(
                    for="city"
                  ) Город
                  input.form-input(
                    id="city"
                    name="city"
                    type="text"
                    size="30"
                    placeholder="Какой то адрес"
                    v-model="order.tab2.city"
                    :class="{ error: $v.order.tab2.city.$error, done: !$v.order.tab2.city.$invalid }"
                    :aria-invalid="$v.order.tab2.city.$error"
                    @blur="$v.order.tab2.city.$touch()"
                  )
                li.form-item.w30
                  label.form-label(
                    for="zip"
                  ) Индекс
                  input.form-input(
                    id="zip"
                    name="zip"
                    type="text"
                    size="30"
                    placeholder="410000"
                    v-model="order.tab2.zip"
                    :class="{ error: $v.order.tab2.zip.$error, done: !$v.order.tab2.zip.$invalid }"
                    :aria-invalid="$v.order.tab2.zip.$error"
                    @blur="$v.order.tab2.zip.$touch()"
                  )
                li.form-item
                  label.form-label(
                    for="address"
                  ) Адрес
                  input.form-input(
                    id="address"
                    name="address"
                    type="text"
                    size="30"
                    placeholder="Какой то адрес"
                    v-model="order.tab2.address"
                    :class="{ error: $v.order.tab2.address.$error, done: !$v.order.tab2.address.$invalid }"
                    :aria-invalid="$v.order.tab2.address.$error"
                    @blur="$v.order.tab2.address.$touch()"
                  )
                li.form-item
                  label.form-label(
                    for="date"
                  ) Дата доставки
                  input.form-input(
                    id="date"
                    name="date"
                    type="text"
                    size="30"
                    placeholder="24/12/2020"
                    v-model="order.tab2.date"
                    :class="{ error: $v.order.tab2.date.$error, done: !$v.order.tab2.date.$invalid }"
                    :aria-invalid="$v.order.tab2.date.$error"
                    @blur="$v.order.tab2.date.$touch()"
                  )
              li.form-item
                label.form-label(
                  for="cmnt"
                ) Комментарий
                textarea.form-textarea(
                  id="cmnt"
                  name="cmnt"
                  cols="5"
                  rows="20"
                  v-model="order.cmnt"
                )
              li.form-item
                button.form-button(
                  type="submit"
                  title="Оформить заказ"
                  :disabled="$v.order.tab1.$invalid || $v.order.tab2.$invalid"
                  :aria-hidden="$v.order.tab1.$invalid || $v.order.tab2.$invalid"
                ) Оформить заказ
</template>

<script>
import Popup from '@/components/Popup.vue'
import { required, maxLength, minLength, email, numeric } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      popupStatus: false,
      response: '',
      currentTab: 1,
      order: {
        tab1: {
          name: '',
          surname: '',
          phone: '',
          email: ''
        },
        tab2: {
          delivery: 'delivery',
          country: '',
          city: '',
          zip: '',
          address: '',
          date: ''
        },
        cmnt: ''
      }
    }
  },
  validations () {
    const tab1 = {
      name: {
        required,
        maxLength: maxLength(255)
      },
      surname: {
        required,
        maxLength: maxLength(255)
      },
      phone: {
        required,
        phone (value) {
          return /\+\d{11,}/.test(value)
        }
      },
      email: {
        required,
        email
      }
    }
    if (this.order.tab2.delivery === 'delivery') {
      return {
        order: {
          tab1,
          tab2: {
            country: {
              required
            },
            city: {
              required,
              maxLength: maxLength(255)
            },
            zip: {
              required,
              numeric,
              minLength: minLength(6),
              maxLength: maxLength(6)
            },
            address: {
              required,
              maxLength: maxLength(255)
            },
            date: {
              required,
              phone (value) {
                return /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})$/.test(value)
              }
            }
          }
        }
      }
    }
    return {
      order: {
        tab1,
        tab2: {}
      }
    }
  },
  components: {
    Popup
  },
  methods: {
    sendData () {
      axios.post('/test.php', this.order).then(response => {
        this.popupStatus = true
        this.response = response.data.success
        if (response.data.success) {
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        } else {
          setTimeout(() => {
            this.popupStatus = false
          }, 3000)
        }
      })
    },
    selectTab (tab) {
      if (tab === 1) {
        this.order.tab2.delivery = 'delivery'
        this.order.tab2.country = this.order.tab2.city = this.order.tab2.zip = this.order.tab2.address = this.order.tab2.date = this.order.tab2.cmnt = ''
        this.$v.order.tab2.$reset()
      }
      this.currentTab = tab
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/functions.scss';

$radius: 3px;
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

.tabs {
  width: 100%;
  max-width: rem(640px);
  margin: 0 auto;
  @include max(640) {
    width: 90%;
  }
}

.tabs-nav {
  position: relative;
  padding: 0;
  margin: 0 0 rem(12px) 0;
  list-style: none;
  display: flex;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    display: block;
    content: '';
    background: #dddddd;
    z-index: 0;
  }
}

.tabs-nav-item {
  position: relative;
  padding: 0;
  margin: 0;
  z-index: 1;
}

.tabs-nav-button {
  padding: rem(8px) rem(16px);
  background: #ffffff;
  border: 1px solid rgba(221, 221, 221, 0);
  border-bottom-color: #dddddd;
  border-radius: $radius $radius 0 0;
  color: #337ab7;

  &:hover {
    color: #323232;
  }

  &.isActive {
    border-color: #dddddd;
    border-bottom-color: #ffffff;
    color: #323232;
  }
}

.form-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.form-item {
  padding: 0;
  margin: 0 0 rem(16px) 0;
  width: 100%;
  @include min(600) {
    &.w30 {
      width: 30%;
    }

    &.w48 {
      width: 48%;
    }
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

.form-button {
  color: #ffffff;
  background: #337ab7;
  border-radius: 3px;
  padding: rem(8px) rem(16px);
  border: 1px solid #337ab7;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}

.form-radio {
  display: flex;
  align-items: center;

  label {
    padding-left: rem(12px);
  }
}
</style>
