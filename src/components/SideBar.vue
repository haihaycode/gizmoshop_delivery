<template>
  <aside
    id="sidebar"
    class="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform -translate-x-full md:translate-x-0 md:static flex flex-col transition-transform duration-300 ease-in-out"
  >
    <div class="px-6 py-4 border-b">
      <h2 class="text-2xl font-semibold text-green-600">Nhân viên giao hàng</h2>
    </div>

    <nav class="flex-1 px-4 py-4 space-y-2">
      <a
        href="/"
        class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        :class="{ 'text-red-500': currentRoute === '/home' }"
      >
        <span>Trang chủ</span>
      </a>

      <a
        href="/profile"
        class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        :class="{ 'text-red-500': currentRoute === '/profile' }"
      >
        <span>Thông tin cá nhân</span>
      </a>

      <!-- Đơn hàng của nhà cung cấp cần giao -->
      <div class="group">
        <a
          href="#"
          class="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <span>Đơn hàng cần giao</span>
          <svg
            class="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
        <div class="hidden group-hover:block ml-4 mt-2 space-y-2">
          <a
            href="/list"
            class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            :class="{
              'text-red-500': currentRoute === '/supplier-pending-orders',
            }"
          >
            Đơn hàng khách hành
          </a>
          <a
            href="/supplier-list"
            class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            :class="{
              'text-red-500': currentRoute === '/supplier-delivering-orders',
            }"
          >
            Đơn hàng nhà cung cấp
          </a>
        </div>
      </div>

      <!-- Đơn hàng của người dùng cần giao -->
      <a
        href="/s"
        class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        :class="{ 'text-red-500': currentRoute === '/user-pending-orders' }"
      >
        <span>Đơn hàng </span>
      </a>



      <a
        href="/contact"
        class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        :class="{ 'text-red-500': currentRoute === '/contact' }"
      >
        <span>Liên hệ</span>
      </a>

      <a
        href="/about"
        class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        :class="{ 'text-red-500': currentRoute === '/about' }"
      >
        <span>Giới thiệu</span>
      </a>

      <!-- Logout -->
      <a
        href="/logout"
        class="flex items-center px-4 py-2 text-blue-600 hover:bg-red-50 rounded-lg"
      >
        <span>Logout</span>
      </a>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      currentRoute: window.location.pathname, // Capture current route dynamically
    };
  },
};
</script>
