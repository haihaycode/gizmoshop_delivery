<template>
  <div class="space-y-4">
    <div
      @click="$emit('selectOrder', order)"
      v-for="order in orders"
      :key="order.id"
      :class="{
        'border border-green-300 bg-green-100':
          order.orderStatus.roleStatus === false,
      }"
      class="bg-white shadow-md rounded-lg flex items-center p-4 hover:shadow-lg transition-transform transform hover:scale-105"
    >
      <!-- Icon tình trạng -->
      <div
        class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full"
        :class="{
          'bg-green-100 text-green-500': order.orderStatus.id === 15, // Đã nhận, chờ giao
          'bg-green-100 text-green-500': order.orderStatus.id === 13, // Hoàn thành
          'bg-red-100 text-red-500':
            order.orderStatus.id === 4 || !order.orderStatus.id, // Đã hủy hoặc không có id
          'bg-gray-100 text-gray-500':
            order.orderStatus.id !== 15 &&
            order.orderStatus.id !== 13 &&
            order.orderStatus.id !== 4, // Trường hợp còn lại
        }"
      >
        <i
          class="text-2xl"
          :class="{
            'bx bx-hourglass': order.orderStatus.id === 15, // Đã nhận, chờ giao
            'bx bx-check-circle': order.orderStatus.id === 13, // Hoàn thành
            'bx bx-x-circle':
              order.orderStatus.id === 4 || !order.orderStatus.id, // Đã hủy hoặc không có id
            'bx bx-x-circle':
              order.orderStatus.id !== 15 &&
              order.orderStatus.id !== 13 &&
              order.orderStatus.id !== 4, // Trường hợp còn lại
          }"
        ></i>
      </div>

      <!-- Nội dung đơn hàng -->
      <div class="flex-1 ml-4">
        <h3 class="text-lg font-semibold text-gray-800 truncate">
          Mã đơn: {{ order.orderCode }}
        </h3>
        <p class="text-sm text-gray-600">
          <strong>Khách hàng:</strong> {{ order.account.fullname }}
        </p>
        <p class="text-sm text-gray-600 truncate">
          <strong>Địa chỉ:</strong> {{ order.addressAccount.specificAddress }}
        </p>
        <p class="text-sm mt-2">
          <span class="font-medium mr-2">Tình trạng:</span>
          <span
            :class="{
              'text-green-600 font-semibold': order.orderStatus.id === 15, // Đã nhận, chờ giao
              'text-green-500 font-semibold': order.orderStatus.id === 13, // Hoàn thành
              'text-red-500 font-semibold': order.orderStatus.id === 4, // Đã hủy
              'text-red-500 font-semibold':
                order.orderStatus.id !== 15 &&
                order.orderStatus.id !== 13 &&
                order.orderStatus.id !== 4, // Chưa giao
            }"
          >
            {{
              order.orderStatus.id === 15
                ? "Đã nhận, chờ giao"
                : order.orderStatus.id === 13
                ? "Hoàn thành"
                : order.orderStatus.id === 4
                ? "Đã hủy"
                : "Đã hủy"
            }}
          </span>
        </p>
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
    },
  },
};
</script>
