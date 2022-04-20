import callApi from "../config/axios";

export async function getCategory() {
  const url = "/categories";

  return callApi({
    url,
    method: "GET",
  });
}
