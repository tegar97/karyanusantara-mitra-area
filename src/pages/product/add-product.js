import React, { useEffect, useState } from "react";
import TextInput from "../components/input/input";
import SelectCategory from "../select-category/select-category";
import { getCategory } from "../../api/category";
import DragDrop from "../components/drop-image/drop-image";
import convertToRupiah from "../../utils/convertToRupiah";
import NumberFormat from "react-number-format";
import WeightFormat from "../components/weight-format/WeightFormat";
import { postProduct } from "../../api/product";
  import {toast } from "react-toastify";

import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddProduct({history}) {
  const photoMax = [1, 2, 3, 4, 5, 6, 7, 8];
  const [convertPrice, setConverPrice] = useState();
const [weightFormat, setWeightFormat] = useState('');
const [weightBeforeConvert, setWeightBeforeConvert] = useState('');
  
    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category_id: "",
    subcategory_id: "",
    price: "",
    description: "",
    minimumOrder: 1,
    stock: 1,
    sku: "",
    weight: "",
    isPreorder: false,
    isPreOrderTime: "0",
    length: "",
    width: "",
    height: "",
    diameter: "",
    status: 0,
  });
  const [images, setImages] = useState([]);
  const tempImages = [];
  const [categories, setCategories] = useState();
  useEffect(() => {
    const loadCategory = async () => {
      const response = await getCategory();
      setCategories(response);
    };
    loadCategory();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();


    const fd = new FormData();
    const imageUpload = [];

    if (formData.category_id === '' ||formData.subcategory_id === '') {
      return toast.error('kategori wajib di isi')
    }
    if (formData.description === '') {
      return toast.error('Deskripsi wajib di isi')
    }
    if (images.length <= 0 || images === '') {
            return toast.error("Gambar wajib diisi , minimal 1 gambar");

    }

    // for (let i = 0; i < images.length; i++) {
    //          formData.append("images[]", images[i]);

    // }
    // formData.append('images',images[0])
    console.log(images)
    images.forEach((images) => {
      fd.append("images[]", images);
    });
    const token = localStorage.getItem("token");

    // );
    // for (const key of Object.keys(images)) {
    //   console.log(images[key].name);
    //   fd.append("images", images[key],images[key].name);
    // }
    await postProduct(formData, `Bearer ${token}`).then( async (res) => {
      await axios.post(`/product/image?id=${res.data.id}`, fd)
        
      navigate("/");
      toast.success("Prdouk telah ditambahkan dan akan di review");
     


    });
     
    
  }

  const weightConvert = (value) => {
    setWeightBeforeConvert(value)
      if (weightFormat === "kg") {
        const finalWeight = value * 1000;
        setFormData({ ...formData, weight: finalWeight });
      } else {
        
                setFormData({ ...formData, weight: value });

      } 
  }

  return (
    <div className=" min-h-screen px-24 py-10 w-full container-box">
      <form method="POST" onSubmit={onSubmit} encType="multipart/form-data">
        <h1 className="font-semibold text-gray-800 text-xl">Tambah Produk</h1>
        <div className="w-full bg-white  rounded-md mt-5 shadow-card px-5 py-5">
          <h2 className="font-semibold text-lg text-gray-700">
            Informasi Produk
          </h2>

          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">Nama Produk</h2>
              <span
                className="text-sm text-gray-600"
                style={{ fontSize: "0.857143rem" }}
              >
                Cantumkan nama produk dengan jelas agar mudah di jangkau pembeli
              </span>
            </div>
            <div className="col-span-3 ml-20 relative">
              <input
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder={"Masker kain 3 lapis"}
                name={formData.name}
                required
                value={formData.name}
                maxLength="60"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
              {
                <span className="absolute right-0 bottom-0 ">
                  {formData.name.length}/60
                </span>
              }
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">
                Kategori Produk
              </h2>
            </div>
            <div className="col-span-3 ml-20">
              <SelectCategory
                formData={formData}
                setFormData={setFormData}
                categories={categories}
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">Merek Produk</h2>
            </div>
            <div className="col-span-3 ml-20">
              <input
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder={"Merek Brand"}
                name={formData.brand}
                value={formData.brand}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    brand: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">
                Deskripsi Produk
              </h2>
              <span
                className="text-sm text-gray-600"
                style={{ fontSize: "0.857143rem" }}
              >
                Deskripsi memuat penjelasan produk , spefikasi produk dan bahan
                bahan produk dan lainya.
              </span>
            </div>
            <div className="col-span-3 ml-20">
              <textarea
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={13}
                value={formData.description}
                name={formData.description}
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder="Masker bedah yang berfungsi sebagai pelindung dari partikel debu, droplet, bakteri, hingga virus yang sudah memiliki izin edar dari Kementrian Kesehatan.
            &nbsp;
            &nbsp;
            &#32;
            ----
            
             &#10;
              &#10;Spefikasi Produk   
            - Sekali Pakai
            - Effective Protection
            - Stretchable Ellastic Ear Loops
            - Comfotable Material
            - 50 pcs/Box
             ----
            Bahan / Material:         
            - Non woven
            - Meltblown
            - Nose piece


            
•
                          "
              />
            </div>
          </div>
        </div>
        <div className="mt-5 w-full bg-white  rounded-md  shadow-card px-5 py-5">
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">Photo Produk</h2>
              <span
                className="text-sm text-gray-600"
                style={{ fontSize: "0.857143rem" }}
              >
                Format gambar .jpg .jpeg .png dan ukuran minimum 700x700
              </span>
            </div>
            <div className="col-span-3 ml-20 relative">
              <div className="grid grid-cols-5 gap-5">
                {photoMax.map((data, key) => {
                  return (
                    <DragDrop
                      data={data}
                      setImages={setImages}
                      images={images}
                      tempImages={tempImages}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full bg-white  rounded-md  shadow-card px-5 py-5">
          <h2 className="font-semibold text-lg text-gray-700">Harga</h2>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">
                Minimal Pembelian
              </h2>
              <span
                className="text-sm text-gray-600"
                style={{ fontSize: "0.857143rem" }}
              >
                Atur jumlah minimum yang harus dibeli untuk produk ini.
              </span>
            </div>
            <div className="col-span-3 ml-20 relative">
              <input
                defaultValue={1}
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder={"1"}
                name={formData.minimumOrder}
                value={formData.minimumOrder}
                maxLength="5"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minimumOrder: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">Harga satuan</h2>
            </div>
            <div className="col-span-3 ml-20 relative">
              <div className="relative flex justify-center items-center text-center">
                <div
                  style={{ backgroundColor: "#F3F4F5" }}
                  className="absolute top-0 left-0 w-10 justify-center   rounded-md h-full text-center flex items-center"
                >
                  <span className="text-gray-700">Rp</span>
                </div>
                <NumberFormat
                  className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  px-12 focus:outline-none border-gray-300 w-full py-2 rounded-md  focus:border-blue-100"
                  value={convertPrice}
                  allowNegative={false}
                  decimalSeparator={"."}
                  thousandSeparator={true}
                  required
                  maxLength={15}
                  onValueChange={(values, sourceInfo) => {
                    console.log(values);
                    const { formattedValue, value } = values;
                    setConverPrice(formattedValue);
                    setFormData({ ...formData, price: value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full bg-white  rounded-md  shadow-card px-5 py-5">
          <h2 className="font-semibold text-lg text-gray-700">
            Pengelolaan Produk
          </h2>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">Stock</h2>
            </div>
            <div className="col-span-3 ml-20 relative">
              <input
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder={"1"}
                name={formData.stock}
                value={formData.stock}
                maxLength="10"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">
                SKU (Stock Keeping Unit)
              </h2>
              <span
                className="text-sm text-gray-600"
                style={{ fontSize: "0.857143rem" }}
              >
                SKU Bersifat opsional dan bersifat kode unik ,berfungsi untuk
                menandai produk agar
              </span>
            </div>
            <div className="col-span-3 ml-20 relative">
              <input
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder={"K-912412"}
                name={formData.sku}
                value={formData.sku}
                maxLength="10"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sku: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-5 w-full bg-white  rounded-md  shadow-card px-5 py-5">
          <h2 className="font-semibold text-lg text-gray-700">
            Pengelolaan Produk
          </h2>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">Berat Produk</h2>
              <span
                className="text-sm text-gray-600"
                style={{ fontSize: "0.857143rem" }}
              >
                Masukkan berat dengan menimbang produk setelah dikemas.
              </span>
            </div>

            <div className="col-span-3 ml-20 relative">
              <div className="grid grid-cols-3  gap-5">
                <WeightFormat
                  setWeightFormat={setWeightFormat}
                  weightFormat={weightFormat}
                />
                <input
                  className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                  placeholder={"100"}
                  name={weightBeforeConvert}
                  value={weightBeforeConvert}
                  maxLength="10"
                  onChange={(e) => weightConvert(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">
                Ukuran Produk (setelah dikemas)
              </h2>
              
            </div>
            <div className="col-span-3 grid gap-5  grid-cols-4  ml-20">
              <input
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder={"Panjang  (cm)"}
                name={formData.length}
                value={formData.length}
                required
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    length: e.target.value,
                  })
                }
              />
              <input
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder={"Lebar  (cm)"}
                name={formData.width}
                value={formData.width}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    width: e.target.value,
                  })
                }
              />
              <input
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder={"Tinggi (cm)"}
                name={formData.height}
                value={formData.height}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: e.target.value,
                  })
                }
              />
              <input
                className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                placeholder={"Diameter (cm)"}
                name={formData.diameter}
                value={formData.diameter}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    diameter: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">Pengiriman</h2>
              <span
                className="text-sm text-gray-600"
                style={{ fontSize: "0.857143rem" }}
              >
                Untuk metode pengiriman setting di{" "}
                <span className="text-blue-100 cursor-pointer">
                  Pengaturan Pengiriman
                </span>
              </span>
            </div>
            <div className="col-span-3 ml-20 relative">
              <div className="flex flex-row"></div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">Preorder</h2>
            </div>
            <div className="col-span-3 ml-20 relative">
              <div className="flex flex-row items-center">
                <label class="switch">
                  <input
                    name={formData.isPreorder}
                    value={formData.isPreorder}
                    onChange={(e) =>
                      setFormData({ ...formData, isPreorder: e.target.checked })
                    }
                    type="checkbox"
                  />
                  <span class="slider round"></span>
                </label>
                <span className="text-sm text-gray-600 ml-5">
                  Aktifkan preorder jika memerlukan waktu yang lama untuk
                  memproses barang
                </span>
              </div>
              {formData.isPreorder && (
                <div className="mt-5">
                  <div className="mb-2">
                    <input
                      className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
                      placeholder={"Masukan waktu proses (dalam bentuk hari)"}
                      name={formData.isPreOrderTime}
                      value={formData.isPreOrderTime}
                      maxLength="2"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isPreOrderTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <span className="text-gray-600">Maximal 90 hari</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-5">
          <button
            type="submit"
            className="self-end px-5 py-2  bg-blue-100 rounded-md  text-white"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
