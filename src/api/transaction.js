import callApi from "../config/axios";

export async function getMytTransaction(token,code) {
  const url = `/transaction/seller/${code}`;

  return callApi({
    url,
    method: "GET",
    headers: token,
  });
}



export async function sendResi(data, token) {
  const url = "/sendResi";

  return callApi({
    url,
    method: "POST",
    data,
    headers: token,
  });
}
export async function getTransactionHistory(token) {
    const url = "/umkm/history/salesHistory";

    return callApi({
      url,
      method: "GET",
      headers: token,
    });
}