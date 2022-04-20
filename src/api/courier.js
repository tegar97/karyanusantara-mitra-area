import callApi from "../config/axios";

export async function getCourier() {
  const url = "/courier";

  return callApi({
    url,
    method: "GET",
  });
}
export async function getMyCourier(token) {
  const url = "/courier/my";

  return callApi({
    url,
    method: "GET",
    headers: token,
  });
}
export async function addMyCourier(data,token) {
  const url = "/courierSettingUmkm";

  return callApi({
    url,
    method: "POST",
    data,
    headers: token,
  });
}
