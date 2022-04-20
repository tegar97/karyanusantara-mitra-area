import callApi from "../config/axios";

export async function postProduct(data,token) {
  const url = "/umkm/product";

  return callApi({
    url,
    method: "POST",
    data,
    headers: token,
  });
}
export async function getMyProduct(page,token) {
  const url = `/umkm/myproducts?${page}`;

  return callApi({
    url,
    method: "GET",
    headers: token,
  });
}

export async function updateStatus(id,data,token) {
  const url = `/umkm/product/updatestatus/${id}`;

  return callApi({
    url,
    method: "PUT",
    data,
    headers: token,
  });
}
export async function updateStock(data,token) {
  const url = `/umkm/product/updateStock`;

  return callApi({
    url,
    method: "PUT",
    data,
    headers: token,
  });
}
