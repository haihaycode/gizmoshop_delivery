<template>
  <div class="p-2 min-h-screen">
    <loading-spinner v-if="isLoading" />
    <h2 class="text-2xl font-bold text-gray-800 mb-3 text-start border-l-4 border-green-500">
      &nbsp; DANH SÁCH ĐƠN HÀNG CỦA NHÀ CUNG CẤP
    </h2>
    <div class="mb-4 flex justify-end " v-if="orders.length > 0">
      <label for="limit" class="text-gray-700 mr-2">Số lượng mỗi trang:</label>
      <select id="limit" v-model="limit" @change="updateLimit" class="border border-gray-300 rounded px-3 py-1">
        <option v-for="option in limitOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <!-- Component danh sách đơn hàng -->
    <ListDelivery :orders="orders" :selectedOrders="selectedOrders" @update:selectedOrders="selectedOrders = $event"
      @view-details="viewOrderDetails" />

    <PaginationV2Vue :currentPage="page" :totalPages="totalPages" @change-page="changePage" />
    <!-- Nút giao hàng -->
    <div class="mt-6 text-center" v-if="!isLoading && orders.length > 0">
      <button @click="markAsDelivered" :disabled="selectedOrders.length === 0" :class="{
        'bg-green-500': selectedOrders.length > 0,
        'hover:bg-green-600': selectedOrders.length > 0,
        'cursor-pointer': selectedOrders.length > 0,
        'bg-gray-300': selectedOrders.length === 0,
        'cursor-not-allowed': selectedOrders.length === 0,
      }" class="px-6 py-3 text-white rounded-lg transition text-xs sm:text-sm">
        <span v-if="isLoading">
          <i class="bx bx-loader bx-spin text-lg"></i> Đang giao hàng...
        </span>
        <span v-if="!isLoading && orders.length > 0"> Giao hàng cho các đơn đã chọn </span>
      </button>
    </div>

    <!-- Modal chi tiết đơn hàng -->
    <OrderModal v-if="showModal" :order="selectedOrder" @close="closeModal" />
  </div>
</template>

<script>
import ListDelivery from "@/components/delivery/listDelivery.vue";
import OrderModal from "@/components/delivery/detailDelivery.vue";
import { getOrders, ReceiveAnOrder } from "@/api/deliveryApi";
import PaginationV2Vue from "@/components/containers/pagination/PaginationV2.vue";
import LoadingSpinner from "@/components/containers/loading/LoadingShipper.vue";
import notificationService from "@/services/notificationService";
export default {
  components: {
    ListDelivery,
    OrderModal,
    PaginationV2Vue,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      orders: [],
      selectedOrders: [],
      showModal: false,
      selectedOrder: null,
      page: 0, // Trang hiện tại
      limit: 5, // Số lượng đơn hàng mỗi trang
      totalPages: 0,
      limitOptions: [5, 10, 15, 20],
    };
  },
  methods: {
    async fetchOrders() {
      this.isLoading = true;
      try {
        const response = await getOrders({
          type: "ORDER_SUPPLIER",
          page: this.page,
          limit: this.limit,
        });
        this.orders = response.data.content; // Danh sách đơn hàng
        this.totalPages = response.data.totalPages; // Tổng số trang từ API
        notificationService.success(
          "Lấy đơn hàng thành công!!"
        );
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      } finally {
        this.isLoading = false;
      }
    },
    changePage(newPage) {
      if (newPage >= 0 && newPage < this.totalPages) {
        this.page = newPage; // Cập nhật trang hiện tại
        this.fetchOrders(); // Gọi API để lấy dữ liệu mới
      }
    },
    updateLimit() {
      this.page = 0; // Reset về trang đầu tiên
      this.fetchOrders(); // Gọi lại API với limit mới
    },
    async ReceiveOrder(orderId) {
      this.isLoading = true;
      console.log(orderId);
      try {
        const response = await ReceiveAnOrder(orderId);
        this.orders.push(response);
      } catch (error) {
        console.error(`Lỗi khi thêm đơn hàng với ID ${orderId}:`, error);
        alert(`Có lỗi xảy ra với đơn hàng ID: ${orderId}.`);
      } finally {
        this.isLoading = false;
      }
    },
    async markAsDelivered() {
      this.isLoading = true;
      try {
        for (const orderId of this.selectedOrders) {
          await this.ReceiveOrder(orderId);
        }
        await this.fetchOrders();
        notificationService.success(
          "Sản phẩm đã được chuyển đến danh sách giao!!"
        );
      } catch (error) {
        notificationService.error(
          "Có lỗi xảy ra khi giao hàng. Vui lòng thử lại!!"
        );
      } finally {
        this.isLoading = false;
        this.selectedOrders = []; // Xóa danh sách đơn hàng đã chọn
      }
    },

    viewOrderDetails(order) {
      this.selectedOrder = order;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>
<style scoped>
/* Hiệu ứng chấm chạy */
.dots::after {
  content: " ";
  display: inline-block;
  animation: dots 1.5s steps(4, end) infinite;
}

@keyframes dots {
  0% {
    content: "";
  }

  25% {
    content: "..";
  }

  50% {
    content: "...";
  }

  75% {
    content: "....";
  }

  100% {
    content: "";
  }
}
</style>
