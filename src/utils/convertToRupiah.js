export default function convertToRupiah(angka) {
  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";

  if (angka === NaN) {
    return "Rp. 0";
  } else {
    return (
      "Rp. " +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  }
}
