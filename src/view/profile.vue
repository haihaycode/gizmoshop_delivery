<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen bg-gray-100 p-6 flex flex-col space-y-8">
    <!-- Tiêu đề -->
    <h2 class="text-2xl font-semibold text-gray-800 text-center">
      Thông tin tài khoản
    </h2>
    <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
      <!-- Box chứa Avatar -->
      <div
        class="flex justify-center items-center bg-white border py-8 px-5 rounded-lg w-full lg:w-4/12"
      >
        <div class="text-center">
          <!-- Avatar -->
          <div>
            <!-- Avatar Image -->
            <div
              class="relative w-32 h-32 mx-auto rounded-full border-4 border-gray-300 overflow-hidden group cursor-pointer"
            >
              <img
                src="https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
                alt="Avatar"
                class="w-full h-full object-cover rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div
                class="absolute inset-0 rounded-full border-4 border-green-300 group-hover:border-green-500 transition-colors duration-300 ease-in-out"
              ></div>
            </div>
          </div>
          <p
            class="text-xl font-semibold text-gray-800 mt-4 transition-colors duration-300 ease-in-out group-hover:text-green-600"
          >
            {{ infoAccount.fullname || "Đang tải ...." }}
          </p>

          <p
            class="text-sm text-gray-500 group-hover:text-green-500 transition-colors duration-300"
          >
            {{ infoAccount.roles.join(", ") }}
          </p>
          <p
            class="text-sm text-gray-500 group-hover:text-green-500 transition-colors duration-300"
          >
            Phạm vi:
            {{
              infoAccount.extraInfo
                ? infoAccount.extraInfo
                : "Không có thông tin thêm"
            }}
          </p>
        </div>
      </div>

      <div
        class="bg-white border w-full lg:w-8/12 py-8 px-6 lg:px-8 rounded-lg shadow-md"
      >
        <div class="space-y-6">
          <!-- Tuổi -->
          <div class="flex items-center space-x-4">
            <p class="text-sm font-medium text-gray-700 w-1/3">Tuổi:</p>
            <input
              type="text"
              :value="age"
              class="w-2/3 py-2 px-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
              disabled
            />
          </div>

          <!-- Số điện thoại -->
          <div class="flex items-center space-x-4">
            <p class="text-sm font-medium text-gray-700 w-1/3">
              Số điện thoại:
            </p>
            <input
              type="text"
              :value="infoAccount?.sdt"
              class="w-2/3 py-2 px-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
              disabled
            />
          </div>

          <!-- Địa chỉ -->
          <div class="flex items-center space-x-4">
            <p class="text-sm font-medium text-gray-700 w-1/3">Email:</p>
            <input
              type="text"
              :value="infoAccount?.email"
              class="w-2/3 py-2 px-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 disabled"
              disabled
            />
          </div>

          <!-- Ngày gia nhập -->
          <div class="flex items-center space-x-4">
            <p class="text-sm font-medium text-gray-700 w-1/3">
              Ngày gia nhập:
            </p>
            <input
              type="text"
              :value="daysSinceJoin + ' ngày trước'"
              class="w-2/3 py-2 px-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
              disabled
            />
          </div>

          <!-- Trạng thái tài khoản -->
          <div class="flex items-center space-x-4">
            <p class="text-sm font-medium text-gray-700 w-1/3">
              Trạng thái tài khoản:
            </p>
            <input
              type="text"
              :value="accountStatus"
              class="w-2/3 py-2 px-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
              disabled
            />
          </div>

          <!-- Nút Cập nhật thông tin -->
          <div class="flex justify-center mt-4">
            <button
              @click="openUpdateForm"
              class="px-6 py-3 bg-green-600 text-center text-white rounded-md hover:bg-green-700"
            >
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showUpdateForm"
      class="fixed inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg w-full max-w-lg p-6">
        <h3 class="text-2xl font-semibold mb-4 text-center">
          Cập nhật thông tin
        </h3>
        <UpdateForm
          :infoAccount="infoAccount"
          :errors="errors"
          :closeUpdateForm="closeUpdateForm"
          :validateForm="validateForm"
        />
      </div>
    </div>
  </div>
  <NotificationModal
    :isOpen="NotificationModalIsOpen"
    :message="message"
    :type="messageType"
    @close="NotificationModalIsOpen = false"
    :title="'Thông báo'"
  ></NotificationModal>
</template>

<script>
import { getinfo, updateMe } from "@/api/auth/meApi";
import * as Yup from "yup";
import NotificationModal from "@/components/containers/modal/NotificationModal.vue";
import UpdateForm from "@/components/profile/modalUpdate.vue";

export default {
  components: { NotificationModal, UpdateForm },
  data() {
    return {
      NotificationModalIsOpen: false,
      showUpdateForm: false,

      infoAccount: {
        email: "",
        fullname: "",
        sdt: "",
        birthday: "",
        extraInfo: "",

        roles: [""],
        createAt: "",
        image: require("@/assets/image/3red.svg"),
      },
      errors: {},
      messageType: "",
      message: "",
    };
  },
  computed: {
    age() {
      if (!this.infoAccount.birthday) return "Chưa xác định";
      const birthDate = new Date(this.infoAccount.birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    },
    daysSinceJoin() {
      if (!this.infoAccount.createAt) return "Chưa xác định";
      const createDate = new Date(this.infoAccount.createAt);
      const today = new Date();
      const diffTime = Math.abs(today - createDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    accountStatus() {
      return this.infoAccount.deleted ? "Đã khóa" : "Hoạt động";
    },
  },
  methods: {
    validateForm() {
      this.errors = {};
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Email không hợp lệ")
          .required("Email là bắt buộc"),
        fullname: Yup.string()
          .required("Họ và tên là bắt buộc")
          .min(2, "Họ và tên phải có ít nhất 2 ký tự")
          .max(100, "Họ và tên không được vượt quá 100 ký tự"),
        sdt: Yup.string()
          .required("Số điện thoại là bắt buộc")
          .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
        birthday: Yup.date().required("Ngày sinh là bắt buộc").nullable(),
      });
      schema
        .validate(this.infoAccount, { abortEarly: false })
        .then(() => {
          this.fetchUpdateMe();
        })
        .catch((err) => {
          // Nếu có lỗi validate, hiển thị lỗi
          err.inner.forEach((validationError) => {
            this.errors[validationError.path] = validationError.message;
          });
        });
    },
    async fetchUpdateMe() {
      try {
        const dataMe = {
          fullname: this.infoAccount.fullname,
          sdt: this.infoAccount.sdt,
          birthday: this.infoAccount.birthday,
          extraInfo: this.infoAccount.extraInfo,
        };

        const formData = new FormData();
        formData.append(
          "accountRequest",
          new Blob([JSON.stringify(dataMe)], { type: "application/json" })
        );
        console.log(formData);
        await updateMe(formData);

        this.message = "Cập nhật thành công";
        this.messageType = "success";
        this.NotificationModalIsOpen = true;
        this.$emit("update-success");
        this.showUpdateForm = false;
      } catch (error) {
        this.message = "Thông tin không hợp lệ";
        this.messageType = "error";
        this.NotificationModalIsOpen = true;
      }
    },
    async fetchAccountInfo() {
      try {
        const response = await getinfo();
        this.infoAccount = response.data;
        console.log(this.infoAccount);
        return this.infoAccount;
      } catch (error) {
        console.error(error);
      }
    },
    openUpdateForm() {
      this.showUpdateForm = true;
    },
    closeUpdateForm() {
      this.showUpdateForm = false;
    },
  },
  mounted() {
    this.fetchAccountInfo();
    this.validateForm;
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
</style>
