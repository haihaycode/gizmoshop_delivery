<template>
  <div>
    <div
      v-if="isLoading"
      class="fixed inset-0 flex justify-center items-center z-50 bg-opacity-20 bg-gray-800"
    >
      <div
        class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500"
      ></div>
      <img
        src="https://i.pinimg.com/originals/15/e3/2c/15e32ccaf19324a19f6f32f2280ed771.gif"
        class="rounded-full h-20 w-20 opacity-80"
      />
    </div>

    <div class="p-4 bg-gray-100 min-h-screen" v-if="!isModalOrderDetailView">
      <h2 class="text-2xl font-bold text-gray-800 text-center">
        Lịch sử giao hàng
      </h2>
      <p class="text-sm text-gray-600 text-center mb-2">
        <span class="text-green-500 font-semibold">Xanh</span>
        người dùng, <span class="text-yellow-500 font-semibold">Vàng</span> nhà
        cung cấp.
      </p>

      <!-- Component ListOrder -->
      <listOrder :orders="orders" @selectOrder="selectOrder"></listOrder>

      <!-- Pagination Controls -->
      <div class="flex items-center justify-center mt-6 space-x-4">
        <!-- Nút trước -->
        <button
          @click="changePage(page - 1)"
          :disabled="page <= 0"
          class="flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          <i class="bx bx-chevron-left text-xl"></i>
          <span class="ml-2">Trước</span>
        </button>

        <!-- Hiển thị số trang -->
        <div class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md">
          Trang {{ page + 1 }} / {{ totalPages }}
        </div>

        <!-- Nút tiếp -->
        <button
          @click="changePage(page + 1)"
          :disabled="page >= totalPages - 1"
          class="flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          <span class="mr-2">Tiếp</span>
          <i class="bx bx-chevron-right text-xl"></i>
        </button>
      </div>

      <orderDetail
        v-if="selectedOrder"
        :order="selectedOrder"
        @closeDetail="closeDetail"
        @confirmDelivery="confirmDelivery"
        @openCancelForm="openCancelForm"
      ></orderDetail>
    </div>
    <div v-else>
      <deliveryDetailVue :order="orderDetailSelected" />
    </div>
  </div>
</template>

<script>
import listOrder from "@/components/home/listOrder.vue";
import orderDetail from "@/components/history/orderDetail.vue";
import { getOrdersforShipper } from "@/api/deliveryApi";
import deliveryDetailVue from "@/components/history/deliveryDetail.vue";

export default {
  components: { listOrder, orderDetail, deliveryDetailVue },
  data() {
    return {
      isLoading: false,
      isModalOrderDetailView: false,
      orderDetailSelected: null,
      getOrdersforShipper,
      orders: [],
      selectedOrder: null,
      showCancelForm: false,
      statusFilter: "",
      page: 0, // current page
      limit: 5, // items per page
      totalPages: 0, // total number of pages
    };
  },
  methods: {
    async fetchOrders() {
      this.isLoading = true;
      try {
        const response = await getOrdersforShipper(
          "DA_GIAO",
          this.page,
          this.limit
        );
        this.orders = response.data.content;
        this.totalPages = response.data.totalPages; // Update total pages
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      } finally {
        this.isLoading = false;
      }
    },
    processCancelOrder(cancelData) {
      console.log("Dữ liệu hủy:", cancelData);
      alert(
        `Hủy đơn ${cancelData.orderId} với lý do: ${cancelData.reason}${
          cancelData.image ? " (đã tải ảnh)" : ""
        }`
      );
    },
    selectOrder(order) {
      this.selectedOrder = order;
    },
    closeDetail() {
      this.selectedOrder = null;
    },
    confirmDelivery(order) {
      if (order && order.id && order.orderCode) {
        this.isModalOrderDetailView = !this.isModalOrderDetailView;
        this.orderDetailSelected = order;
        console.log("Order hợp lệ:", order);
      } else {
        console.error("Order không hợp lệ hoặc thiếu thông tin:", order);
      }
    },
    openCancelForm() {
      this.showCancelForm = true;
    },
    closeCancelForm() {
      this.showCancelForm = false;
    },
    changePage(newPage) {
      if (newPage >= 0 && newPage < this.totalPages) {
        this.page = newPage;
        this.fetchOrders(); // Fetch orders for the new page
      }
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>
