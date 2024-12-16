<!-- eslint-disable vue/no-mutating-props -->
<!-- src/components/UpdateForm.vue -->
<template>
  <form @submit.prevent="validateForm">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Họ và tên</label>
        <input
          v-model="infoAccount.fullname"
          type="text"
          class="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span class="text-red-500 text-sm" v-if="errors.fullname">
          {{ errors.fullname }}
        </span>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Số điện thoại</label
        >
        <input
          v-model="infoAccount.sdt"
          type="text"
          class="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.sdt" class="text-red-500 text-sm">{{ errors.sdt }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="infoAccount.email"
          disabled
          class="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.email" class="text-red-500 text-sm">
          {{ errors.email }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Ngày sinh</label>
        <input
          v-model="infoAccount.birthday"
          type="date"
          class="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.birthday" class="text-red-500 text-sm">
          {{ errors.birthday }}
        </p>
      </div>
      <div class="flex justify-end space-x-4">
        <button
          @click="closeUpdateForm"
          class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Hủy
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Cập nhật
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    infoAccount: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    closeUpdateForm: {
      type: Function,
      required: true,
    },
    validateForm: {
      type: Function,
      required: true,
    },
  },
};
</script>
