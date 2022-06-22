import React, { useState, useEffect } from "react";
import useForm from "../../../helpers/hook/useForm";
import InputGroup from "../../components/input-group/input-group";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { businessSetting, npwpNomerApi, addNpwpPhotoApi,addKtpPhotoApi, addBankApi } from "../../../api/umkm";
import { toast } from "react-toastify";

function GeneralSetting() {
  const [startDate, setStartDate] = useState(new Date());
  const users = useSelector((state) => state.users);
  const [isMemberUkm, setIsMemberUkm] = useState();
  const [npwpPhoto, seNpwpPhoto] = useState();
  const [ktpPhoto, setKtpPhoto] = useState();
  const [bankData, setBankData] = useState({
    bankAccountNumber: "",
    bankAccountName: "",
    bankAccountType: "",
  });

  console.log(users);

  const [formData, setFormData] = useState({
    ownerName: "",
    BussinessFormType: "",
    ownerPhoneNumber: "",
    businessStart: "",
    totalEmployee: "",
    isInterestedToJoinUmkmid: "",
    annualIncome: "",
    certificateName: "",
    certificate: "",
  });

  const [documentData, setDocumentData] = useState({
    npwpNo: "",

  })

  useEffect(() => {
    setFormData({
      ...formData,
      ownerName: users?.ownerName,
      businessStart: users?.businessStart,
      BussinessFormType: users?.BussinessFormType,
      ownerPhoneNumber: users?.ownerPhoneNumber,
      certificateName: users?.certificateName,
      certificate: users?.certificate,

      totalEmployee: users?.totalEmployee,
      annualIncome: users?.annualIncome,
      isInterestedToJoinUmkmid: users?.isInterestedToJoinUmkmid,
    });
    setDocumentData({
      ...documentData,
      npwpNo: users?.npwp_no,
    });
    setBankData({
      bankAccountName: users?.bankAccountName,
      bankAccountNumber: users?.bankAccountNumber,
      bankAccountType : users?.bankAccountType
    })
  }, [users]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    const response = await businessSetting(formData, bearer);

    if (response.error === false) {
      toast.success("berhasil update data");
    }
  };

  const submitDocument = async (e) => {
    e.preventDefault()
       const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    

    const data = {
      npwp_no : documentData.npwpNo
    }
    const response = await npwpNomerApi(data, bearer);

    if (response.error === false) {
      const formDataNpwp = new FormData();
      formDataNpwp.append("npwp_photo",npwpPhoto);
      const addNpwpPhoto = await addNpwpPhotoApi(formDataNpwp, bearer);
      
      if (addNpwpPhoto.error === false) {
           const formDataKtp = new FormData();
           formDataKtp.append("ktp_photo", ktpPhoto);
        await addKtpPhotoApi(formDataKtp, bearer);
        toast.success('Dokumen berhasil ditambahkan')
      }
    }
  }

  const addBank = async (e) => {
      const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    e.preventDefault();
    
    const response = await addBankApi(bankData, bearer)
    
    if (response.error === false) {
      toast.success('Sukses menambahkan data rekening')
    }
  }

  return (
    <main className="flex-grow wrapper min-h-screen py-12 px-12 ml-5">
      <div className="mt-5">
        <h1 className="text-4xl font-bold " style={{ color: "#0C145A" }}>
           Setting 
        </h1>
        <div className="bg-white shadow-md w-full rounded-md  py-10 mt-10 px-5">
          <div className="py-2 border-b border-gray-200">
            <spa className="text-xl text-gray-600">Data Pribadi</spa>
          </div>
          <form method="post" onSubmit={onSubmit} className="content mt-5">
            <InputGroup
              label={"Nama Pemilik Ukm"}
              name={"ownerName"}
              type="text"
              value={formData.ownerName}
              setState={(e) =>
                setFormData({ ...formData, ownerName: e.target.value })
              }
            />
            <InputGroup
              label={"Nomor Telepon Pemilik ukm"}
              name={"ownerPhoneNumber"}
              value={formData.ownerPhoneNumber}
              setState={(e) =>
                setFormData({ ...formData, ownerPhoneNumber: e.target.value })
              }
              type="number"
            />
            <InputGroup
              label={"Tanggal mulai usaha"}
              name={"businessStart"}
              value={formData.businessStart}
              setState={(e) =>
                setFormData({ ...formData, businessStart: e.target.value })
              }
              type="date"
            />

            <InputGroup
              label={"Total karyawan"}
              name={"totalEmployee"}
              value={formData.totalEmployee}
              setState={(e) =>
                setFormData({ ...formData, totalEmployee: e.target.value })
              }
              type="number"
            />
            <InputGroup
              label={"Bentuk badan usaha"}
              name={"BussinessFormType"}
              value={formData.BussinessFormType}
              setState={(e) =>
                setFormData({ ...formData, BussinessFormType: e.target.value })
              }
              isSelectInput={true}
            >
              <option value="">Pilih bentuk badan usaha</option>
              <option value="Firma">Firma</option>
              <option value="persekutuan">Persekutuan</option>
              <option value="Koperasi terbatas">Koperasi Terbatas</option>
              <option value="yayasan">yayasan</option>
            </InputGroup>
            <InputGroup
              label={"Omset pertahun"}
              name={"annualIncome"}
              value={formData.annualIncome}
              setState={(e) =>
                setFormData({ ...formData, annualIncome: e.target.value })
              }
              isSelectInput={true}
            >
              <option value="">Omset pertahun</option>
              <option value="a">
                Hasil penjualan \ omset maximal Rp 300.000.000 setahun
              </option>
              <option value="b">
                Hasil penjualan \ omset maximal Rp 300.000.000 - Rp
                2.500.000.000 setahun
              </option>
              <option value="c">
                Hasil penjualan \ omset maximal Rp 2.500.000.000 setahun -
                Rp.50.000.000.0000
              </option>
            </InputGroup>
            <InputGroup
              label={"Sertifikat "}
              name={"certificateName"}
              value={formData.certificateName}
              setState={(e) =>
                setFormData({ ...formData, certificateName: e.target.value })
              }
              type="text"
              placeholder={"Contoh sertifikat halal"}
            />
            <InputGroup
              label={"Nomor sertifikat "}
              name={"certificateNumber"}
              value={formData.certificate}
              setState={(e) =>
                setFormData({ ...formData, certificate: e.target.value })
              }
            />
            {/* <div className="mt-5 grid grid-cols-4 items-center ">
              <span className="text-md text-gray-600">
                {isMemberUkm == null ? (
                  <span>Member ukm indonesia ?</span>
                ) : (
                  <span>
                    Apakah tertarik untuk bergabung dengan ukm indonesia ?{" "}
                  </span>
                )}
              </span>
              <div className="col-span-3">
                {formData.isInterestedToJoinUmkmid === null ? (
                  <div className="grid grid-cols-2 gap-5">
                    <button
                      className="border border-purple-900"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          isInterestedToJoinUmkmid: 1,
                        })
                      }
                    >
                      Ya
                    </button>
                    <button
                      className="border border-purple-900"
                      onClick={() => setIsMemberUkm(false)}
                    >
                      Tidak
                    </button>
                  </div>
                ) : formData.isInterestedToJoinUmkmid === 1 ? (
                  <div className="w-full">
                    <span>Ya,saya member ukm indonesia</span>
                  </div>
                ) : (
                  <div className="w-full">
                    <span>Saya tertarik bergabung dengan ukm indonesia</span>
                  </div>
                )}
              </div>
            </div> */}
            <div className="flex justify-end  mt-5">
              <button
                type="submit"
                className="py-2 px-4 text-white rounded-md hover:opacity-80"
                style={{ backgroundColor: "#4D17E2" }}
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow-md w-full rounded-md  py-10 mt-10 px-5">
          <div className="py-2 border-b border-gray-200">
            <span className="text-xl text-gray-600">Dokumen</span>
          </div>

          <form onSubmit={submitDocument}>
            <InputGroup
              label={"Nomor NPWP "}
              name={"npwpNomer"}
              type="text"
              value={documentData.npwpNo}
              setState={(e) =>
                setDocumentData({ ...documentData, npwpNo: e.target.value })
              }
            />
            <InputGroup
              label={"Photo NPWP "}
              name={"photoNPWP"}
              type="file"
              setState={(e) => seNpwpPhoto(e.target.files[0])}
            />
            <InputGroup
              label={"Photo KTP "}
              name={"ktp"}
              type="file"
              setState={(e) => setKtpPhoto(e.target.files[0])}
            />
            <div className="flex justify-end  mt-5">
              <button
                type="submit"
                className="py-2 px-4 text-white rounded-md hover:opacity-80"
                style={{ backgroundColor: "#4D17E2" }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md w-full rounded-md  py-10 mt-10 px-5">
          <div className="py-2 border-b border-gray-200">
            <spa className="text-xl text-gray-600">Rekening</spa>
          </div>
          <form method="post" onSubmit={addBank} className="content mt-5">
            <InputGroup
              label={"Nomor rekening Bank"}
              name={"bannkNumber"}
              type="number"
              value={bankData.bankAccountNumber}
              setState={(e) =>
                setBankData({ ...bankData, bankAccountNumber: e.target.value })
              }
            />
            <InputGroup
              label={"Nama Pemilik rekening"}
              name={"bankName"}
              type="text"
              value={bankData.bankAccountName}
              setState={(e) =>
                setBankData({ ...bankData, bankAccountName: e.target.value })
              }
            />
            <InputGroup
              label={"Nama perusahaan Bank"}
              name={"bankAccountType"}
              type="text"
              placeholder={"Contoh : Bank Mandiri,Bank BCA"}
              value={bankData.bankAccountType}
              setState={(e) =>
                setBankData({ ...bankData, bankAccountType: e.target.value })
              }
            />
          <div className="flex justify-end  mt-5">
            <button
              type="submit"
              className="py-2 px-4 text-white rounded-md hover:opacity-80"
              style={{ backgroundColor: "#4D17E2" }}
            >
              Save
            </button>
          </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default GeneralSetting;
