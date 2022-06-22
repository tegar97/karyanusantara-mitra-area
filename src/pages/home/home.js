import React from 'react'
import Card from '../components/card/card';
import { useSelector } from "react-redux";
import { IoIosDoneAll } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Home() {
  const users = useSelector((state) => state.users);
  

  return (
    <main className="flex-grow wrapper min-h-screen py-12 px-12 ml-5">
      <div className="mt-5">
        <h1 className="text-4xl font-bold mb-30" style={{ color: "#0C145A" }}>
          Overview
        </h1>
        {users?.StoreSettingDone === 0 ||
        users?.GeneralInfomrationDone === 0 ||
        users?.documentSettingStatus === 0 ||
        users?.bankSettingStatus === 0 ? (
          <div className="flex flex-col">
            <div>
              <span>
                Harap lengkapi Dokumen ,informasi dan setting toko terlebih
                dahulu untuk mulai berjualan
              </span>
              <div className="mt-5 grid grid-cols-3 gap-5">
                <div className="bg-white shadow-md rounded-md py-4 px-4 flex justify-center flex-col items-center text-center">
                  <img src={``} />
                  <h2 className="text-gray-800 text-md">
                    Tambahkan info tentang ukm anda
                  </h2>
                  <span className="text-gray-400 text-sm">
                    Lengkapi informasi tentang ukm anda seperti nomor hp yang
                    bisa dihubungi, nama pemilik ukm,bentuk badan usaha dan info
                    lainya.
                  </span>
                  {users?.GeneralInfomrationDone === 0 ? (
                    <Link to="/general-setting">
                      <button className="bg-green-600 text-white mt-5  py-2 px-2 w-full">
                        Tambahkan info
                      </button>
                    </Link>
                  ) : (
                    <button className="bg-green-600 opacity-50 text-white mt-5  py-2 px-2 w-full">
                      Selesai
                    </button>
                  )}
                </div>
                <div className="bg-white shadow-md rounded-md py-4 px-4 flex justify-center flex-col items-center text-center">
                  <img src={``} />
                  <h2 className="text-gray-800 text-md">Upload Dokumen</h2>
                  <span className="text-gray-400 text-sm">
                    Lengkapi dokumen photo ktp dan npwn
                  </span>
                  {users?.documentSettingStatus === 0 ? (
                    <Link to="/general-setting">
                      <button className="bg-green-600 text-white mt-5  py-2 px-2 w-full">
                        Tambahkan Dokumen
                      </button>
                    </Link>
                  ) : (
                    <button className="bg-green-600 opacity-50 text-white mt-5  py-2 px-2 w-full">
                      Selesai
                    </button>
                  )}
                </div>
                <div className="bg-white shadow-md rounded-md py-4 px-4 flex justify-center flex-col items-center text-center">
                  <img src={``} />
                  <h2 className="text-gray-800 text-md">Masukan rekening</h2>
                  <span className="text-gray-400 text-sm">
                    Rekening ini digunakan untuk mentransfer uang penghasilan
                    anda
                  </span>
                  {users?.bankSettingStatus === 0 ? (
                    <Link to="/general-setting">
                      <button className="bg-green-600 text-white mt-5  py-2 px-2 w-full">
                        Tambahkan Rekening
                      </button>
                    </Link>
                  ) : (
                      <button className="bg-green-600  opacity-50 text-white mt-5  py-2 px-2 w-full">
                        Selesai
                      </button>
                  )}
                </div>
                <div className="bg-white shadow-md rounded-md py-4 px-4 flex justify-center flex-col items-center text-center">
                  <img src={``} />
                  <h2 className="text-gray-800 text-md">Setting Toko</h2>
                  <span className="text-gray-400 text-sm">
                    Setting alamat toko , deskripsi toko , photo toko
                  </span>
                  {users?.StoreSettingDone === 0 ? (
                    <Link to="/store-setting">
                      <button className="bg-green-600 text-white mt-5  py-2 px-2 w-full">
                        Setting Toko
                      </button>
                    </Link>
                  ) : (
                    <button className="bg-green-600 text-white mt-5  opacity-50 py-2 px-2 w-full">
                      Selesai
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 ">
            <Card title={"Total Produk"} value="0" />
            <Card title={"Total transaksi"} value="0" />
            <Card title={"Produk menunggu review"} value="0" />
          </div>
        )}
      </div>
    </main>
  );
}

export default Home