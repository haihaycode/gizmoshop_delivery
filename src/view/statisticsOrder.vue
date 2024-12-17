<template>
  <div>
    <loading-spinner v-if="isLoading" />

    <div class="p-2 min-h-screen" v-if="!isModalOrderDetailView">
      <h2 class="text-2xl font-bold text-gray-800 mb-3 text-start border-l-4 border-green-500">
        &nbsp; LỊCH SỬ GIAO HÀNG
      </h2>
      <p class="text-sm text-gray-600 text-center mb-2" v-if="!isLoading && orders.length > 0">
        <span class="text-green-500 font-semibold">Xanh</span> người dùng ,
        <span class="text-yellow-500 font-semibold">Vàng</span> nhà cung cấp.
      </p>
      <div v-if="!isLoading && orders.length > 0" class="filters mb-4 flex flex-wrap gap-2 items-center justify-center">
        <div class="w-full sm:w-1/2 md:w-1/3 text-center">
          <label for="searchInput" class="block text-sm font-medium text-gray-700 mb-2">
            Tìm kiếm theo mã đơn hàng :
          </label>
          <input id="searchInput" type="text"
            class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-green-500"
            v-model="searchKeyword" placeholder="ORD_..." @input="fetchOrders" />
        </div>

        <div class="w-full sm:w-1/2 md:w-1/3 text-center">
          <label for="sortSelect" class="block text-sm font-medium text-gray-700 mb-2">
            Sắp xếp theo :
          </label>
          <select id="sortSelect" v-model="sortOrder" @change="fetchOrders"
            class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-green-500">
            <option value="id,DESC">ID - Mới nhất</option>
            <option value="id,ASC">ID - Cũ nhất</option>
          </select>
        </div>
      </div>

      <!-- Danh sách đơn hàng -->
      <listOrder :orders="orders" @selectOrder="selectOrder"></listOrder>

      <!-- Điều hướng phân trang -->
      <PaginationV2Vue :currentPage="page" :totalPages="totalPages" @change-page="changePage" />

      <!-- Chi tiết đơn hàng -->
      <orderDetail v-if="selectedOrder" :order="selectedOrder" @closeDetail="closeDetail"
        @confirmDelivery="confirmDelivery" @openCancelForm="openCancelForm"></orderDetail>
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
import PaginationV2Vue from "@/components/containers/pagination/PaginationV2.vue";
import LoadingSpinner from "@/components/containers/loading/LoadingShipper.vue";

export default {
  components: {
    listOrder,
    PaginationV2Vue,
    orderDetail,
    deliveryDetailVue,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      isModalOrderDetailView: false,
      orderDetailSelected: null,
      getOrdersforShipper,
      orders: [],
      selectedOrder: null,
      page: 0, // Trang hiện tại
      limit: 5, // Số mục trên mỗi trang
      totalPages: 0, // Tổng số trang
      // Bộ lọc
      searchKeyword: "",
      startDate: null,
      endDate: null,
      sortOrder: "id,DESC", // Sắp xếp mặc định
    };
  },
  methods: {
    async fetchOrders() {
      this.isLoading = true;
      try {
        const response = await getOrdersforShipper(
          "DA_NHAN_VA_GIAO_THANH_CONG",
          this.page,
          this.limit,
          this.searchKeyword,
          this.startDate,
          this.endDate,
          this.sortOrder
        );
        this.orders = response.data.content;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      } finally {
        this.isLoading = false;
      }
    },
    changePage(newPage) {
      if (newPage >= 0 && newPage < this.totalPages) {
        this.page = newPage;
        this.fetchOrders();
      }
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
  },
  created() {
    this.fetchOrders();
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
