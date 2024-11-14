<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2022-09-27 18:24:27
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <div class="login">
    <el-form
      class="form"
      :model="model"
      :rules="rules"
      @validate="handleValidate"
      ref="loginForm"
    >
      <h1 class="title">尚品甄选后台管理系统</h1>
      <el-form-item prop="username">
        <el-input
          ref="usernameInput"
          class="text"
          v-model="model.username"
          prefix-icon="User"
          clearable
          :placeholder="$t('login.username')"
          @keyup.enter="handleFocus"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="passwordInput"
          class="text"
          v-model="model.password"
          prefix-icon="Lock"
          show-password
          clearable
          :placeholder="$t('login.password')"
          @keyup.enter="handleEnterSubmit"
        />
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="captcha flex items-center justify-between w-full">
          <el-input
            ref="captchaInput"
            class="text w-3/5"
            v-model="model.captcha"
            prefix-icon="Lock"
            clearable
            :placeholder="$t('login.captcha')"
            @keyup.enter="handleEnterSubmit"
          />
          <img
            class="captcha-img cursor-pointer w-1/5 ml-2"
            :src="captchaImg"
            alt="验证码"
            @click="getCaptcha"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="btn"
          size="large"
          @click="submit"
        >
          {{ btnText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="change-lang">
    <change-lang />
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  computed,
  watch,
  onMounted,
} from 'vue'
import { Login, GetCaptcha } from '@/api/login'
import { useRouter, useRoute } from 'vue-router'
import ChangeLang from '@/layout/components/Topbar/ChangeLang.vue'
import useLang from '@/i18n/useLang'
import { useApp } from '@/pinia/modules/app'

export default defineComponent({
  components: { ChangeLang },
  name: 'login',
  setup() {
    const { proxy: ctx } = getCurrentInstance() // 可以把ctx当成vue2中的this
    const router = useRouter()
    const route = useRoute()
    const { lang } = useLang()
    watch(lang, () => {
      state.rules = getRules()
    })

    onMounted(() => {
      state.getCaptcha()
    })

    const getRules = () => ({
      username: [
        {
          required: true,
          message: ctx.$t('login.rules-username'),
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: ctx.$t('login.rules-password'),
          trigger: 'blur',
        },
        {
          min: 6,
          max: 12,
          message: ctx.$t('login.rules-regpassword'),
          trigger: 'blur',
        },
      ],
      captcha: [
        {
          required: true,
          message: ctx.$t('login.rules-captcha'),
          trigger: 'blur',
        },
      ],
    })
    const state = reactive({
      model: {
        username: 'admin',
        password: '111111',
        key: '',
        captcha: '',
      },
      rules: getRules(),
      loading: false,
      usernameInput: null,
      passwordInput: null,
      captchaInput: null,
      captchaImg: '',
      btnText: computed(() =>
        state.loading ? ctx.$t('login.logining') : ctx.$t('login.login')
      ),
      loginForm: ref(null),
      getCaptcha: async () => {
        state.captchaImg = ''
        const { code, data } = await GetCaptcha()
        if (+code === 20000) {
          state.captchaImg = data.image
          state.model.key = data.key
        }
      },
      focusUsername: () => {
        state.usernameInput?.focus()
      },
      focusPassword: () => {
        state.passwordInput?.focus()
      },
      focusCaptcha: () => {
        state.captchaInput?.focus()
      },
      handleValidate: (prop, isValid) => {
        if (state.loading) return

        if (prop === 'username' && !isValid) {
          // 用户名验证失败时，聚焦到用户名输入框
          state.focusUsername()
        } else if (prop === 'password' && !isValid) {
          // 密码验证失败时，聚焦到密码输入框
          state.focusPassword()
        } else if (prop === 'captcha' && !isValid) {
          // 验证码验证失败时，聚焦到验证码输入框
          state.focusCaptcha()
        }
      },
      handleFocus: () => {
        if (state.loading) return

        // 根据输入框内容判断聚焦位置
        if (!state.model.password) {
          state.focusPassword()
        } else if (!state.model.captcha) {
          state.focusCaptcha()
        } else {
          // 如果都有内容,优先聚焦密码框
          state.focusPassword()
        }
      },
      handleEnterSubmit: () => {
        if (!state.loading) {
          state.submit()
        }
      },
      submit: () => {
        if (state.loading) {
          return
        }
        state.loginForm.validate(async valid => {
          if (valid) {
            state.loading = true
            const { code, data, message } = await Login(state.model)
            if (+code === 20000) {
              ctx.$message.success({
                message: ctx.$t('login.loginsuccess'),
                duration: 1000,
              })

              const targetPath = decodeURIComponent(route.query.redirect)
              if (targetPath.startsWith('http')) {
                // 如果是一个url地址
                window.location.href = targetPath
              } else if (targetPath.startsWith('/')) {
                // 如果是内部路由地址
                router.push(targetPath)
              } else {
                router.push('/')
              }
              useApp().initToken(data)
            } else {
              ctx.$message.error(message)
              state.loading = false
              state.getCaptcha()

              // 如果验证码错误，则聚焦到验证码输入框
              if (message.includes('验证码错误')) {
                state.focusCaptcha()
              } else if (message.includes('用户名或者密码错误')) {
                state.focusUsername()
              }
            }
            state.loading = false
          }
        })
      },
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
.login {
  transition: transform 1s;
  transform: scale(1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2d3a4b;

  .form {
    width: 520px;
    max-width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    margin: 160px auto 0;

    :deep {
      .el-input__wrapper {
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        background: rgba(0, 0, 0, 0.1);
      }

      .el-input-group--append > .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .el-input-group--prepend > .el-input__wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .title {
      color: #fff;
      text-align: center;
      font-size: 24px;
      margin: 0 0 24px;
    }

    .text {
      font-size: 16px;

      :deep(.el-input__inner) {
        color: #fff;
        height: 48px;
        line-height: 48px;

        &::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .btn {
      width: 100%;
    }
  }
}

.change-lang {
  position: fixed;
  right: 20px;
  top: 20px;

  :deep {
    .change-lang {
      height: 24px;

      &:hover {
        background: none;
      }

      .icon {
        color: #fff;
      }
    }
  }
}
</style>
