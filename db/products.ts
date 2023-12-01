import { IProduct } from "@/interfaces/interfaces";

export const products:IProduct[] = [
    {
      id: "64a654593e91b8e73a351e9b",
      name: "iphone 14",
      slug: "iphone_14",
      description: "Short description",
      price: 2999,
      brand: "apple",
      category: "phone",
      inStock: true,
      images: [
        {
          color: "black",
          colorCode: "#000",
          image:
            "/iphone-14-black.jpg",
        },
        {
          color: "silver",
          colorCode: "#E9EEF4",
          image:
          "/iphone-14-silver.png",
        },
        {
          color: "purple",
          colorCode: "#B953F3",
          image:
          "/iphone-14-purple.jpg",
        },
      ],
      reviews: [],
      status:true
    }
  ];