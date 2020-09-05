<template lang="pug">
  #app
    transition(
      name="fade"
    )
      PopupComponent(
        v-if="popupStatus"
      ) {{ response ? 'успешно отправлено' : 'просьба повторить запрос позже' }}
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
        transition(
          name="fade"
          mode="out-in"
        )
          .tab(
            v-if="currentTab === 1"
            :key="'tab_1'"
          )
            form.form(
              @submit.prevent="selectTab(2)"
            )
              ul.form-list
                InputComponent(
                  v-for="el of tab1"
                  :key="el.id"
                  :id="el.id"
                  :name="el.id"
                  :type="el.type"
                  size="30"
                  :style="{width: el.width}"
                  :placeholder="el.placeholder"
                  :label="el.label"
                  v-model="order.tab1[el.id]"
                  :classError="{ error: $v.order.tab1[el.id].$error, done: !$v.order.tab1[el.id].$invalid }"
                  :aria-invalid="$v.order.tab1[el.id].$error"
                  @blur="$v.order.tab1[el.id].$touch()"
                )
                li.form-item.w100
                  button.form-button(
                    type="submit"
                    title="Продолжить"
                    :disabled="$v.order.tab1.$invalid"
                    :aria-hidden="$v.order.tab1.$invalid"
                  )
                    span Продолжить
          .tab(
            v-else-if="currentTab === 2"
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
                  InputComponent(
                    v-for="el of tab2"
                    :key="el.id"
                    :id="el.id"
                    :name="el.id"
                    :type="el.type"
                    :style="{width: el.width}"
                    :placeholder="el.placeholder"
                    :label="el.label"
                    :options="el.options"
                    v-model="order.tab2[el.id]"
                    :classError="{ error: $v.order.tab2[el.id].$error, done: !$v.order.tab2[el.id].$invalid }"
                    :aria-invalid="$v.order.tab2[el.id].$error"
                    @blur="$v.order.tab2[el.id].$touch()"
                  )
                InputComponent(
                  id="cmnt"
                  name="cmnt"
                  label="Комментарий"
                  v-model="order.cmnt"
                  cols="10"
                )
                li.form-item
                  button.form-button(
                    type="submit"
                    title="Оформить заказ"
                    :disabled="$v.order.tab1.$invalid || $v.order.tab2.$invalid"
                    :aria-hidden="$v.order.tab1.$invalid || $v.order.tab2.$invalid"
                  )
                    img.load(
                      v-if="load"
                      src="@/assets/icons/spinner.svg"
                      alt="Загрузка"
                    )
                    span(
                      v-else
                    ) Оформить заказ
</template>

<script>
import PopupComponent from '@/components/PopupComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import { required, maxLength, minLength, email, numeric } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      tab1: [
        {
          width: '48%',
          label: 'Имя',
          id: 'name',
          type: 'text',
          size: 30,
          placeholder: 'Иван'
        },
        {
          width: '48%',
          label: 'Фамилия',
          id: 'surname',
          type: 'text',
          size: 30,
          placeholder: 'Иванов'
        },
        {
          width: '',
          label: 'Телефон',
          id: 'phone',
          type: 'text',
          size: 30,
          placeholder: '+79034448889'
        },
        {
          width: '',
          label: 'Email',
          id: 'email',
          type: 'text',
          size: 30,
          placeholder: 'anton.yurzanov@gmail.com'
        }
      ],
      tab2: [
        {
          width: '32%',
          label: 'Страна',
          id: 'country',
          options: ['Россия', 'Япония', 'Германия', 'Австралия']
        },
        {
          width: '32%',
          label: 'Город',
          id: 'city',
          type: 'text',
          size: 30,
          placeholder: 'Москва'
        },
        {
          width: '32%',
          label: 'Индекс',
          id: 'zip',
          type: 'text',
          size: 30,
          placeholder: '410000'
        },
        {
          width: '',
          label: 'Адрес',
          id: 'address',
          type: 'text',
          size: 30,
          placeholder: 'Зеленая, 27...'
        },
        {
          width: '',
          label: 'Дата',
          id: 'date',
          type: 'text',
          size: 30,
          placeholder: '24/12/2002'
        }
      ],
      load: false,
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
    PopupComponent,
    InputComponent
  },
  methods: {
    sendData () {
      this.load = !this.load
      axios.post('/test.php', this.order).then(response => {
        this.load = !this.load
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
      }).catch(e => {
        console.error(e)
        this.load = !this.load
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

.form-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #337ab7;
  border-radius: 3px;
  padding: 0;
  border: 1px solid #337ab7;
  height: rem(40px);
  min-width: rem(140px);

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

.load {
  width: rem(16px);
  height: rem(16px);
  animation: rotateSpinner 0.4s linear infinite;
}

@keyframes rotateSpinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
