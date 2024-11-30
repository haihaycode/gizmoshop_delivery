<template>
  <div class="min-h-screen bg-gray-100 p-4 flex flex-col">
    <!-- Tiêu đề -->
    <h2 class="text-center text-2xl font-bold text-gray-800 mb-4">Chi tiết đơn hàng</h2>

    <!-- Thông tin khách hàng -->
    <div class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center mb-6">
      <!-- Avatar -->
      <div class="mb-4">
        <img
          :src="order.avatar || defaultAvatar"
          alt="Avatar"
          class="w-20 h-20 rounded-full border border-gray-300"
        />
      </div>
      <!-- Tên và trạng thái -->
      <h3 class="text-lg font-semibold text-gray-800">{{ order.customerName }}</h3>
      <p class="mt-2 text-sm">
        <span class="font-medium">Trạng thái:</span>
        <span :class="statusClass(order.status)">{{ order.status }}</span>
      </p>
    </div>

    <!-- Chi tiết đơn hàng -->
    <div class="bg-white rounded-lg shadow-md p-4 space-y-4">
      <!-- Số điện thoại -->
      <div class="flex items-center gap-2">
        <span class="font-medium text-gray-700">Số điện thoại:</span>
        <a
          :href="`tel:${order.phone}`"
          class="text-blue-500 underline"
        >
          {{ order.phone }}
        </a>
      </div>
      <!-- Địa chỉ -->
      <div class="flex items-start gap-2">
        <span class="font-medium text-gray-700">Địa chỉ:</span>
        <p class="text-gray-800">{{ order.address }}</p>
      </div>
      <!-- Sản phẩm -->
      <div class="flex items-start gap-2">
        <span class="font-medium text-gray-700">Sản phẩm:</span>
        <p class="text-gray-800">{{ order.product }}</p>
      </div>
      <!-- Số lượng -->
      <div class="flex items-center gap-2">
        <span class="font-medium text-gray-700">Số lượng:</span>
        <p class="text-gray-800">{{ order.quantity }}</p>
      </div>
      <!-- Giá -->
      <div class="flex items-center gap-2">
        <span class="font-medium text-gray-700">Tổng giá:</span>
        <p class="text-gray-800">{{ formatCurrency(order.price) }}</p>
      </div>
    </div>

    <!-- Nút Giao Hàng -->
    <div class="mt-auto text-center">
      <button
        @click="markAsDelivered"
        class="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mt-4"
      >
        Xác nhận giao hàng
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        id: "DH001",
        customerName: "Nguyễn Văn A",
        phone: "0123456789",
        address: "123 Đường ABC, TP. HCM",
        product: "Laptop Dell XPS 13",
        quantity: 1,
        price: 20000000,
        status: "Đang chờ giao",
        avatar: "https://via.placeholder.com/150", // Link hình ảnh nếu có
      },
      defaultAvatar: "https://via.placeholder.com/150", // Ảnh mặc định nếu không có avatar
    };
  },
  methods: {
    markAsDelivered() {
      this.order.status = "Đang giao";
      alert("Đã xác nhận giao hàng!");
    },
    formatCurrency(value) {
      return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    },
    statusClass(status) {
      switch (status) {
        case "Đang chờ giao":
          return "text-blue-500 font-semibold";
        case "Đang giao":
          return "text-yellow-500 font-semibold";
        case "Hoàn thành":
          return "text-green-500 font-semibold";
        case "Đã hủy":
          return "text-red-500 font-semibold";
        default:
          return "text-gray-500";
      }
    },
  },
};
</script>

<style scoped>
/* Responsive styles */
button {
  transition: all 0.3s;
}
</style>
