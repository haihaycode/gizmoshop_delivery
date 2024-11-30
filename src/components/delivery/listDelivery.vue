<template>
  <div class="space-y-4">
    <div
      v-for="order in orders"
      :key="order.id"
      class="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-transform transform hover:scale-105"
    >
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-800">Mã đơn: {{ order.id }}</h3>
        <p class="text-sm text-gray-600">
          <strong>Khách hàng:</strong> {{ order.account ? order.account.fullname : 'Không có thông tin' }}
        </p>
        <p class="text-sm text-gray-600 truncate">
          <strong>Địa chỉ:</strong> {{ order.addressAccount ? order.addressAccount.specificAddress : 'Không có địa chỉ' }}
        </p>
      </div>
      <div class="flex items-center gap-4">
        <button
          @click="$emit('view-details', order)"
          class="text-blue-600 hover:underline text-xs sm:text-sm"
        >
          Xem chi tiết
        </button>
        <input
          type="checkbox"
          :checked="selectedOrders.includes(order.id)"
          @change="handleCheckboxChange($event, order.id)"
          class="h-5 w-5 text-blue-500 border-gray-300 rounded"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
      default: () => [],
    },
    selectedOrders: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    handleCheckboxChange(event, orderId) {
      const isChecked = event.target.checked;
      if (isChecked) {
        this.$emit("update:selectedOrders", [...this.selectedOrders, orderId]);
      } else {
        this.$emit("update:selectedOrders", this.selectedOrders.filter((id) => id !== orderId));
      }
    },
  },
};
</script>
