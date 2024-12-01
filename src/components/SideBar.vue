<template>
  <aside
    id="sidebar"
    class="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform -translate-x-full md:translate-x-0 md:static flex flex-col transition-transform duration-300 ease-in-out"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b">
      <h2 class="text-xl font-semibold text-green-700">Giao hàng nhanh</h2>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-4 space-y-4">
      <!-- Trang chủ -->
      <a
        href="/"
        class="flex items-center px-4 py-2 rounded-lg transition-colors duration-200"
        :class="{
          'bg-green-100 text-green-700 font-semibold': currentRoute === '/home',
          'text-gray-600 hover:bg-green-100': currentRoute !== '/home',
        }"
      >
        <i class="bx bx-home-alt text-xl mr-2"></i>
        <span>Trang chủ</span>
      </a>

      <!-- Thông tin cá nhân -->
      <a
        href="/profile"
        class="flex items-center px-4 py-2 rounded-lg transition-colors duration-200"
        :class="{
          'bg-green-100 text-green-700 font-semibold':
            currentRoute === '/profile',
          'text-gray-600 hover:bg-green-100': currentRoute !== '/profile',
        }"
      >
        <i class="bx bx-user-circle text-xl mr-2"></i>
        <span>Tài khoản</span>
      </a>

      <!-- Thông tin cá nhân -->
      <a
        href="/"
        class="flex items-center px-4 py-2 rounded-lg transition-colors duration-200"
        :class="{
          'bg-green-100 text-green-700 font-semibold':
            currentRoute === '/profile',
          'text-gray-600 hover:bg-green-100': currentRoute !== '/profile',
        }"
      >
        <i class="bx bxs-truck text-xl mr-2"></i>
        <span>Đơn hàng hôm nay</span>
      </a>

      <!-- Đơn hàng -->
      <div class="group">
        <a
          href="#"
          class="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
        >
          <div class="flex items-center">
            <i class="bx bx-cart text-xl mr-2"></i>
            <span>Đơn hàng </span>
          </div>
          <i
            class="bx bx-chevron-down transform group-hover:rotate-180 transition-transform duration-200"
          ></i>
        </a>
        <div class="hidden group-hover:block ml-6 mt-2 space-y-2">
          <a
            href="/list"
            class="block px-4 py-2 rounded-lg transition-colors duration-200"
            :class="{
              'bg-green-100 text-green-700 font-semibold':
                currentRoute === '/supplier-pending-orders',
              'text-gray-600 hover:bg-green-100':
                currentRoute !== '/supplier-pending-orders',
            }"
          >
            Đơn hàng khách hàng
          </a>
          <a
            href="/supplier-list"
            class="block px-4 py-2 rounded-lg transition-colors duration-200"
            :class="{
              'bg-green-100 text-green-700 font-semibold':
                currentRoute === '/supplier-delivering-orders',
              'text-gray-600 hover:bg-green-100':
                currentRoute !== '/supplier-delivering-orders',
            }"
          >
            Đơn hàng nhà cung cấp
          </a>
        </div>
      </div>

      <!-- Lịch sử -->
      <a
        href="/history"
        class="flex items-center px-4 py-2 rounded-lg transition-colors duration-200"
        :class="{
          'bg-green-100 text-green-700 font-semibold':
            currentRoute === '/history',
          'text-gray-600 hover:bg-green-100': currentRoute !== '/history',
        }"
      >
        <i class="bx bx-history text-xl mr-2"></i>
        <span>Lịch sử</span>
      </a>

      <!-- Logout -->
      <a
        class="flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
      >
        <i class="bx bx-log-out text-xl mr-2"></i>
        <span>Đăng xuất</span>
      </a>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      currentRoute: window.location.pathname, // Lấy route hiện tại
    };
  },
};
</script>
