<template>
  <div>
    <loading-spinner v-if="isLoading" />

    <div class="p-4 bg-gray-100 min-h-screen" v-if="!isModalOrderDetailView">
      <h2 class="text-2xl font-bold text-gray-800 text-center">
        Danh sách đơn hàng
      </h2>
      <p class="text-sm text-gray-600 text-center mb-2">
        <span class="text-green-500 font-semibold">Xanh</span>
        người dùng, <span class="text-yellow-500 font-semibold">Vàng</span> nhà
        cung cấp.
      </p>

      <!-- Component ListOrder -->
      <listOrder :orders="orders" @selectOrder="selectOrder"></listOrder>

      <orderDetail
        v-if="selectedOrder"
        :order="selectedOrder"
        @closeDetail="closeDetail"
        @confirmDelivery="confirmDelivery"
        @openCancelForm="openCancelForm"
      ></orderDetail>

      <cancelOrder
        v-if="showCancelForm"
        :selectedOrder="selectedOrder"
        :showCancelForm="showCancelForm"
        @closeCancelForm="closeCancelForm"
        @cancelOrder="processCancelOrder"
      />

      <!-- Component phân trang -->
      <PaginationV2Vue
        :currentPage="page"
        :totalPages="totalPages"
        @change-page="changePage"
      />
    </div>
    <div v-else>
      <deliveryDetailVue :order="orderDetailSelected" />
    </div>
  </div>
</template>
<script>
import listOrder from "@/components/home/listOrder.vue";
import orderDetail from "@/components/home/orderDetail.vue";
import cancelOrder from "@/components/home/cancelOrder.vue";
import PaginationV2Vue from "@/components/containers/pagination/PaginationV2.vue";
import { getOrdersforShipper } from "@/api/deliveryApi";
import deliveryDetailVue from "@/view/deliveryDetail.vue";
import LoadingSpinner from "@/components/containers/loading/LoadingShipper.vue";

export default {
  components: {
    listOrder,
    orderDetail,
    cancelOrder,
    deliveryDetailVue,
    PaginationV2Vue,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      isModalOrderDetailView: false,
      orderDetailSelected: null,
      getOrdersforShipper,
      orders: [],
      page: 0, // Trang hiện tại
      totalPages: 0, // Tổng số trang
      limit: 5, // Số lượng đơn hàng mỗi trang
      selectedOrder: null,
      showCancelForm: false,
      statusFilter: "",
    };
  },
  methods: {
    async fetchOrders() {
      this.isLoading = true;
      try {
        const response = await getOrdersforShipper(
          "DA_NHAN",
          this.page,
          this.limit
        );
        this.orders = response.data.content;
        this.totalPages = response.data.totalPages; // Cập nhật tổng số trang
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      } finally {
        this.isLoading = false;
      }
    },
    processCancelOrder(cancelData) {
      console.log("Dữ liệu hủy:", cancelData);
      alert(
        `Hủy đơn ${cancelData.orderId} với lý do: ${cancelData.reason}${cancelData.image ? " (đã tải ảnh)" : ""
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
    cancelOrder(reason) {
      alert(`Đơn hàng ${this.selectedOrder.id} đã bị hủy với lý do: ${reason}`);
      this.closeCancelForm();
      this.closeDetail();
    },
    changePage(newPage) {
      if (newPage >= 0 && newPage < this.totalPages) {
        this.page = newPage;
        this.fetchOrders(); // Gọi API khi thay đổi trang
      }
    },
  },
  created() {
    this.fetchOrders(); // Lấy dữ liệu khi component được tạo
  },
};
</script>
<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
