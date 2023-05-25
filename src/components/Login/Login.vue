<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import md5 from "md5";
import { getQrKey, createQr, checkQr } from "@/Api/api_user.js";
import Cookies from "js-cookie";
const store = useStore();
const emit = defineEmits(["isLogin"]);
const user = reactive({
  phone: "",
  md5_password: "",
  password: "",
  uid: 1510208898,
});
const unikeyUrl = ref(null);
const isQrShow = ref(false);
const isCellphoneShow = ref(true);
const ismask = ref(true);
const isQrmask = ref(false);
const isrusult = ref(false);
const formRef = ref();
let timer = null;
const closeLogin = () => {
  emit("isLogin", false);
  clearInterval(timer);
};

const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("手机号不能为空"));
  }
  setTimeout(() => {
    let reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    if (!reg.test(user.phone)) {
      callback(new Error("手机号错误"));
    } else {
      callback();
    }
  }, 1000);
};
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (user.checkPass !== "") {
      if (!formRef.value) return;
      formRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const rules = reactive({
  phone: [{ validator: checkPhone, trigger: "blur" }],
  captcha: [{ validator: validatePass, trigger: "blur" }],
});

function submitFrom(formEl) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const md5password = md5(user.password);
      user.md5_password = md5password;
      store.dispatch("doLogin", user);
      if (store.state.user.profile != []) {
        emit("isLogin", false);
      }
    } else {
      alert("请求失败");
      return false;
    }
  });
}

async function taggle() {
  if (isCellphoneShow.value) {
    isCellphoneShow.value = false;
    isQrShow.value = true;
  } else {
    isCellphoneShow.value = true;
    isQrShow.value = false;
  }
  if (timer) clearInterval(timer);
  if (isQrShow.value) {
    const { data } = await getQrKey();
    if (data.code === 200) {
      const result = await createQr(data.unikey);
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(async () => {
        const result = await checkQr(data.unikey);
        if (result.code === 800) {
          isQrmask.value = true;
        }
        if (result.code === 802) {
          isQrShow.value = false;
          isrusult.value = true;
        }
        if (result.code === 803) {
          clearInterval(timer);
          localStorage.setItem("name", result.cookie);
          store.dispatch("getAcount");
          emit("isLogin", false);
        }
      }, 2000);
      unikeyUrl.value = result.data.qrimg;
    }
  }
}
</script>

<template>
  <div class="login-code">
    <el-icon @click="closeLogin()"><Close /></el-icon>
    <el-form
      class="textfield"
      ref="formRef"
      :model="user"
      :rules="rules"
      v-show="isCellphoneShow"
    >
      <el-form-item label="账号" prop="phone">
        <el-input
          v-model.number="user.phone"
          type="text"
          maxlength="11"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="user.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="qr">
        <span class="taggle" @click="taggle">扫码登入</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFrom(formRef)">登入</el-button>
      </el-form-item>
    </el-form>
    <el-form class="qr_code" v-show="isQrShow">
      <el-form-item>扫码登入</el-form-item>
      <el-form-item>
        <img :src="unikeyUrl" v-if="unikeyUrl" />
        <div class="qrmask" v-show="isQrmask">
          <p>二维码已失效</p>
          <el-button type="success">刷新</el-button>
        </div>
      </el-form-item>
      <el-form-item class="taggle" @click="taggle">账号密码登入</el-form-item>
    </el-form>
    <el-form v-show="isrusult" class="confirm">
      <el-form-item> 扫码成功 </el-form-item>
      <el-form-item> 请在手机上确认 </el-form-item>
    </el-form>
  </div>
  <div :class="{ mask: ismask }"></div>
</template>

<style lang="less" scoped>
.login-code {
  width: 400px;
  height: 260px;
  background-color: #ccc;
  position: fixed;
  z-index: 999;
  left: 50%;
  transform: translate(-50%);
  top: 200px;
  text-align: center;
  line-height: 260px;
  padding: 5px;
  .el-icon {
    position: absolute;
    font-size: 18px;
    right: 5px;
    opacity: 0.6;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
  .textfield {
    padding: 60px;
    .el-input {
      width: 190px;
      display: block;
      border-radius: 5px;
      margin-bottom: 10px;
      :deep(.el-input__wrapper) {
        max-width: 400px;
      }
      :deep(.is-hover),
      :deep(.is-fovus) {
        background-color: transparent;
      }
    }
    .el-button {
      width: 190px;
      margin-left: 40px;
      background-color: @active;
      color: #fff !important;
      &:hover {
        opacity: 0.9;
      }
    }
    .taggle {
      font-size: 12px;
      margin: 0 auto;
      &:hover {
        cursor: pointer;
      }
    }
    .qr {
      :deep(.el-form-item__content) {
        line-height: 12px;
      }
    }
  }
  .qr_code {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    img {
      width: 120px;
      height: 120px;
    }
    .qrmask {
      position: absolute;
      width: 120px;
      height: 120px;
      background: rgba(255, 255, 255, 0.9);
      p {
        margin: 25px auto 0;
        font-size: 12px;
      }
      & button:hover {
        background-color: var(--el-color-success);
      }
    }
    .taggle {
      font-size: 12px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .confirm {
    display: flex;
    margin-top: 90px;
    flex-direction: column;
    align-items: center;
  }
}

.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  opacity: 0.5;
  z-index: 998;
}
</style>
