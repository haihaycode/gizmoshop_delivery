<template>
    <aside id="sidebar"
        class="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform -translate-x-full md:translate-x-0 md:static flex flex-col transition-transform duration-300 ease-in-out">
        <div class="px-6 py-4 border-b">
            <h2 class="text-2xl font-semibold text-green-600">Nhân viên giao hàng</h2>
        </div>

        <nav class="flex-1 px-4 py-4 space-y-2">
            <a href="/supplier-home" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                :class="{ 'text-red-500': currentRoute === '/supplier-home' }">
                <span>Tổng quan</span>
            </a>
            <div class="group">
                <a href="#"
                    class="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <span>Quản lý đơn hàng</span>
                    <svg class="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
                <div class="hidden group-hover:block ml-4 mt-2 space-y-2">
                    <a href="/orders-supplier"
                        class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                        :class="{ 'text-red-500': currentRoute === '/orders-supplier' }">
                        Quản lý Đơn hàng
                    </a>
                    <a href="/orders-pending-supplier"
                        class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                        :class="{ 'text-red-500': currentRoute === '/orders-pending-supplier' }">
                        Tạo Đơn hàng
                    </a>
                </div>
            </div>
            <a href="/product-supplier" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                :class="{ 'text-red-500': currentRoute === '/product-supplier' }">
                <span>Sản phẩm đã cung cấp</span>
            </a>
            <a href="/wallet-supplier" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                :class="{ 'text-red-500': currentRoute === '/wallet-supplier' }">
                <span>Quản lý ví</span>
            </a>
            <a href="/transactions-history"
                class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                :class="{ 'text-red-500': currentRoute === '/transactions-history' }">
                <span>Lịch sử giao dịch</span>
            </a>
            <a href="/" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span>Quay lại cửa hàng</span>
            </a>
            <a href="#" class="flex items-center px-4 py-2 text-blue-600 hover:bg-red-50 rounded-lg">
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
