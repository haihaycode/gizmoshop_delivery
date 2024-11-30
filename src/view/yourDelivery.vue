<!-- eslint-disable vue/multi-word-component-names -->

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

import { getOrdersforShipper } from "@/api/deliveryApi";
import deliveryDetailVue from "@/view/deliveryDetail.vue";

export default {
  components: { listOrder, orderDetail, cancelOrder, deliveryDetailVue },
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
    };
  },
  computed: {},
  methods: {
    async fetchOrders() {
      this.isLoading = true;
      try {
        const response = await getOrdersforShipper("DA_NHAN");
        this.orders = response.data.content;
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
    cancelOrder(reason) {
      alert(`Đơn hàng ${this.selectedOrder.id} đã bị hủy với lý do: ${reason}`);
      this.closeCancelForm();
      this.closeDetail();
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>
