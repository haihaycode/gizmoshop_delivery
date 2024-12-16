<template>
  <div
    class="fixed inset-0 flex flex-col justify-center items-center z-50 bg-opacity-20 bg-gray-500"
  >
    <!-- Hình ảnh xe chạy -->
    <div class="relative w-full flex items-center justify-center">
      <img
        src="https://i.pinimg.com/originals/e5/ff/cd/e5ffcd387e4cfe0012c27bcb70c8895f.gif"
        class="absolute h-20 w-20 animate-car rounded-full"
      />
      <!-- <div
        class="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500"
      ></div> -->
    </div>

    <p class="text-white text-lg font-semibold mt-10">
      Đang tải
      <span class="dots"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped>
/* Hiệu ứng di chuyển xe */
@keyframes carMove {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-car {
  animation: carMove 4s linear infinite;
}

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
