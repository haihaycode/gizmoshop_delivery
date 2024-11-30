<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Hiển thị loading -->
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

    <!-- Tiêu đề -->
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
      Danh sách đơn hàng cần giao
    </h2>

    <!-- Danh sách đơn hàng -->
    <ListDelivery
      :orders="orders"
      :selectedOrders="selectedOrders"
      @update:selectedOrders="selectedOrders = $event"
      @view-details="viewOrderDetails"
    />

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

    <!-- Modal chi tiết đơn -->
    <OrderModal v-if="showModal" :order="selectedOrder" @close="closeModal" />
  </div>
</template>

<script>
import ListDelivery from "@/components/delivery/listDelivery.vue";
import OrderModal from "@/components/delivery/detailDelivery.vue";
import { getOrders, ReceiveAnOrder } from "@/api/deliveryApi";

export default {
  components: { ListDelivery, OrderModal },
  data() {
    return {
      isLoading: false,
      orders: [], // Danh sách đơn hàng
      selectedOrders: [], // Danh sách ID đơn hàng được chọn
      showModal: false,
      selectedOrder: null,
    };
  },
  methods: {
    async fetchOrders() {
      this.isLoading = true;
      try {
        const response = await getOrders("ORDER_CUSTOMER");
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
        this.selectedOrders = [];
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
    this.fetchOrders(); // Tải danh sách đơn hàng khi khởi tạo
  },
};
</script>
