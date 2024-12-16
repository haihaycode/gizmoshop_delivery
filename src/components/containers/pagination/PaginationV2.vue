<template>
  <div class="flex items-center justify-center mt-6 space-x-4">
    <!-- Nút trước -->
    <button
      @click="$emit('change-page', currentPage - 1)"
      :disabled="currentPage <= 0"
      class="flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
    >
      <i class="bx bx-chevron-left text-xl"></i>
    </button>

    <!-- Hiển thị số trang -->
    <div class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md">
      Trang {{ currentPage + 1 }} / {{ totalPages }}
    </div>

    <!-- Nút tiếp -->
    <button
      @click="$emit('change-page', currentPage + 1)"
      :disabled="currentPage >= totalPages - 1"
      class="flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
    >
      <i class="bx bx-chevron-right text-xl"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
};
</script>
