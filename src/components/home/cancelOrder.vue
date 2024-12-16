<template>
  <transition name="fade">
    <div
      v-if="showCancelForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative">
        <!-- Nút đóng -->
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          @click="closeCancelForm"
        >
          ✕
        </button>

        <!-- Tiêu đề -->
        <h3 class="text-lg font-bold mb-4">
          Hủy đơn hàng: {{ selectedOrder.id }}
        </h3>

        <!-- Lý do hủy -->
        <div class="mb-4">
          <label
            for="cancelReason"
            class="block text-sm font-medium text-gray-700"
            >Lý do hủy:</label
          >
          <select
            v-model="selectedCancelReason"
            id="cancelReason"
            class="w-full border border-gray-300 rounded-md p-2 mt-2"
          >
            <option value="">Chọn lý do hủy</option>
            <option value="Sản phẩm không đúng">Sản phẩm không đúng</option>
            <option value="Khách hàng yêu cầu">Khách hàng yêu cầu</option>
            <option value="Không còn nhu cầu">Không còn nhu cầu</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <!-- Nếu chọn "Khác", hiển thị ô nhập lý do -->
        <div v-if="selectedCancelReason === 'Khác'" class="mb-4">
          <textarea
            v-model="customCancelReason"
            placeholder="Nhập lý do hủy khác..."
            class="w-full border border-gray-300 rounded-md p-2 mt-2"
          ></textarea>
        </div>

        <button
          class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          @click="handleCancel"
        >
          Xác nhận hủy đơn
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { CancelAnOrder } from "@/api/deliveryApi";
import notificationService from "@/services/notificationService";

export default {
  props: {
    showCancelForm: {
      type: Boolean,
      required: true,
    },
    selectedOrder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedCancelReason: "",
      customCancelReason: "",
      isLoading: false,
    };
  },
  methods: {
    closeCancelForm() {
      this.$emit("closeCancelForm");
    },
    async handleCancel() {
      this.isLoading = true;
      const cancelReason =
        this.selectedCancelReason === "Khác"
          ? this.customCancelReason // Sử dụng lý do tùy chỉnh nếu chọn "Khác"
          : this.selectedCancelReason; // Nếu không, sử dụng lý do chọn sẵn từ dropdown

      try {
        await CancelAnOrder(this.selectedOrder.id, cancelReason); // Gửi lý do hủy vào API
        notificationService.success("Đơn hàng đã bị hủy, cảm ơn bạn !!");
        this.$emit("closeCancelForm"); // Đóng form sau khi hủy
        window.location.reload(); // Reload lại trang sau khi hủy thành công
      } catch (error) {
        notificationService.error("Lỗi hệ thống vui lòng liên hệ lại");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
