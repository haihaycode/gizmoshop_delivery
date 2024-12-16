<template>
  <div v-if="order" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
      <h3 class="text-xl font-semibold text-gray-800">
        Chi tiết đơn hàng: <span class="text-blue-500">{{ order.id }}</span>
      </h3>
      <div class="mt-4 space-y-2">
        <p><strong>Khách hàng:</strong> {{ order.account.fullname }}</p>
        <p><strong>Địa chỉ:</strong> {{ order.addressAccount?.specificAddress || "Không có thông tin" }}</p>
        <h4 class="font-medium text-lg mt-4 border-b pb-2 text-gray-700">Sản phẩm</h4>
        <div v-for="(detail, index) in order.orderDetails" :key="index" class="border-b pb-2 mb-2">
          <p><strong>Tên sản phẩm:</strong> {{ detail.product.productName }}</p>
          <p><strong>Số lượng:</strong> {{ detail.quantity }}</p>
          <p><strong>Giá:</strong> {{ formatCurrency(detail.price) }}</p>
          <p><strong>Thành tiền:</strong> {{ formatCurrency(detail.total) }}</p>
        </div>
        <p>
          <strong>Tổng tiền:</strong>
          <span class="text-red-500 font-semibold">{{ formatCurrency(order.totalPrice) }}</span>
        </p>
      </div>
      <div class="mt-6 text-right">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xs sm:text-sm">
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: false,
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
};
</script>
