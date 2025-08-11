const API_BASE_URL = "http://192.168.1.104:8001";

const API = {
  RECORD: `${API_BASE_URL}/txt/records`,
  TEST_RECORD: `${API_BASE_URL}/test/txt/records`,
  BRAND: `${API_BASE_URL}/brands`,
  CRV_SPEC: `${API_BASE_URL}/csv/specs`,
  REFRESH: `${API_BASE_URL}/refresh-data`,

  PRICE: `${API_BASE_URL}/txt/price`,
};

export { API_BASE_URL };

export default API;
