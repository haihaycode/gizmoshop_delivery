<template>
  <div class="space-y-4">
    <div v-if="orders.length === 0 && !isLoading" class="text-center p-4 text-gray-500">
      <p>Đơn hàng hôm nay trống, vui lòng quay lại sau.</p>
    </div>
    <div @click="$emit('selectOrder', order)" v-for="order in orders" :key="order.id" :class="{
      'border border-green-300 ': !order.orderStatus.roleStatus, // Nếu roleStatus là false
      'border border-yellow-300 ': order.orderStatus.roleStatus, // Nếu roleStatus là true
    }"
      class="bg-white shadow-md rounded-lg flex items-center p-4 hover:shadow-lg transition-transform transform hover:scale-100">
      <!-- Icon tình trạng -->
      <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full" :class="{
        'bg-green-300 text-green-500':
          order.orderStatus.id === 15 || order.orderStatus.id === 29, // Đã nhận, chờ giao
        'bg-green-300 text-green-500':
          order.orderStatus.id === 13 || order.orderStatus.id === 20, // Hoàn thành
        'bg-red-100 text-red-500':
          order.orderStatus.id === 4 || !order.orderStatus.id, // Đã hủy hoặc không có id
        'bg-gray-100 text-gray-500':
          order.orderStatus.id !== 15 &&
          order.orderStatus.id !== 29 &&
          order.orderStatus.id !== 13 &&
          order.orderStatus.id !== 20 &&
          order.orderStatus.id !== 4, // Trường hợp khác
      }">
        <i class="text-2xl" :class="{
          'bx bxs-truck bx-tada bx-rotate-180':
            order.orderStatus.id === 15 || order.orderStatus.id === 29, // Đã nhận, chờ giao
          'bx bx-user-check':
            order.orderStatus.id === 13 || order.orderStatus.id === 20, // Hoàn thành
          'bx bx-x-circle':
            order.orderStatus.id === 4 || !order.orderStatus.id, // Đã hủy hoặc không có id
          'bx bx-question-mark':
            order.orderStatus.id !== 15 &&
            order.orderStatus.id !== 29 &&
            order.orderStatus.id !== 13 &&
            order.orderStatus.id !== 20 &&
            order.orderStatus.id !== 4, // Trường hợp khác
        }"></i>
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
          <strong>Địa chỉ:</strong> {{
            order.addressAccount
              ? `${order.addressAccount.specificAddress}, ${order.addressAccount.district}, ${order.addressAccount.city}`
              : "Không có địa chỉ"
          }}
        </p>
        <p class="text-sm mt-2">
          <span class="font-medium mr-2">Tình trạng:</span>
          <span :class="{
            'text-green-500 font-semibold':
              order.orderStatus.id === 15 || order.orderStatus.id === 29, // Đã nhận, chờ giao
            'text-green-500 font-semibold':
              order.orderStatus.id === 13 || order.orderStatus.id === 20, // Hoàn thành
            'text-red-500 font-semibold': order.orderStatus.id === 4, // Đã hủy
            'text-gray-500 font-semibold':
              order.orderStatus.id !== 15 &&
              order.orderStatus.id !== 29 &&
              order.orderStatus.id !== 13 &&
              order.orderStatus.id !== 20 &&
              order.orderStatus.id !== 4, // Trạng thái khác
          }">
            {{
              order.orderStatus.id === 15 || order.orderStatus.id === 29
                ? "Đã nhận, chờ giao"
                : order.orderStatus.id === 13 || order.orderStatus.id === 20
                  ? "Hoàn thành"
                  : order.orderStatus.id === 4
                    ? "Đã hủy"
                    : "Chưa rõ trạng thái"
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('loading', ['isLoading'])
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
};
</script>
