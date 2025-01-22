// list of coffees
export default [
  {
    id: 1,
    name: "Cappuccino",
    image: require("../../assets/coffees/capucinno.jpeg"),
    price: "18.000",
    description:
      "Espresso dicampur dengan susu panas dan busa susu, dengan perbandingan seimbang.",
    categoryId: 1,
    rating: 4.5,
    included: "With Oat milk",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Espresso",
    image: require("../../assets/coffees/espresso.jpeg"),
    price: "20.000",
    description:
      "Kopi pekat yang diseduh dengan tekanan tinggi, dasar dari banyak minuman kopi lainnya.",
    categoryId: 1,
    rating: 4.5,
    included: "With Oat milk",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Latte",
    image: require("../../assets/coffees/latte.jpg"),
    price: "23.000",
    description:
      "Espresso dengan susu panas dan sedikit busa susu di atasnya, lebih ringan dibanding cappuccino.",
    categoryId: 1,
    rating: 4.5,
    included: "With Oat milk",
    isFavorite: false,
  },
  {
    id: 4,
    name: "Flat White",
    image: require("../../assets/coffees/flat.jpeg"),
    price: "20.000",
    description:
      "Espresso dengan susu panas dan busa halus, lebih sedikit busa dibanding latte.",
    categoryId: 1,
    rating: 4.5,
    included: "With Oat milk",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Americano",
    image: require("../../assets/coffees/americano.webp"),
    price: "20.000",
    description:
      "Espresso dengan tambahan air panas, menciptakan rasa yang lebih ringan.",
    categoryId: 1,
    rating: 4.5,
    included: "With Oat milk",
    isFavorite: false,
  },
  {
    id: 6,
    name: "Mocha",
    image: require("../../assets/coffees/mocha.jpeg"),
    price: "25.000",
    description:
      "Latte dengan tambahan cokelat, sering disajikan dengan krim kocok di atasnya.",
    categoryId: 1,
    rating: 4.5,
    included: "With Oat milk",
    isFavorite: false,
  },
  {
    id: 7,
    name: "Affogato",
    image: require("../../assets/coffees/affogato.jpg"),
    price: "25.000",
    description:
      "Espresso dituangkan di atas es krim vanila, perpaduan antara kopi panas dan es krim dingin.",
    categoryId: 1,
    rating: 4.5,
    included: "With Oat milk",
    isFavorite: false,
  },
  {
    id: 8,
    name: "Cartodo",
    image: require("../../assets/coffees/cartodo.jpg"),
    price: "20.000",
    description:
      "Espresso dengan sedikit susu panas dalam perbandingan yang hampir sama.",
    categoryId: 1,
    rating: 4.5,
    included: "With Oat milk",
    isFavorite: false,
  },

  // Kopi Dingin
  {
    id: 9,
    name: "Cold Brew",
    image: require("../../assets/coffees/coldbrew.jpeg"),
    price: "28.000",
    description:
      "Kopi yang diseduh dengan air dingin dalam waktu lama, menghasilkan rasa halus dan tidak terlalu asam.",
    categoryId: 2,
    rating: 4.7,
    included: "With Ice",
    isFavorite: false,
  },
  {
    id: 10,
    name: "Iced Coffee",
    image: require("../../assets/coffees/icedcoffe.jpeg"),
    price: "22.000",
    description:
      "Kopi panas yang didinginkan dan disajikan dengan es batu.",
    categoryId: 2,
    rating: 4.3,
    included: "With Ice",
    isFavorite: false,
  },

  // Specialty Kopi
  {
    id: 11,
    name: "Nitro Coffee",
    image: require("../../assets/coffees/nitro.jpeg"),
    price: "30.000",
    description:
      "Cold brew yang disajikan dengan gas nitrogen, memberikan tekstur yang creamy dan rasa halus.",
    categoryId: 3,
    rating: 5.0,
    included: "Nitrogen Infused",
    isFavorite: false,
  },
  {
    id: 12,
    name: "Turkish Coffee",
    image: require("../../assets/coffees/turkish-coffee.jpg"),
    price: "30.000",
    description:
      "Kopi diseduh dengan cara tradisional menggunakan air mendidih dalam pot kecil (cezve), beraroma kuat dan kental.",
    categoryId: 3,
    rating: 4.6,
    included: "With Sugar Optional",
    isFavorite: false,
  },

  // Non-Kopi
  {
    id: 13,
    name: "Chai Latte",
    image: require("../../assets/coffees/chai.jpeg"),
    price: "20.000",
    description:
      "Teh chai dengan susu panas dan sedikit busa susu, memberikan rasa rempah yang khas.",
    categoryId: 4,
    rating: 4.4,
    included: "With Spices",
    isFavorite: false,
  },
  {
    id: 14,
    name: "Matcha Latte",
    image: require("../../assets/coffees/macha.jpeg"),
    price: "25.000",
    description:
      "Teh hijau matcha dengan susu panas, memberi rasa ringan dan creamy.",
    categoryId: 4,
    rating: 4.6,
    included: "With Green Tea",
    isFavorite: false,
  },
  {
    id: 15,
    name: "Hot Chocolate",
    image: require("../../assets/coffees/hotcoklat.jpeg"),
    price: "18.000",
    description:
      "Minuman cokelat panas, sering disajikan dengan krim kocok di atasnya.",
    categoryId: 4,
    rating: 4.7,
    included: "With Whipped Cream",
    isFavorite: false,
  },
  {
    id: 16,
    name: "Golden Milk",
    image: require("../../assets/coffees/goldmilk.jpeg"),
    price: "28.000",
    description:
      "Minuman susu dengan tambahan kunyit, madu, dan rempah-rempah, menawarkan rasa hangat dan menenangkan.",
    categoryId: 4,
    rating: 4.5,
    included: "With Turmeric",
    isFavorite: false,
  },
];
