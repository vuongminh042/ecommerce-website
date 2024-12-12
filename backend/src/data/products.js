export const products = [
  "Quần đùi bò",
  "Quần đùi cá",
  "Quần đùi gà",
  "Quần đùi vịt",
  "Quần đùi chó",
  "Quần đùi mèo",
  "Quần đùi lợn",
  "Quần đùi bò",
  "Áo khoác bò",
  "Áo khoác cá",
  "Áo khoác gà",
  "Áo khoác vịt",
  "Áo phông chó",
  "Áo phông mèo",
  "Áo phông lợn",
].map((item) => ({
  name: item,
  category: "",
  discount: 0,
  price: 2,
  variants: [
    {
      color: "",
      size: "",
      stock: 213,
      image:
        "https://firebasestorage.googleapis.com/v0/b/morata-a9eba.appspot.com/o/files%2Fcats.jpg%2F2024-11-14-12%3A14%3A13?alt=media&token=7dc50548-4560-4298-bc29-933113b75f5e",
      imageUrlRef: "files/cats.jpg/2024-11-14-12:14:13",
    },
    {
      color: "",
      size: "",
      stock: 0,
      image:
        "https://firebasestorage.googleapis.com/v0/b/morata-a9eba.appspot.com/o/files%2Fcats.jpg%2F2024-11-14-12%3A14%3A13?alt=media&token=7dc50548-4560-4298-bc29-933113b75f5e",
      imageUrlRef: "files/cats.jpg/2024-11-14-12:14:13",
    },
    {
      color: "",
      size: "",
      stock: 213,
      image:
        "https://firebasestorage.googleapis.com/v0/b/morata-a9eba.appspot.com/o/files%2Fcats.jpg%2F2024-11-14-12%3A14%3A13?alt=media&token=7dc50548-4560-4298-bc29-933113b75f5e",
      imageUrlRef: "files/cats.jpg/2024-11-14-12:14:13",
    },
  ],
  description: `Áo khoác dạ lông cừu cao cấp mang đến phong cách thanh lịch và ấm áp, phù hợp với mọi phong cách và hoàn cảnh.
    Với chất liệu mềm mại và thiết kế tinh tế, sản phẩm là lựa chọn hoàn hảo cho mùa đông này.
`,
  sold: 8,
  tags: [],
}));
