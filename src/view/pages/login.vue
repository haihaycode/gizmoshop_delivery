<template>
  <div class="flex h-screen">
    <div class="flex-1 flex items-center justify-center bg-white bg-opacity-80">
      <div
        class="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg transform transition duration-500 hover:scale-105"
      >
        <h1 class="text-4xl font-extrabold mb-4 text-green-600 text-center">
          Đăng nhập Shipper
        </h1>
        <p class="text-sm text-gray-500 mb-6 text-center">
          Quản lý đơn hàng dễ dàng, hiệu quả!
        </p>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Nhập Email"
              required
              class="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            />
          </div>
          <div class="relative">
            <input
              v-model="password"
              :type="passwordType"
              placeholder="Nhập Mật khẩu"
              required
              class="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            />
            <i
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              @click="togglePassword"
              :class="passwordType === 'password' ? 'bx bx-hide' : 'bx bx-show'"
            ></i>
          </div>

          <button
            :disabled="isLoading"
            class="w-full py-3 text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-lg disabled:bg-green-300 flex items-center justify-center"
          >
            <span
              v-if="isLoading"
              class="loader spinner-border w-4 h-4 mr-2"
            ></span>
            <span v-if="!isLoading">Đăng nhập</span>
            <span v-else class="sr-only">Đang xử lý...</span>
          </button>
        </form>

       
      </div>
    </div>

    <!-- Welcome Section -->
    <div
      class="hidden md:flex flex-1 items-center justify-center text-white text-center"
      style="
        background-image: url('https://i.pinimg.com/736x/ef/69/f2/ef69f2ee58fdf8b035f555d2e4b2c5fa.jpg');
        background-size: cover;
        background-position: center;
      "
    >
      <div class="p-10 space-y-4 bg-black bg-opacity-50 rounded-lg">
        <h2 class="text-3xl font-bold">Chào mừng bạn!</h2>
        <p class="text-sm">
          Tham gia ngay để trở thành một phần của chúng tôi!
        </p>
       
          <button
            class="py-3 px-8 bg-white mt-3 text-green-600 font-bold rounded-full hover:bg-gray-100 transition duration-200"
          >
            0896881029
          </button>
       
      </div>
    </div>
    <NotificationModal
      :isOpen="isModalOpen"
      :title="'Thông báo'"
      :message="message"
      :type="messageType"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script>
import { loginApi } from "@/api/auth/loginApi";
import { handleAuthentication } from "@/services/authService";
import NotificationModal from "@/components/containers/modal/NotificationModal.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ShipperLogin",
  data() {
    return {
      email: "",
      password: "",
      passwordType: "password",
      isLoading: false,
      isModalOpen: false, // Thêm biến này để quản lý trạng thái mở modal
      message: "", // Thêm biến cho nội dung thông báo
      messageType: "", // Thêm biến cho loại thông báo
    };
  },

  components: {
    NotificationModal,
  },
  methods: {
    ...mapActions("auth", ["setToken", "setRefreshToken"]),
    async handleLogin() {
      this.isLoading = true;
      try {
        const loginData = {
          email: this.email,
          password: this.password,
        };
        const response = await loginApi(loginData);
        const isAdmin = handleAuthentication(
          response.data.accessToken,
          response.data.refreshToken
        );
        console.log("isAdmin:", isAdmin);
        this.messageType = isAdmin ? "success" : "warning";
        this.message = isAdmin ? response.message : "Không đủ quyền";
        this.isModalOpen = true;
        console.log("Modal state:", this.isModalOpen);
        if (isAdmin) {
          setTimeout(() => {
            this.$router.push("/list");
          }, 1000);
        }
      } catch (error) {
        console.error("Login error:", error); // Ghi log lỗi
        this.messageType = "error";
        this.message = "Đăng nhập thất bại. Vui lòng thử lại.";
        this.isModalOpen = true;
      } finally {
        this.isLoading = false;
      }
    },
    togglePassword() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
  },
  computed: {
    ...mapGetters("loading", ["isLoading"]),
  },
};
</script>

<style>
::v-deep(.bx-hide):before {
  content: "\f460";
}
::v-deep(.bx-show):before {
  content: "\f46e";
}
.loader {
  border: 2px solid #fff; /* Đường viền trắng */
  border-top: 2px solid transparent; /* Phần trên trong suốt */
  border-radius: 50%; /* Hình tròn */
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
