<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <loading-spinner v-if="isLoading" />
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
      Danh sách đơn hàng của nhà cung cấp
    </h2>

    <!-- Component danh sách đơn hàng -->
    <ListDelivery
      :orders="orders"
      :selectedOrders="selectedOrders"
      @update:selectedOrders="selectedOrders = $event"
      @view-details="viewOrderDetails"
    />
    <!-- Nút giao hàng -->
    <!-- Nút giao hàng -->
    <div class="mt-6 text-center">
      <button
        @click="markAsDelivered"
        :disabled="selectedOrders.length === 0"
        :class="{
          'bg-green-500': selectedOrders.length > 0,
          'hover:bg-green-600': selectedOrders.length > 0,
          'cursor-pointer': selectedOrders.length > 0,
          'bg-gray-300': selectedOrders.length === 0,
          'cursor-not-allowed': selectedOrders.length === 0,
        }"
        class="px-6 py-3 text-white rounded-lg transition text-xs sm:text-sm"
      >
        Giao hàng cho các đơn đã chọn
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
import LoadingSpinner from "@/components/containers/loading/LoadingShipper.vue";

export default {
  components: {
    ListDelivery,
    OrderModal,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      orders: [],
      selectedOrders: [],
      showModal: false,
      selectedOrder: null,
    };
  },
  methods: {
    async fetchOrders() {
      this.isLoading = true;
      try {
        const response = await getOrders("ORDER_SUPPLIER");
        this.orders = response.data.content;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      } finally {
        this.isLoading = false;
      }
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
      } catch (error) {
        console.error("Lỗi khi giao đơn hàng:", error);
        alert("Có lỗi xảy ra khi giao hàng. Vui lòng thử lại.");
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
