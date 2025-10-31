import { ref } from 'vue';

// Categories list
const categories = [
    'ყველა',
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

// Helper function to get random image from Unsplash
const getRandomImage = (searchTerm, seed) => {
    const seeds = ['tools', 'drill', 'wrench', 'hammer', 'saw', 'screwdriver', 'measure', 'light', 'safety', 'pump'];
    const term = searchTerm || seeds[seed % seeds.length];
    return `https://source.unsplash.com/400x400/?${term}&sig=${seed}`;
};

// Mock products data with tool categories
const mockProducts = [
    { id: 1, name: 'ელექტრო ბურღი Bosch GSB 16 RE', price: 299, category: 'ელექტრო ხელსაწყოები', image: getRandomImage('drill', 1), rating: 5, sales: 120, featured: true },
    { id: 2, name: 'კუთხსახეხი Makita 9557HN', price: 189, category: 'ელექტრო ხელსაწყოები', image: getRandomImage('grinder', 2), rating: 5, sales: 89, featured: true },
    { id: 3, name: 'ჩაქუჩი Stanley STHT0-74328', price: 45, category: 'ხელის ხელსაწყოები', image: getRandomImage('hammer', 3), rating: 4, sales: 156, featured: false },
    { id: 4, name: 'სახრახნისების ნაკრები Bosch 2607017218', price: 89, category: 'აქსესუარები და სახარჯი მასალები', image: getRandomImage('screwdriver', 4), rating: 4, sales: 78, featured: true },
    { id: 5, name: 'ელექტრო ხერხი Black+Decker BES720', price: 199, category: 'ელექტრო ხელსაწყოები', image: getRandomImage('saw', 5), rating: 5, sales: 45, featured: false },
    { id: 6, name: 'ლაზერული საზომი Bosch GLM 50 C', price: 399, category: 'საზომი და სანიშნი ხელსაწყოები', image: getRandomImage('measure', 6), rating: 5, sales: 34, featured: true },
    { id: 7, name: 'სახელური ფანარი LED Fenix TK16', price: 149, category: 'სანათები', image: getRandomImage('light', 7), rating: 4, sales: 112, featured: false },
    { id: 8, name: 'უსადენო ბურღი DeWalt DCD791D2', price: 459, category: 'უსადენო ხელსაწყოები', image: getRandomImage('drill', 8), rating: 5, sales: 67, featured: true },
    { id: 9, name: 'სათევზაო კალთა Shimano', price: 179, category: 'სხვადასხვა', image: getRandomImage('fishing', 9), rating: 4, sales: 203, featured: false },
    { id: 10, name: 'სამღებრო პისტოლეტი Wagner W550', price: 89, category: 'ელექტრო ხელსაწყოები', image: getRandomImage('spray', 10), rating: 5, sales: 189, featured: false },
    { id: 11, name: 'წყლის ტუმბო Grundfos JP 6-60', price: 299, category: 'წყლის ტუმბოები', image: getRandomImage('pump', 11), rating: 4, sales: 56, featured: false },
    { id: 12, name: 'სათევზაო კარვი Coleman', price: 249, category: 'სხვადასხვა', image: getRandomImage('tent', 12), rating: 4, sales: 234, featured: false },
    { id: 13, name: 'ბენზინის ხერხი Stihl MS 180', price: 399, category: 'ბენზინის ხელსაწყოები', image: getRandomImage('chainsaw', 13), rating: 5, sales: 45, featured: true },
    { id: 14, name: 'შედუღების აპარატი Weltek WT-200', price: 599, category: 'ელექტრო ხელსაწყოები', image: getRandomImage('welding', 14), rating: 4, sales: 32, featured: false },
    { id: 15, name: 'კომპრესორი Fiac AB 30/100', price: 799, category: 'პნევმატური ხელსაწყოები', image: getRandomImage('compressor', 15), rating: 5, sales: 28, featured: true },
    { id: 16, name: 'სამუშაო ხელთათმანები 3M', price: 35, category: 'უსაფრთხოება და სპეცტანსაცმელი', image: getRandomImage('gloves', 16), rating: 4, sales: 312, featured: false },
    { id: 17, name: 'საპრიალებელი მანქანა Bosch PSS 250 AE', price: 179, category: 'ელექტრო ხელსაწყოები', image: getRandomImage('polisher', 17), rating: 4, sales: 67, featured: false },
    { id: 18, name: 'ბაღის საჭრელი Makita DUH523Z', price: 289, category: 'ბაღის ინსტრუმენები', image: getRandomImage('gardening', 18), rating: 5, sales: 89, featured: true },
    { id: 19, name: 'ხელსაწყოების ყუთი Stanley 1-95-611', price: 129, category: 'ხელსაწყოების შესანახი', image: getRandomImage('toolbox', 19), rating: 4, sales: 156, featured: false },
    { id: 20, name: 'WPC პანელი 2500x200x25mm', price: 89, category: 'კომპოზიტური WPC პანელები', image: getRandomImage('wood', 20), rating: 4, sales: 78, featured: false },
    { id: 21, name: 'ავტო ლიფტი 2 ტონა', price: 1299, category: 'მანქანის აღჭურვილობა', image: getRandomImage('lift', 21), rating: 5, sales: 12, featured: true },
    { id: 22, name: 'ამწე 500 კგ', price: 899, category: 'ამწევი დანადგარები', image: getRandomImage('hoist', 22), rating: 4, sales: 34, featured: false },
    { id: 23, name: 'სამიზნე ოპტიკური Vortex', price: 549, category: 'სხვადასხვა', image: getRandomImage('scope', 23), rating: 5, sales: 45, featured: true },
    { id: 24, name: 'ბიპოდი გამძლე', price: 149, category: 'სხვადასხვა', image: getRandomImage('bipod', 24), rating: 4, sales: 67, featured: false },
];

export function useProducts() {
    const products = ref([...mockProducts]);
    const categoriesList = ref([...categories]);

    const getProducts = () => {
        return products.value;
    };

    const getProductById = (id) => {
        return products.value.find(p => p.id === parseInt(id));
    };

    const getFeaturedProducts = () => {
        return products.value.filter(p => p.featured);
    };

    const getTopSellingProducts = (limit = 6) => {
        return [...products.value]
            .sort((a, b) => b.sales - a.sales)
            .slice(0, limit);
    };

    const getProductsByCategory = (category) => {
        if (!category || category === 'ყველა') {
            return products.value;
        }
        return products.value.filter(p => p.category === category);
    };

    const filterProducts = (filters) => {
        let filtered = [...products.value];

        if (filters.category && filters.category !== 'ყველა') {
            filtered = filtered.filter(p => p.category === filters.category);
        }

        if (filters.minPrice) {
            filtered = filtered.filter(p => p.price >= filters.minPrice);
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.price <= filters.maxPrice);
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    };

    return {
        products,
        categoriesList,
        getProducts,
        getProductById,
        getFeaturedProducts,
        getTopSellingProducts,
        getProductsByCategory,
        filterProducts
    };
}
