import { Product, ProductCategory, CardSubcategory } from '../types';

// Helper function to generate image paths based on product ID
// Update your getProductImagePath function to return an array of images
// Update your getProductImagePath function to use the 1-f, 1-b naming convention
const getProductImagePath = (id: string): string[] => {
  return [
    `/assets/images/products/${id}-f.jpg`,
    `/assets/images/products/${id}-b.jpg`
  ];
};

// Make sure your Product type has an images array instead of a single image
// Update your product data to include multiple images per product

export const products: Product[] = [
  {
    id: '1',
    name: 'Cristiano Ronaldo Silver - Matchwinner Manchester United',
    description: 'Cristiano Ronaldo Manchester United Matchwinner Silver card from Topps Match Attax 22/23',
    price:200,
    images: getProductImagePath('1'),
    category: 'Cards',
    subcategory: 'Match Attax/ Football Cards',
    condition: 'Mint',
    edition: '2022/23',
    // rarity: 'Rare', - removed
    year: '2022/23',
    isFeatured: true,
    isSold: false
  },
  {
    id: '2',
    name: 'Slam Attax TNF Indian LE',
    description: 'Slam Attax TNF (2015 edition) Indian Limited Edition of Triple H def. The Rock',
    price:500,
    images: getProductImagePath('2'),
    category: 'Cards',
    subcategory: 'Slam Attax/WWE Cards',
    condition: 'Near Mint',
    edition: '2015/TNF Edition',
    // rarity: 'Rare', - removed
    year: '2015',
    isFeatured: true,
    isSold: false
  },
  // {
  //   id: '2',
  //   name: 'Cricket Attax Virat Kohli Signature Card',
  //   description: 'Rare signature card featuring Indian cricket legend Virat Kohli. This card includes authentic statistics and a special foil background. One of only 500 ever printed in this special edition.',
  //   price: 45.99,
  //   images: getProductImagePath('2'),
  //   category: 'Cards',
  //   subcategory: 'Cricket Attax/Cricket Cards',
  //   condition: 'Mint',
  //   edition: '2018 Indian Premier League Edition',
  //   rarity: 'Ultra Rare',
  //   year: '2018',
  //   isFeatured: true,
  //   isSold: false
  // },
  // {
  //   id: '3',
  //   name: 'Hero Attax - Avengers Endgame Thor (Limited Edition)',
  //   description: 'Special limited edition Thor card from the Avengers Endgame Hero Attax collection. Features Thor with Stormbreaker and unique holographic background.',
  //   price: 18.50,
  //   images: getProductImagePath('3'),
  //   category: 'Cards',
  //   subcategory: 'Hero Attax/Superhero Cards',
  //   condition: 'Excellent',
  //   edition: 'Endgame Collection',
  //   rarity: 'Limited Edition',
  //   year: '2019',
  //   isFeatured: true,
  //   isSold: false
  // },
  // {
  //   id: '4',
  //   name: 'Amazing Spider-Man #300 - First Venom Appearance',
  //   description: 'Amazing Spider-Man #300 featuring the first full appearance of Venom. This is a key issue in excellent condition with vibrant colors and minimal edge wear.',
  //   price: 899.99,
  //   images: getProductImagePath('4'),
  //   category: 'Comics',
  //   condition: 'Excellent',
  //   edition: 'First Print',
  //   rarity: 'Key Issue',
  //   year: '1988',
  //   isFeatured: true,
  //   isSold: false
  // },
  // {
  //   id: '5',
  //   name: 'Trump Cards - Exotic Cars Collection (Complete Set)',
  //   description: 'Complete set of 32 Exotic Cars Trump Cards featuring detailed specifications and beautiful illustrations of the world\'s most exotic supercars.',
  //   price: 24.99,
  //   images: getProductImagePath('5'),
  //   category: 'Cards',
  //   subcategory: 'Trump Cards',
  //   condition: 'Near Mint',
  //   edition: 'First Edition',
  //   year: '2015',
  //   isFeatured: false,
  //   isSold: false
  // },
  // {
  //   id: '6',
  //   name: 'DC Comics Batman #423 - Classic Cover',
  //   description: 'Iconic Batman #423 with the famous cover by Todd McFarlane. This issue features a classic Batman story and has become a collector\'s favorite due to its stunning cover art.',
  //   price: 120.00,
  //   images: getProductImagePath('6'),
  //   category: 'Comics',
  //   condition: 'Good',
  //   edition: 'Original',
  //   year: '1988',
  //   isFeatured: false,
  //   isSold: false
  // },
  // {
  //   id: '7',
  //   name: 'Iron Man Mark III Action Figure (Limited Edition)',
  //   description: 'Limited edition Iron Man Mark III 10" action figure with light-up features, multiple interchangeable parts, and die-cast metal components.',
  //   price: 149.99,
  //   images: getProductImagePath('7'),
  //   category: 'Figures',
  //   condition: 'Mint',
  //   edition: 'Collector\'s Edition',
  //   rarity: 'Limited Run',
  //   year: '2013',
  //   isFeatured: true,
  //   isSold: false
  // },
  // {
  //   id: '8',
  //   name: 'Cricket Attax MS Dhoni Captain Card',
  //   description: 'Special edition Captain Card featuring MS Dhoni from the 2011 World Cup Cricket Attax collection. Features enhanced stats and special gold foil design.',
  //   price: 39.99,
  //   images: getProductImagePath('8'),
  //   category: 'Cards',
  //   subcategory: 'Cricket Attax/Cricket Cards',
  //   condition: 'Near Mint',
  //   edition: '2011 World Cup Edition',
  //   rarity: 'Rare',
  //   year: '2011',
  //   isFeatured: false,
  //   isSold: false
  // }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category && !product.isSold);
};

export const getProductsBySubcategory = (subcategory: CardSubcategory): Product[] => {
  return products.filter(product => product.subcategory === subcategory && !product.isSold);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured && !product.isSold);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => {
    return (
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(lowercaseQuery))
      // (product.rarity && product.rarity.toLowerCase().includes(lowercaseQuery)) - removed
    ) && !product.isSold;
  });
};

export const markProductAsSold = (id: string): void => {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    products[productIndex].isSold = true;
  }
};

export const markProductAsAvailable = (id: string): void => {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    products[productIndex].isSold = false;
  }
};
