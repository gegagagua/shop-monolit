<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductsAndCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Categories (excluding 'ყველა' which is "All")
        $categories = [
            'ამწევი დანადგარები',
            'აქსესუარები და სახარჯი მასალები',
            'ბაღის ინსტრუმენები',
            'ბენზინის ხელსაწყოები',
            'ელექტრო ხელსაწყოები',
            'კომპოზიტური WPC პანელები',
            'მანქანის აღჭურვილობა',
            'პნევმატური ხელსაწყოები',
            'საზომი და სანიშნი ხელსაწყოები',
            'სანათები',
            'სხვადასხვა',
            'უსადენო ხელსაწყოები',
            'უსაფრთხოება და სპეცტანსაცმელი',
            'წყლის ტუმბოები',
            'ხელის ხელსაწყოები',
            'ხელსაწყოების შესანახი'
        ];

        // Create categories and store them in an array for reference
        $categoryMap = [];
        foreach ($categories as $categoryName) {
            $category = Category::firstOrCreate(
                ['name' => $categoryName],
                ['slug' => Str::slug($categoryName)]
            );
            $categoryMap[$categoryName] = $category->id;
        }

        // Helper function to get image URL (matching the JS logic)
        $getRandomImage = function ($seed) {
            $imageIds = [
                101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
                111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
                121, 122, 123, 124, 125, 126, 127, 128, 129, 130
            ];
            $imageId = $imageIds[$seed % count($imageIds)];
            return "https://picsum.photos/seed/{$imageId}/400/400";
        };

        // Products data
        $products = [
            ['name' => 'ელექტრო ბურღი Bosch GSB 16 RE', 'price' => 299, 'category' => 'ელექტრო ხელსაწყოები', 'seed' => 1, 'rating' => 5, 'sales' => 120, 'featured' => true],
            ['name' => 'კუთხსახეხი Makita 9557HN', 'price' => 189, 'category' => 'ელექტრო ხელსაწყოები', 'seed' => 2, 'rating' => 5, 'sales' => 89, 'featured' => true],
            ['name' => 'ჩაქუჩი Stanley STHT0-74328', 'price' => 45, 'category' => 'ხელის ხელსაწყოები', 'seed' => 3, 'rating' => 4, 'sales' => 156, 'featured' => false],
            ['name' => 'სახრახნისების ნაკრები Bosch 2607017218', 'price' => 89, 'category' => 'აქსესუარები და სახარჯი მასალები', 'seed' => 4, 'rating' => 4, 'sales' => 78, 'featured' => true],
            ['name' => 'ელექტრო ხერხი Black+Decker BES720', 'price' => 199, 'category' => 'ელექტრო ხელსაწყოები', 'seed' => 5, 'rating' => 5, 'sales' => 45, 'featured' => false],
            ['name' => 'ლაზერული საზომი Bosch GLM 50 C', 'price' => 399, 'category' => 'საზომი და სანიშნი ხელსაწყოები', 'seed' => 6, 'rating' => 5, 'sales' => 34, 'featured' => true],
            ['name' => 'სახელური ფანარი LED Fenix TK16', 'price' => 149, 'category' => 'სანათები', 'seed' => 7, 'rating' => 4, 'sales' => 112, 'featured' => false],
            ['name' => 'უსადენო ბურღი DeWalt DCD791D2', 'price' => 459, 'category' => 'უსადენო ხელსაწყოები', 'seed' => 8, 'rating' => 5, 'sales' => 67, 'featured' => true],
            ['name' => 'სათევზაო კალთა Shimano', 'price' => 179, 'category' => 'სხვადასხვა', 'seed' => 9, 'rating' => 4, 'sales' => 203, 'featured' => false],
            ['name' => 'სამღებრო პისტოლეტი Wagner W550', 'price' => 89, 'category' => 'ელექტრო ხელსაწყოები', 'seed' => 10, 'rating' => 5, 'sales' => 189, 'featured' => false],
            ['name' => 'წყლის ტუმბო Grundfos JP 6-60', 'price' => 299, 'category' => 'წყლის ტუმბოები', 'seed' => 11, 'rating' => 4, 'sales' => 56, 'featured' => false],
            ['name' => 'სათევზაო კარვი Coleman', 'price' => 249, 'category' => 'სხვადასხვა', 'seed' => 12, 'rating' => 4, 'sales' => 234, 'featured' => false],
            ['name' => 'ბენზინის ხერხი Stihl MS 180', 'price' => 399, 'category' => 'ბენზინის ხელსაწყოები', 'seed' => 13, 'rating' => 5, 'sales' => 45, 'featured' => true],
            ['name' => 'შედუღების აპარატი Weltek WT-200', 'price' => 599, 'category' => 'ელექტრო ხელსაწყოები', 'seed' => 14, 'rating' => 4, 'sales' => 32, 'featured' => false],
            ['name' => 'კომპრესორი Fiac AB 30/100', 'price' => 799, 'category' => 'პნევმატური ხელსაწყოები', 'seed' => 15, 'rating' => 5, 'sales' => 28, 'featured' => true],
            ['name' => 'სამუშაო ხელთათმანები 3M', 'price' => 35, 'category' => 'უსაფრთხოება და სპეცტანსაცმელი', 'seed' => 16, 'rating' => 4, 'sales' => 312, 'featured' => false],
            ['name' => 'საპრიალებელი მანქანა Bosch PSS 250 AE', 'price' => 179, 'category' => 'ელექტრო ხელსაწყოები', 'seed' => 17, 'rating' => 4, 'sales' => 67, 'featured' => false],
            ['name' => 'ბაღის საჭრელი Makita DUH523Z', 'price' => 289, 'category' => 'ბაღის ინსტრუმენები', 'seed' => 18, 'rating' => 5, 'sales' => 89, 'featured' => true],
            ['name' => 'ხელსაწყოების ყუთი Stanley 1-95-611', 'price' => 129, 'category' => 'ხელსაწყოების შესანახი', 'seed' => 19, 'rating' => 4, 'sales' => 156, 'featured' => false],
            ['name' => 'WPC პანელი 2500x200x25mm', 'price' => 89, 'category' => 'კომპოზიტური WPC პანელები', 'seed' => 20, 'rating' => 4, 'sales' => 78, 'featured' => false],
            ['name' => 'ავტო ლიფტი 2 ტონა', 'price' => 1299, 'category' => 'მანქანის აღჭურვილობა', 'seed' => 21, 'rating' => 5, 'sales' => 12, 'featured' => true],
            ['name' => 'ამწე 500 კგ', 'price' => 899, 'category' => 'ამწევი დანადგარები', 'seed' => 22, 'rating' => 4, 'sales' => 34, 'featured' => false],
            ['name' => 'სამიზნე ოპტიკური Vortex', 'price' => 549, 'category' => 'სხვადასხვა', 'seed' => 23, 'rating' => 5, 'sales' => 45, 'featured' => true],
            ['name' => 'ბიპოდი გამძლე', 'price' => 149, 'category' => 'სხვადასხვა', 'seed' => 24, 'rating' => 4, 'sales' => 67, 'featured' => false],
        ];

        // Create products
        foreach ($products as $productData) {
            $categoryId = $categoryMap[$productData['category']] ?? null;
            
            if ($categoryId) {
                Product::updateOrCreate(
                    ['name' => $productData['name']],
                    [
                        'price' => $productData['price'],
                        'category_id' => $categoryId,
                        'image' => $getRandomImage($productData['seed']),
                        'rating' => $productData['rating'],
                        'sales' => $productData['sales'],
                        'featured' => $productData['featured'],
                    ]
                );
            }
        }
    }
}
