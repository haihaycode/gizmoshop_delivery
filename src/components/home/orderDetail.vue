<template>
  <transition name="fade">
    <div
      v-if="order"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 \"
    >
      <div class="bg-white w-11/12 max-w-lg  max-h-[600px] rounded-lg shadow-lg p-6 relative overflow-y-auto">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          @click="$emit('closeDetail')"
        >
          ✕
        </button>
        <h3 class="text-xl font-bold mb-4">
          Chi tiết đơn hàng: {{ order.orderCode }}
        </h3>
        <p class="mb-2">
          <strong>Tên khách hàng:</strong> {{ order.account.fullname }}
        </p>
        <p class="mb-2">
          <strong>Địa chỉ:</strong> {{ order.addressAccount.specificAddress }}
        </p>

        <p class="mb-0"><strong>Sản phẩm:</strong></p>
        <div
          v-for="(detail, index) in order.orderDetails"
          :key="index"
          class="border-b pb-2 mb-2"
        >
          <p><strong>Tên sản phẩm:</strong> {{ detail.product.productName }}</p>
          <p><strong>Số lượng:</strong> {{ detail.quantity }}</p>
          <p><strong>Giá:</strong> {{ formatCurrency(detail.price) }}</p>
          <p><strong>Thành tiền:</strong> {{ formatCurrency(detail.total) }}</p>
        </div>
        <div class="flex space-x-2">
          <button
            class="w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            @click="$emit('confirmDelivery', order)"
          >
            Giao hàng
          </button>
          <button
            class="w-1/2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            @click="$emit('openCancelForm')"
          >
            Hủy đơn hàng
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
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
