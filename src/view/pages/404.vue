<template>
    <div class="h-screen w-screen bg-gray-50 flex items-center justify-center">
        <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <!-- Left section (404 message) -->
            <div class="max-w-md text-center md:text-left">
                <div class="text-6xl font-semibold text-gray-800">404</div>
                <p class="text-xl md:text-2xl font-light leading-relaxed mt-4">
                    Xin lỗi, chúng tôi không thể tìm thấy trang này.
                </p>
                <p class="mt-2 mb-8 text-gray-600">
                    Nhưng đừng lo, bạn có thể tìm thấy rất nhiều thứ khác trên trang chủ của chúng tôi.
                </p>
                <div class="mt-6 flex justify-center md:justify-start space-x-4">
                    <router-link to="/" 
                        class="inline-block px-6 py-3 bg-green-600 text-white rounded-lg transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Quay lại trang chủ
                    </router-link>
                    <button @click="goBack" 
                        class="inline-block px-6 py-3 bg-gray-300 text-gray-800 rounded-lg transition duration-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600">
                        Quay lại trang trước
                    </button>
                </div>
            </div>
            <!-- Right section (Image) -->
            <div class="max-w-lg mt-8 md:mt-0 rounded-full">
                <img src="https://i.pinimg.com/originals/2a/e6/ab/2ae6abf7d34b50677c4af372a6c9667e.gif" alt="404 Illustration" class="rounded-full w-80 mx-auto md:w-96">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods: {
        goBack() {
            this.$router.go(-1); // Quay lại trang trước
        }
    }
};
</script>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
}
</style>
