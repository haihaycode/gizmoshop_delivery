<template>
  <div class="min-h-screen  p-2 flex flex-col space-y-2">
    <!-- Tiêu đề -->
    <h2 class="text-2xl font-bold text-gray-800 mb-3 text-start border-l-4 border-green-500">
      &nbsp; CHI TIẾT ĐƠN HÀNG
    </h2>

    <!-- Thông tin khách hàng và giao hàng -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <!-- Thông tin khách hàng -->
      <section class="mb-2">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">
          Thông tin khách hàng
        </h3>
        <div class="flex items-center space-x-4 mb-4">
          <img src="https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg" alt="Avatar"
            class="w-16 h-16 rounded-full border-2 border-gray-300" />
          <div>
            <p class="text-lg font-semibold text-gray-800">
              {{ order.addressAccount.fullname }}
            </p>
            <div class="flex items-center space-x-2">
              <div @click="copyPhoneNumber"
                class="flex items-center space-x-2 p-2 bg-green-100 text-green-600 rounded-lg cursor-pointer border border-green-200 hover:bg-green-200 transition">
                <i class="bx bx-copy"></i>
                <p class="text-sm">{{ order.addressAccount.sdt }}</p>
              </div>
              <span v-if="copied" class="text-sm text-green-500 ml-2">Đã sao chép!</span>
            </div>
            <p class="text-lg text-gray-600">
              {{
                order.addressAccount
                  ? `${order.addressAccount.specificAddress}, ${order.addressAccount.district},
              ${order.addressAccount.city}`
                  : "Không có địa chỉ"
              }}
            </p>
          </div>
        </div>
      </section>

      <!-- Thông tin giao hàng -->
      <section>
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">
          Thông tin giao hàng
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Đơn hàng </span>
            <span class="font-semibold">
              <span v-if="order.orderStatus.roleStatus"> Nhà cung cấp </span>
              <span v-else> Khách hàng </span>
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Ngày tạo đơn</span>
            <span>{{ formatDate(order.createOderTime) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Ngày giao hàng </span>
            <span>Hôm nay</span>
          </div>
        </div>
      </section>
    </div>

    <!-- Chi tiết sản phẩm trong đơn hàng -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">
        Chi tiết sản phẩm
      </h3>
      <div v-for="(detail, index) in order.orderDetails" :key="index"
        class="flex flex-col sm:flex-row items-center justify-between mb-6 border-b pb-4">
        <div class="flex sm:items-center space-x-4 w-full">
          <img :src="detail.product.thumbnail
            ? loadImage(detail.product.thumbnail, 'product')
            : 'https://i.pinimg.com/736x/01/7c/44/017c44c97a38c1c4999681e28c39271d.jpg'
            " alt="Product Thumbnail" class="w-24 h-24 object-contain rounded-lg" />
          <div class="flex-1">
            <p class="text-lg font-semibold text-gray-800">
              #MSP{{ detail.product.id }}&nbsp;
              <br>
              Tên sản phẩm : {{ detail.product.productName }}
              <br>
              <span class="text-yellow-500 font-mono">
                {{ detail.product.productStatusResponse.id === 2 ? 'Sản phẩm bị ẩn' :
                  detail.product.productStatusResponse.id === 3 ? 'Sản phẩm bị hủy' : '' }}
              </span>
            </p>
            <p class="text-sm text-gray-600">
              Trọng lượng: {{ detail.product.productWeight }}g
            </p>
            <p class="text-sm text-gray-600">
              Kho : {{ detail.product?.productInventoryResponse?.inventory?.inventoryName + '-' || '' }}
              {{ detail.product?.productInventoryResponse?.inventory?.commune + '-' || '' }}
              {{ detail.product?.productInventoryResponse?.inventory?.district + ' -' || '' }}
              {{ detail.product?.productInventoryResponse?.inventory?.city || '' }}
            </p>
          </div>
        </div>
        <div class="w-full sm:w-auto text-center sm:text-right mt-1">
          <div class="flex sm:justify-end space-x-6">
            <div class="flex items-center space-x-2">
              <p class="text-sm text-gray-500">Giá:</p>
              <p class="font-semibold text-green-600">
                {{ formatCurrency(detail.product.productPrice) }}
              </p>
            </div>
            <div v-if="detail.product.discountProduct > 0" class="flex items-center space-x-2">
              <span class="text-red-500 font-medium">
                {{ detail.product.discountProduct }}%
              </span>
            </div>
          </div>
          <div class="flex sm:justify-end mt-1">
            <p class="text-sm text-gray-500">Số lượng: x</p>
            <p class="font-semibold text-gray-800">{{ detail.quantity }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-between py-4 border-t border-gray-300">
        <span class="text-xl font-semibold text-gray-800">Tổng giá</span>
        <span class="text-2xl font-bold text-green-600">{{
          formatCurrency(order.totalPrice)
        }}</span>
      </div>
    </div>

    <button @click="ReceiveOrder(order.id)" :disabled="isLoading"
      class="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mt-4">
      <span v-if="isLoading">Đang xác nhận...</span>
      <span v-else> Xác nhận giao hàng thành công </span>
    </button>
  </div>
</template>

<script>
import { loadImage } from "@/services/imageService";
// import { getOrdersDetail } from "@/api/deliveryApi";
import { SuccessAnOrder } from "@/api/deliveryApi";
import notificationService from "@/services/notificationService";
export default {
  props: {
    order: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  data() {
    return {
      isLoading: false,
      copied: false,
      orderCode: null,
      defaultAvatar: "https://via.placeholder.com/150", // Avatar mặc định
      defaultThumbnail: "https://via.placeholder.com/150", // Hình ảnh sản phẩm mặc định
    };
  },
  methods: {
    async ReceiveOrder(orderId) {
      this.isLoading = true;
      try {
        await SuccessAnOrder(orderId);
        notificationService.success(
          "Sản phẩm đã được giao thành công, cảm ơn bạn !!"
        );
        window.location.reload();
      } catch (error) {
        notificationService.error("Lỗi hệ thống vui lòng liên hệ lại");
      } finally {
        this.isLoading = false;
      }
    },
    loadImage,
    copyPhoneNumber() {
      const textarea = document.createElement("textarea");
      textarea.value = this.order.phone;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      this.copied = true;
      setTimeout(() => {
        this.copied = false; // Ẩn thông báo sau 2 giây
      }, 2000);
    },

    formatCurrency(value) {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("vi-VN", options);
    },
  },
};
</script>

<style scoped>
button {
  transition: all 0.3s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Tạo hiệu ứng icon điện thoại */
.fas.fa-phone-alt {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}
</style>
