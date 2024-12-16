<template>
  <div>
    <header
      class="bg-gradient-to-r from-green-600 to-blue-800 text-white shadow-lg"
    >
      <div
        class="container mx-auto flex items-center justify-between py-4 px-6"
      >
        <!-- Logo/Title -->
        <h1 class="text-2xl font-mono">
          <!-- Văn bản rút gọn cho điện thoại -->
          <span class="block lg:hidden">GizmoShop </span>

          <!-- Văn bản đầy đủ cho desktop -->
          <span class="hidden lg:block">GizmoShop - Nhân viên giao hàng</span>
        </h1>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="block md:hidden text-white focus:outline-none"
        >
          <!-- Hiển thị SVG "Menu" khi isMenuOpen = false -->
          <svg
            v-if="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>

          <!-- Hiển thị SVG "X" khi isMenuOpen = true -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-2">
          <!-- Ảnh đại diện -->
          <img
            src="https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
            alt="Avatar"
            class="w-8 h-8 rounded-full border-2 border-white hover:border-blue-500 transition-all duration-300"
          />

          <div>
            <!-- Tên người dùng -->
            <p class="text-sm font-semibold">{{ infoAccount.fullname }}</p>
            <!-- Vai trò người dùng -->
            <p class="text-xs text-gray-400">{{ infoAccount.email }}</p>
          </div>
        </nav>
      </div>

      <!-- Mobile Dropdown Navigation -->
      <div
        id="mobileMenu"
        class="hidden md:hidden bg-blue-700 text-white space-y-2 px-6 py-4 transition-all duration-300"
      >
        <a href="/supplier-home" class="block hover:underline">Trang chủ</a>
        <a href="/contact-us" class="block hover:underline">Liên hệ</a>
        <a href="/about-us" class="block hover:underline">Giới Thiệu</a>
      </div>
    </header>

    <nav
      class="fixed inset-x-0 bottom-0 bg-white border-t shadow-lg md:hidden flex justify-around py-3 items-center"
      style="z-index: 9999"
    >
      <div
        class="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-between px-4 py-3 md:max-w-lg md:mx-auto items-center rounded-t-lg"
      >
        <!-- Home Icon -->
        <router-link to="/your_delivery">
          <button
            class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
          >
            <i class="bx bx-home text-2xl md:text-3xl hover:text-green-600"></i>
          </button>
        </router-link>
        <div class="relative group">
          <!-- Nút chính -->
          <button
            class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
          >
            <i
              class="bx bx-package text-2xl md:text-3xl hover:text-green-600"
            ></i>
          </button>

          <!-- Menu xuất hiện khi hover -->
          <div
            class="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-lg py-2 w-40 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300"
          >
            <router-link
              to="/list"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600"
            >
              Danh sách
            </router-link>
            <router-link
              to="/supplier-list"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600"
            >
              Nhà cung cấp
            </router-link>
          </div>
        </div>

        <!-- Transaction History Icon -->
        <router-link to="/history">
          <button
            class="icon w-12 h-12 flex items-center bg-gray-100 justify-center transition-all duration-200 hover:bg-gray-100"
          >
            <i
              class="bx bx-history text-2xl md:text-3xl hover:text-green-600"
            ></i>
          </button>
        </router-link>

        <!-- Profile Icon -->
        <router-link to="/profile">
          <button
            class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
          >
            <i class="bx bx-user text-2xl md:text-3xl hover:text-green-600"></i>
          </button>
        </router-link>

        <!-- Logout Icon -->
        <button
          class="flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          @click="logout"
        >
          <i class="bx bx-log-out text-2xl md:text-3xl  mr-2"></i>
         
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import { getinfo } from "@/api/auth/meApi";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HeaderComponent",
  data() {
    return {
      infoAccount: {
        fullname: "",

        roles: [""],
      },
      isMenuOpen: false,
      currentRoute: window.location.pathname,
    };
  },
  methods: {
    async fetchAccountInfo() {
      try {
        const response = await getinfo();
        this.infoAccount = response.data;
        console.log(this.infoAccount);
        return this.infoAccount;
      } catch (error) {
        console.error(error);
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    ...mapActions("auth", ["logout"]),
  },
  created() {
    this.fetchAccountInfo();
  },
  computed: {
    ...mapGetters("auth", ["token", "user", "name", "role"]),
  },
};
</script>
<style scoped>
.icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Modern hover effect */
.icon:hover {
  transform: scale(1.15);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  background-color: #f0f0f0;
}

/* Underline on hover */
.icon:hover::after {
  content: "";
  position: absolute;
  top: -5px;
  /* Position the underline slightly above the button */
  left: 0;
  right: 0;
  height: 2px;
  background-color: #1eab16;
  /* Custom color */
}
</style>
