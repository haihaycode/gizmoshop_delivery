<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <!-- Bộ lọc và Tiêu đề -->
    <div class="mb-6 flex flex-col md:flex-row gap-4">
      <div class="flex items-center gap-4 w-full md:w-auto">
        <label
          for="statusFilter"
          class="text-sm font-medium text-gray-700 block md:w-32"
        >
          Trạng thái:
        </label>
        <select
          id="statusFilter"
          v-model="statusFilter"
          class="border border-gray-300 rounded-md p-2 w-full md:w-56 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
        >
          <option value="">Tất cả</option>
          <option value="Chưa giao">Chưa giao</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>
    </div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
      Danh sách đơn hàng
    </h2>

    <!-- Component ListOrder -->
    <listOrder :orders="filteredOrders" @selectOrder="selectOrder"></listOrder>

    <!-- Component OrderDetail -->
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
</template>

<script>
import listOrder from "@/components/home/listOrder.vue";
import orderDetail from "@/components/home/orderDetail.vue";
import cancelOrder from "@/components/home/cancelOrder.vue";

export default {
  components: { listOrder, orderDetail, cancelOrder },
  data() {
    return {
      orders: [
        {
          id: "DH001",
          customerName: "Nguyễn Văn A",
          address: "123 Đường ABC, TP. HCM",
          status: "Hoàn thành",
          items: [
            { name: "Sản phẩm 1", quantity: 2 },
            { name: "Sản phẩm 2", quantity: 1 },
          ],
        },
        {
          id: "DH002",
          customerName: "Trần Thị B",
          address: "456 Đường XYZ, TP. HCM",
          status: "Đang giao",
          items: [
            { name: "Sản phẩm 3", quantity: 1 },
            { name: "Sản phẩm 4", quantity: 3 },
          ],
        },
        {
          id: "DH003",
          customerName: "Lê Văn C",
          address: "789 Đường LMN, TP. HCM",
          status: "Chưa giao",
          items: [
            { name: "Sản phẩm 5", quantity: 1 },
            { name: "Sản phẩm 6", quantity: 2 },
          ],
        },
      ],
      selectedOrder: null,
      showCancelForm: false,
      statusFilter: "",
    };
  },
  computed: {
    filteredOrders() {
      return this.statusFilter
        ? this.orders.filter((order) => order.status === this.statusFilter)
        : this.orders;
    },
  },
  methods: {
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
    confirmDelivery(orderId) {
      alert(`Giao thành công đơn hàng: ${orderId}`);
      this.selectedOrder = null;
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
};
</script>
