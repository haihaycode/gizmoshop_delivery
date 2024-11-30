/* eslint-disable no-useless-catch */
import Axios from "@/api/axios";
import { HOST } from "@/api/config";

export const getOrders = async (queryType) => {
  try {
    const response = await Axios.get(
      `${HOST}/api/public/t/delivery/all-order`,
      {
        params: { type: queryType }, // Truyền query parameter
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOrdersforShipper = async (queryType) => {
  try {
    const response = await Axios.get(
      `${HOST}/api/public/t/delivery/get-all-received-orders`,
      {
        params: { type: queryType }, // Truyền query parameter
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};
export const getOrdersDetail = async (queryType) => {
  try {
    const response = await Axios.get(
      `${HOST}/api/public/t/delivery/all-order`,
      {
        params: { keyword: queryType }, // Truyền query parameter
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const ReceiveAnOrder = async (orderId) => {
  try {
    const response = await Axios.patch(
      `${HOST}/api/public/t/delivery/assign-order-to-shipper/${orderId}` // Truyền orderId qua URL path variable
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// deliveryApi.js
export const SuccessAnOrder = async (orderId) => {
  try {
    const response = await Axios.patch(
      `${HOST}/api/public/t/delivery/confirm-delivery/${orderId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const CancelAnOrder = async (orderId, note) => {
  try {
    const response = await Axios.patch(
      `${HOST}/api/public/t/delivery/cancel-order/${orderId}?note=${note}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

