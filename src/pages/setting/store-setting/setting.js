import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fastSearchAddress } from "../../../api/address";
import { updateStore, uploadAvatar } from "../../../api/umkm";
import { baseUrl } from "../../../constant/baseUrl";
import image2base64 from "../../../utils/image2base64";

function StoreSetting() {
  const users = useSelector((state) => state.users);
  const [SearchResponse, setSearchResponse] = useState(() => ({
    isLoading: false,
    isError: false,
    data: [],
  }));
  const [closeSearchBar, setCloseSearchBar] = useState(true);
  const [SearchFocus, setSearchFocus] = useState(() => false);

  const [Search, setSearch] = useState("");
  const [ukmName, setUkmName] = useState("");
  const [description, setDescription] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [village, setVillage] = useState("");
  const [ukmAddress, setUkmAddress] = useState("");
  const [provinceId, setProvinceId] = useState();
  const [subdistrictId, setSubdistrictId] = useState();
  const [cityId, setCityId] = useState();
  const [province, setProvince] = useState();
  const [subdistrict, setSubDistrict] = useState();
  const [city, setCity] = useState();
  const [prevImage, setPrevImage] = useState();
  const [avatar, setAvatar] = useState();
  let timeOutSearch = useRef(null);

  useEffect(() => {
    setUkmName(users?.ukmName);
    setDescription(users?.description);
    setPostalCode(users?.postalCode);
    setVillage(users?.village);
    setUkmAddress(users?.ukmAddress);
    setProvinceId(users?.province_id);
    setCityId(users?.city_id);
    setProvince(users?.province_name);
    setCity(users?.city_name);
    setSubDistrict(users?.subdistrict);
    setSubdistrictId(users?.subdistrict_id);
    setSearch(
      users?.city_name && users?.province_name && users.subdistrict
        ? `${users?.province_name} - ${users?.city_name} - ${users.subdistrict} `
        : ""
    );
  }, [users]);

  const autoFillAddress = (item) => {
    setCity(item.city_name);
    setSubDistrict(item.subdistrict_name);
    setProvince(item.province_name);
    setSearch(item.subdistrict_name);
    setProvinceId(item.province_id);
    setCityId(item.city_id);
    setSubdistrictId(item.subdistrict_id);
    setSearch(
      `${item.province_name} , ${item.city_name}, ${item.subdistrict_name}`
    );
    setCloseSearchBar(true);
    };
  function handleSearch(e) {
    e.persist();
    setCloseSearchBar(false);
    setSearch(e.target.value);
    clearTimeout(timeOutSearch.current);

    timeOutSearch.current = setTimeout(async () => {
      setSearchResponse({
        isLoading: true,
        isError: false,
        data: null,
      });

      if (Search.length >= 2) {
        const response = await fastSearchAddress(e.target.value);
        if (response?.data !== null) {
          setSearchResponse({
            isLoading: false,
            isError: false,
            data: response?.data,
          });
        } else {
          setSearchResponse({
            isLoading: false,
            isError: true,
            data: null,
          });
        }
      }
    }, 1000);
  }
  function previewImage(e) {
    image2base64(e).then((image) => {
      setPrevImage(image);
    });
  }
  const changeAvatar = (e) => {
    previewImage(e);
    setAvatar(e);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ukmName,
        description,
        province_id: provinceId,
        province_name: province,
        city_name: city,
        city_id: cityId,
        subdistrict: subdistrict,
        subdistrict_id: subdistrictId,
        postalCode: postalCode,
        ukmAddress: ukmAddress,
        village: village,
      };
      const token = localStorage.getItem("token");
      const bearer = `Bearer ${token}`;
      if (
        ukmName !== "" &&
        city !== "" &&
        province !== "" &&
        description !== "" &&
        postalCode !== "" &&
        ukmAddress !== ""
      ) {
        if (prevImage !== null) {
          const formData = new FormData();
          formData.append("profile_photo", avatar);
            await uploadAvatar(formData,bearer);
        }
        const response = await updateStore(data, bearer);
        console.log(response);
        if (response.error == false) {
            toast.success("Berhasil update Data");
            
            setTimeout(function () {
                      window.location.reload(); 
            },500)
        }
      } else {
        toast.error("Semua field harus di isi");
      }
    } catch {}
  };
  if (users)
    return (
      <main className="flex-grow wrapper min-h-screen py-12 px-12 ml-5 ">
        <h1 className="text-4xl font-bold " style={{ color: "#0C145A" }}>
          Settings
        </h1>
        <div className="mt-24 px-5">
          <div className="flex flex-row">
            {" "}
            <img
              src={prevImage ?  prevImage : `${baseUrl}/storage/images/avatar/${users?.profile_photo}`}
              width="90"
              height="90"
              style={{ borderRadius: "100%" }}
              className="img-fluid mb-20 ronded-full"
              alt="profile"
            />{" "}
            <div>
              <label for="avatar">
                <svg
                  className="ml-5"
                  width="90"
                  height="90"
                  viewBox="0 0 90 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="45" cy="45" r="45" fill="#E7EAF5"></circle>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M45 39.375C42.7981 39.375 40.9679 40.7216 40.3127 42.5332C40.1693 42.9297 39.8162 43.2128 39.398 43.2665C37.4362 43.5183 36 45.1013 36 46.9286C36 48.919 37.7105 50.625 39.9375 50.625C40.5588 50.625 41.0625 51.1287 41.0625 51.75C41.0625 52.3713 40.5588 52.875 39.9375 52.875C36.5726 52.875 33.75 50.2638 33.75 46.9286C33.75 44.0997 35.7853 41.7878 38.4536 41.1547C39.5996 38.7573 42.1173 37.125 45 37.125C48.5711 37.125 51.6055 39.6452 52.1224 43.0137C54.4461 43.4763 56.25 45.4474 56.25 47.8929C56.25 50.6955 53.8807 52.875 51.075 52.875C50.4537 52.875 49.95 52.3713 49.95 51.75C49.95 51.1287 50.4537 50.625 51.075 50.625C52.7428 50.625 54 49.3507 54 47.8929C54 46.435 52.7428 45.1607 51.075 45.1607C50.4537 45.1607 49.95 44.657 49.95 44.0357C49.95 41.5128 47.7862 39.375 45 39.375Z"
                    fill="#0C145A"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M45 52.875C44.3787 52.875 43.875 52.3713 43.875 51.75V45C43.875 44.3787 44.3787 43.875 45 43.875C45.6213 43.875 46.125 44.3787 46.125 45V51.75C46.125 52.3713 45.6213 52.875 45 52.875Z"
                    fill="#0C145A"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M41.9545 48.0455C41.5152 47.6062 41.5152 46.8938 41.9545 46.4545L44.2045 44.2045C44.6438 43.7652 45.3562 43.7652 45.7955 44.2045C46.2348 44.6438 46.2348 45.3562 45.7955 45.7955L43.5455 48.0455C43.1062 48.4848 42.3938 48.4848 41.9545 48.0455Z"
                    fill="#0C145A"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M44.2045 44.2045C44.6438 43.7652 45.3562 43.7652 45.7955 44.2045L48.0455 46.4545C48.4848 46.8938 48.4848 47.6062 48.0455 48.0455C47.6062 48.4848 46.8938 48.4848 46.4545 48.0455L44.2045 45.7955C43.7652 45.3562 43.7652 44.6438 44.2045 44.2045Z"
                    fill="#0C145A"
                  ></path>
                </svg>
              </label>

              <input
                id="avatar"
                type="file"
                style={{ visibility: "hidden", width: 0, height: 0 }}
                name="avatar"
                onChange={(e) => changeAvatar(e.target.files[0])}
                accept="image/png, image/jpeg"
              />
            </div>
          </div>
          <form method="post" onSubmit={onSubmit}>
            <div className="content mt-5 ">
              <div className="flex flex-col mb-5 ">
                <label className="text-purple-900 text-lg ">Nama toko</label>
                <input
                  placeholder="Nama toko"
                  onChange={(e) => setUkmName(e.target.value)}
                  name="ukmName"
                  required
                  value={ukmName}
                  style={{
                    padding: `0.75rem 1.625rem`,
                    color: `#0C145A`,
                    maxWidth: `467px`,
                  }}
                  className=" mt-3 py-3 px-3 rounded-2xl outline-none border border-purple-900 focus:border-2  transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col mb-5 ">
              <label className="text-purple-900 text-lg ">Deskripsi toko</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi toko"
                required
                style={{
                  padding: `0.75rem 1.625rem`,
                  color: `#0C145A`,
                  maxWidth: `467px`,
                }}
                className=" mt-3 py-3 px-3 rounded-2xl outline-none border border-purple-900 focus:border-2  transition-all"
              />
            </div>
            <div className="flex flex-col mb-5 ">
              <label className="text-purple-900 text-lg ">Alamat</label>
              <span className="text-sm w-1/2 text-red-600">
                Pastikan alamat toko sama dengan alamat pengiriman
              </span>
              <div className="relative " style={{ maxWidth: `467px` }}>
                <input
                  placeholder="Masukan nama kecamatan "
                  style={{
                    padding: `0.75rem 1.625rem`,
                    color: `#0C145A`,
                    borderRadius: `20px 20px 20px 20px`,
                  }}
                  autoComplete="off"
                  onFocus={() => setSearchFocus(!SearchFocus)}
                  onBlur={() => setSearchFocus(!SearchFocus)}
                  onChange={handleSearch}
                  value={Search}
                  className=" w-full mt-3 py-3 px-3  outline-none border border-purple-900 focus:border-2  transition-all"
                />
                {Search.length >= 3 &&
                  (closeSearchBar ? (
                    ""
                  ) : (
                    <div
                      style={{ top: 80, borderRadius: "0 0 20px 20px" }}
                      className="bg-white flex flex-col py-2 px-4  outline-none  border-purple-900 border-2  transition-all"
                    >
                      <div className=" lg:max-h-40  overflow-auto flex flex-col">
                        {SearchResponse.isLoading
                          ? "loading..."
                          : SearchResponse?.data?.length > 0 &&
                            SearchResponse?.data?.map?.((item, index) => {
                              return (
                                <div
                                  onClick={() => autoFillAddress(item)}
                                  className="flex flex-row mb-1 hover:bg-gray-200 px-1 py-1 text-left"
                                >
                                  <span className="text-md text-gray-600 cursor-pointer">
                                    {item?.province_name},
                                  </span>
                                  <span className="text-md text-gray-600 cursor-pointer ml-1">
                                    {item?.city_name},
                                  </span>
                                  <span className="text-md text-gray-600 cursor-pointer ml-1 ">
                                    {item?.subdistrict_name}
                                  </span>
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col mb-5 ">
              <label className="text-purple-900 text-lg ">Provinsi</label>
              <input
                disabled
                required
                placeholder="Provinsi"
                value={province}
                style={{
                  padding: `0.75rem 1.625rem`,
                  color: `#0C145A`,
                  maxWidth: `467px`,
                }}
                className=" mt-3 py-3 px-3 rounded-2xl outline-none border border-purple-900 focus:border-2  transition-all"
              />
            </div>
            <div className="flex flex-col mb-5 ">
              <label className="text-purple-900 text-lg ">Kota</label>
              <input
                disabled
                placeholder="Kota"
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
                style={{
                  padding: `0.75rem 1.625rem`,
                  color: `#0C145A`,
                  maxWidth: `467px`,
                }}
                className=" mt-3 py-3 px-3 rounded-2xl outline-none border border-purple-900 focus:border-2  transition-all"
              />
            </div>
            <div className="flex flex-col mb-5 ">
              <label className="text-purple-900 text-lg ">Kecamatan</label>
              <input
                disabled
                placeholder="kecamatan"
                onChange={(e) => setSubDistrict(e.target.value)}
                value={subdistrict}
                style={{
                  padding: `0.75rem 1.625rem`,
                  color: `#0C145A`,
                  maxWidth: `467px`,
                }}
                className=" mt-3 py-3 px-3 rounded-2xl outline-none border border-purple-900 focus:border-2  transition-all"
              />
            </div>

            <div className="flex flex-col mb-5 ">
              <label className="text-purple-900 text-lg ">Kelurahan</label>
              <input
                placeholder="kelurahan"
                value={village}
                required
                onChange={(e) => setVillage(e.target.value)}
                style={{
                  padding: `0.75rem 1.625rem`,
                  color: `#0C145A`,
                  maxWidth: `467px`,
                }}
                className=" mt-3 py-3 px-3 rounded-2xl outline-none border border-purple-900 focus:border-2  transition-all"
              />
            </div>
            <div className="flex flex-col mb-5 ">
              <label className="text-purple-900 text-lg ">Postal code</label>
              <input
                placeholder="postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
                type="number"
                style={{
                  padding: `0.75rem 1.625rem`,
                  color: `#0C145A`,
                  maxWidth: `467px`,
                }}
                className=" mt-3 py-3 px-3 rounded-2xl outline-none border border-purple-900 focus:border-2  transition-all"
              />
            </div>
            <div className="flex flex-col mb-5 ">
              <label className="text-purple-900 text-lg ">Alamat Lengkap</label>
              <textarea
                placeholder="Alamat lengkap "
                value={ukmAddress}
                required
                onChange={(e) => setUkmAddress(e.target.value)}
                style={{
                  padding: `0.75rem 1.625rem`,
                  color: `#0C145A`,
                  maxWidth: `467px`,
                }}
                className=" mt-3 py-3 px-3 rounded-2xl outline-none border border-purple-900 focus:border-2  transition-all"
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: `#4D17E2`, width: `467px` }}
              className="py-3 px-3 bg-purple-900 text-white rounded-xl"
            >
              Simpan
            </button>
          </form>
        </div>
      </main>
    );
  else {
    return <span>loading ....</span>;
  }
}

export default StoreSetting;
