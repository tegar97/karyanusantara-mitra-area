import callApi from "../config/axios";

export async function fastSearchAddress(subdistricts) {
  const url = `/fastsearch?q=${subdistricts}`;

  return callApi({
    url,
    method: "GET",
  });
}
