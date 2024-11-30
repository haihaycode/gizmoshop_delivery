<template>
  <div class="bg-white p-4 rounded-lg w-full max-w-md">
    <h3 class="text-lg font-semibold mb-4">Chọn ảnh đại diện</h3>

    <!-- Preview image after selection -->
    <div v-if="previewImage" class="mb-4 flex justify-center">
      <img
        :src="previewImage"
        alt="Preview"
        class="w-52 h-52 object-cover rounded-full"
      />
    </div>

    <!-- Default image placeholder if no preview image -->
    <div v-else class="mb-4 flex justify-center">
      <img
        src="https://i.pinimg.com/736x/15/1f/02/151f02a2b4d07f86eda196d693a07acb.jpg"
        alt="Default Image"
        class="w-52 h-52 object-cover rounded-full"
      />
    </div>

    <!-- File input for selecting image -->
    <input
      type="file"
      @change="onImageSelected"
      accept="image/*"
      class="mb-4"
    />

    <div class="flex justify-end">
      <button
        @click="closeUpdateForm"
        class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        Hủy
      </button>
      <button
        @click="updateAvatar"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-2"
      >
        Cập nhật
      </button>
    </div>
  </div>
</template>

<script>
import * as Yup from "yup";

export default {
  props: {
    infoAccount: {
      type: Object,
      required: true,
    },

    closeUpdateForm: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      NotificationModalIsOpen: false,
      messageType: "",
      message: "",
      userData: {
        image: "", // Lưu trữ file ảnh
        fullname: "", // Lưu thông tin accountRequest (thêm các thông tin khác nếu cần)
        sdt: "",
        birthday: "",
        extraInfo: "",
      },
      errors: {},
      defaultImage: require("@/assets/image/3red.svg"),
      previewImage: null,
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      const schema = Yup.object().shape({
        image: Yup.mixed().required("Bạn phải chọn một ảnh"),
      });

      schema
        .validate(this.userData, { abortEarly: false })
        .then(() => {
          this.updateAvatar();
        })
        .catch((err) => {
          err.inner.forEach((validationError) => {
            this.errors[validationError.path] = validationError.message;
          });
        });
    },
    onImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async updateAvatar() {
      console.log("làm chưa đuoc");
    },
  },
};
</script>
