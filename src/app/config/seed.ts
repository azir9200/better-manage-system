import { ProductModel } from "../modules/product/product.model";

export const seedProducts = async () => {
    const products = [
            {
              "name": "Treadmill",
              "description": "High-quality treadmill for home use",
              "price": 899.99,
              "category": "Cardio Equipment",
              "stock": 20,
              "image": "https://i.ibb.co/Dtg75FD/risen-wang-20j-X9b35r-M-unsplash.jpg"
            },
            {
              "name": "Yoga Mat",
              "description": "Non-slip yoga mat for comfort and stability",
              "price": 39.99,
              "category": "Yoga & Pilates",
              "stock": 30,
              "image": "https://i.ibb.co/cbrq3yH/samuel-girven-VJ2s0c20q-Co-unsplash.jpg"
            },
            {
              "name": "Pilates Ring",
              "description": "Pilates ring for enhancing workouts",
              "price": 29.99,
              "category": "Yoga & Pilates",
              "stock": 22,
              "image": "https://i.ibb.co/Wg70XP1/alonso-reyes-0-Hl-I76m4jx-U-unsplash.jpg"
            },
            {
              "name": "Home Gym System",
              "description": "Compact home gym with multiple exercise options",
              "price": 1299.99,
              "category": "Home Gym Equipment",
              "stock": 10,
              "image": "https://i.ibb.co/R3gX2pb/victor-freitas-Kk-YWWpurqb-E-unsplash.jpg"
            },
            {
              "name": "Resistance Bands",
              "description": "Set of resistance bands for strength training",
              "price": 24.99,
              "category": "Home Gym Equipment",
              "stock": 35,
              "image": "https://i.ibb.co/j4CKmLT/danielle-cerullo-CQf-Nt66tt-ZM-unsplash.jpg"
            },
            {
              "name": "Bicycle",
              "description": "High-performance bicycle for outdoor rides",
              "price": 499.99,
              "category": "Outdoor Fitness",
              "stock": 12,
              "image": "https://i.ibb.co/1vZTBdn/oksana-taran-x-B4-Ex-Gc-Uai0-unsplash.jpg"
            },
            {
              "name": "Jump Rope",
              "description": "Durable jump rope for cardio exercises",
              "price": 19.99,
              "category": "Outdoor Fitness",
              "stock": 40,
              "image": "https://i.ibb.co/W3pYyjn/kike-vega-F2qh3yjz6-Jk-unsplash.jpg"
            },
            {
              "name": "Water Bottle",
              "description": "Insulated water bottle for keeping drinks cold",
              "price": 14.99,
              "category": "Fitness Accessories",
              "stock": 50,
              "image": "https://i.ibb.co/mb9QhPZ/alexander-redl-d3b-Ymn-Z0ank-unsplash.jpg"
            },
            {
              "name": "Workout Gloves",
              "description": "Adjustable workout gloves for better grip",
              "price": 18.99,
              "category": "Fitness Accessories",
              "stock": 28,
              "image": "https://i.ibb.co/QQngVgJ/john-arano-h4i9-G-de7-Po-unsplash.jpg"
            },
            {
              "name": "Leg Press Machine",
              "description": "Professional leg press machine for leg workouts",
              "price": 2299.99,
              "category": "Strength Machines",
              "stock": 8,
              "image": "https://i.ibb.co/zFSfXQ7/boxed-water-is-better-y-Tp-YAlc-BYM-unsplash.jpg"
            },
            {
              "name": "Smith Machine",
              "description": "Versatile smith machine for various exercises",
              "price": 1899.99,
              "category": "Strength Machines",
              "stock": 6,
              "image": "https://example.com/smith-machine.jpg"
            },
            {
              "name": "Smartwatch",
              "description": "Fitness smartwatch with heart rate monitor",
              "price": 249.99,
              "category": "Fitness Trackers",
              "stock": 20,
              "image": "https://example.com/smartwatch.jpg"
            },
            {
              "name": "Activity Tracker",
              "description": "Wearable activity tracker with GPS",
              "price": 149.99,
              "category": "Fitness Trackers",
              "stock": 25,
              "image": "https://example.com/activity-tracker.jpg"
            }        
    ];
    try {
        const operations = products.map(product => ({
            updateOne: {
                filter: { name: product.name }, // Use a unique field to identify duplicates (e.g., name)
                update: { $set: product },
                upsert: true // Insert the product if it doesn't exist
            }
        }));

        const result = await ProductModel.bulkWrite(operations);
        console.log('Products seeded successfully!!', result);
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};