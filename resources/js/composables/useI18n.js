import { ref, computed } from 'vue';

const translations = {
    geo: {
        // Common
        'home': 'მთავარი',
        'products': 'პროდუქცია',
        'about': 'ჩვენ შესახებ',
        'contact': 'კონტაქტი',
        'cart': 'კალათა',
        'login': 'შესვლა',
        'register': 'რეგისტრაცია',
        'logout': 'გასვლა',
        'search': 'ძიება',
        'categories': 'კატეგორიები',
        'all': 'ყველა',
        'viewAll': 'ყველას ნახვა',
        'addToCart': 'კალათაში დამატება',
        'price': 'ფასი',
        'total': 'სულ',
        'subtotal': 'ქვეტოტალი',
        'delivery': 'მიწოდება',
        'free': 'უფასო',
        
        // Header
        'welcome': 'კეთილი იყოს თქვენი მობრძანება Shop Monolit-ში',
        'freeShipping': 'უფასო მიწოდება 150₾-ზე მეტ შეკვეთებზე',
        'searchPlaceholder': 'მოსაძებნად მიუთითეთ პროდუქტის სახელი...',
        'user': 'მომხმარებელი',
        
        // Home
        'welcomeToShop': 'შემოდით მაღაზიაში',
        'trustedPartner': 'თქვენი სანდო პარტნიორი ხარისხიანი ხელსაწყოებისთვის',
        'viewProducts': 'პროდუქციის ნახვა',
        'specialOffers': 'სპეციალური შეთავაზებები',
        'bigDiscounts': 'დიდი ფასდაკლებები ყველა პროდუქტზე',
        'viewOffers': 'შეთავაზებების ნახვა',
        'fastDelivery': 'გაწეული მიწოდება',
        'freeDeliveryText': 'უფასო მიწოდება 150₾-ზე მეტ შეკვეთებზე',
        'getStarted': 'დაწყება',
        'featuredProducts': 'რეკომენდებული პროდუქტები',
        'topSales': 'ტოპ გაყიდვები',
        'topSeller': 'ტოპ გაყიდვა',
        'recommended': 'რეკომენდებული',
        'sold': 'გაყიდული',
        
        // Products
        'filters': 'ფილტრები',
        'searchProductName': 'პროდუქტის სახელი...',
        'priceRange': 'ფასის დიაპაზონი',
        'min': 'მინ',
        'max': 'მაქს',
        'resetFilters': 'ფილტრების გასუფთავება',
        'found': 'ნაპოვნია',
        'product': 'პროდუქტი',
        'products': 'პროდუქტი',
        'previous': 'წინა',
        'next': 'შემდეგი',
        
        // Cart
        'emptyCart': 'კალათა ცარიელია',
        'addProducts': 'დაამატეთ პროდუქტები კალათაში',
        'backToProducts': 'პროდუქციაზე დაბრუნება',
        'quantity': 'რაოდენობა',
        'orderSummary': 'შეკვეთის შინაარსი',
        'continueShopping': 'შეძენის გაგრძელება',
        'checkout': 'გადახდა',
        
        // Checkout
        'deliveryInfo': 'მიწოდების ინფორმაცია',
        'firstName': 'სახელი',
        'lastName': 'გვარი',
        'email': 'Email',
        'phone': 'ტელეფონი',
        'address': 'მისამართი',
        'city': 'ქალაქი',
        'postalCode': 'საფოსტო კოდი',
        'comment': 'კომენტარი',
        'paymentMethod': 'გადახდის მეთოდი',
        'bankCard': 'საბანკო ბარათი',
        'cashOnDelivery': 'ნაღდი ფული მიწოდებისას',
        'confirmOrder': 'შეკვეთის დადასტურება',
        'selectPaymentMethod': 'გთხოვთ აირჩიოთ გადახდის მეთოდი',
        
        // Login
        'password': 'პაროლი',
        'remember': 'დამახსოვრება',
        'noAccount': 'არ გაქვთ ანგარიში?',
        'haveAccount': 'უკვე გაქვთ ანგარიში?',
        'successLogin': 'წარმატებით შეხვედით!',
        
        // Register
        'name': 'სახელი',
        'passwordConfirm': 'პაროლის დადასტურება',
        'agreeTerms': 'ვეთანხმები',
        'terms': 'პირობებს',
        'passwordsNotMatch': 'პაროლები არ ემთხვევა!',
        'successRegister': 'რეგისტრაცია წარმატებით დასრულდა!',
        
        // Contact
        'contactUs': 'კონტაქტი',
        'addressLabel': 'მისამართი',
        'phoneLabel': 'ტელეფონი',
        'emailLabel': 'Email',
        'sendMessage': 'გამოგვიგზავნეთ შეტყობინება',
        'message': 'შეტყობინება',
        'send': 'გაგზავნა',
        'messageSent': 'შეტყობინება წარმატებით გაიგზავნა!',
        'tbilisiGeorgia': 'თბილისი, საქართველო',
        
        // About
        'aboutUs': 'ჩვენ შესახებ',
        'aboutTitle': 'მოგვიხარია, რომ ჩვენთან ხართ!',
        'aboutText1': 'Shop Monolit არის თანამედროვე ონლაინ მაღაზია, რომელიც გთავაზობთ ხარისხიან პროდუქციას საუკეთესო ფასებით.',
        'aboutText2': 'ჩვენი მისიაა - გაგიწიოთ უმაღლესი ხარისხის მომსახურება და ხარისხიანი პროდუქცია. ჩვენ გვყავს გამოცდილი გუნდი, რომელიც ყოველთვის მზად არის დაგეხმაროთ.',
        'aboutText3': 'ჩვენ გვყავს ფართო ასორტიმენტი ელექტრონიკის, ტანსაცმლის, სპორტული ნივთების და სხვა კატეგორიების პროდუქციის. ყველა პროდუქტი გადაწმენდილია ხარისხისთვის და ჩვენ ვაძლევთ გარანტიას.',
        'quality': 'ხარისხი',
        'qualityText': 'ყველა პროდუქტი გადაწმენდილია ხარისხისთვის',
        'fastDeliveryTitle': 'სწრაფი მიწოდება',
        'fastDeliveryText': 'უფასო მიწოდება 100₾-ზე მეტ შეკვეთებზე',
        'support247': '24/7 მხარდაჭერა',
        'supportText': 'ჩვენი გუნდი ყოველთვის მზად არის დაგეხმაროთ',
        'whyShopMonolit': 'რატომ Shop Monolit?',
        'wideRange': 'ფართო ასორტიმენტი',
        'wideRangeText': 'ათასობით პროდუქტი სხვადასხვა კატეგორიიდან',
        'bestPrices': 'საუკეთესო ფასები',
        'bestPricesText': 'კონკურენტუნარიანი ფასები ყველა პროდუქტზე',
        'secureShopping': 'უსაფრთხო შენაძენი',
        'secureShoppingText': 'დაცული გადახდის სისტემა',
        'fastDeliveryAbout': 'სწრაფი მიწოდება',
        'fastDeliveryAboutText': 'მიწოდება მთელი საქართველოს მასშტაბით',
        
        // Footer
        'address': 'მისამართი',
        'followUs': 'მიჰყევით ჩვენ',
        'menu': 'მენიუ',
        'allRightsReserved': 'ყველა უფლება დაცულია',
        'footerDescription': 'თქვენი სანდო პარტნიორი ხარისხიანი პროდუქციისთვის. ჩვენ ვთავაზობთ ყველაზე კარგ ფასებს და მომსახურებას.',
        
        // Common messages
        'addedToCart': 'დაემატა კალათაში!',
        'orderSuccess': 'შეკვეთა წარმატებით გაიგზავნა! შეკვეთის ნომერი: #',
    },
    en: {
        // Common
        'home': 'Home',
        'products': 'Products',
        'about': 'About',
        'contact': 'Contact',
        'cart': 'Cart',
        'login': 'Login',
        'register': 'Register',
        'logout': 'Logout',
        'search': 'Search',
        'categories': 'Categories',
        'all': 'All',
        'viewAll': 'View All',
        'addToCart': 'Add to Cart',
        'price': 'Price',
        'total': 'Total',
        'subtotal': 'Subtotal',
        'delivery': 'Delivery',
        'free': 'Free',
        
        // Header
        'welcome': 'Welcome to Shop Monolit',
        'freeShipping': 'Free shipping for orders over 150₾',
        'searchPlaceholder': 'Search for product name...',
        'user': 'User',
        
        // Home
        'welcomeToShop': 'Welcome to Shop',
        'trustedPartner': 'Your trusted partner for quality tools',
        'viewProducts': 'View Products',
        'specialOffers': 'Special Offers',
        'bigDiscounts': 'Big discounts on all products',
        'viewOffers': 'View Offers',
        'fastDelivery': 'Fast Delivery',
        'freeDeliveryText': 'Free shipping for orders over 150₾',
        'getStarted': 'Get Started',
        'featuredProducts': 'Featured Products',
        'topSales': 'Top Sales',
        'topSeller': 'Top Seller',
        'recommended': 'Recommended',
        'sold': 'Sold',
        
        // Products
        'filters': 'Filters',
        'searchProductName': 'Product name...',
        'priceRange': 'Price Range',
        'min': 'Min',
        'max': 'Max',
        'resetFilters': 'Reset Filters',
        'found': 'Found',
        'product': 'product',
        'products': 'products',
        'previous': 'Previous',
        'next': 'Next',
        
        // Cart
        'emptyCart': 'Cart is empty',
        'addProducts': 'Add products to cart',
        'backToProducts': 'Back to Products',
        'quantity': 'Quantity',
        'orderSummary': 'Order Summary',
        'continueShopping': 'Continue Shopping',
        'checkout': 'Checkout',
        
        // Checkout
        'deliveryInfo': 'Delivery Information',
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'email': 'Email',
        'phone': 'Phone',
        'address': 'Address',
        'city': 'City',
        'postalCode': 'Postal Code',
        'comment': 'Comment',
        'paymentMethod': 'Payment Method',
        'bankCard': 'Bank Card',
        'cashOnDelivery': 'Cash on Delivery',
        'confirmOrder': 'Confirm Order',
        'selectPaymentMethod': 'Please select a payment method',
        
        // Login
        'password': 'Password',
        'remember': 'Remember Me',
        'noAccount': 'Don\'t have an account?',
        'haveAccount': 'Already have an account?',
        'successLogin': 'Successfully logged in!',
        
        // Register
        'name': 'Name',
        'passwordConfirm': 'Confirm Password',
        'agreeTerms': 'I agree to the',
        'terms': 'terms',
        'passwordsNotMatch': 'Passwords do not match!',
        'successRegister': 'Registration completed successfully!',
        
        // Contact
        'contactUs': 'Contact',
        'addressLabel': 'Address',
        'phoneLabel': 'Phone',
        'emailLabel': 'Email',
        'sendMessage': 'Send us a Message',
        'message': 'Message',
        'send': 'Send',
        'messageSent': 'Message sent successfully!',
        'tbilisiGeorgia': 'Tbilisi, Georgia',
        
        // About
        'aboutUs': 'About Us',
        'aboutTitle': 'We\'re glad you\'re here!',
        'aboutText1': 'Shop Monolit is a modern online store that offers quality products at the best prices.',
        'aboutText2': 'Our mission is to provide you with the highest quality service and quality products. We have an experienced team that is always ready to help you.',
        'aboutText3': 'We have a wide range of electronics, clothing, sports items and products from other categories. All products are quality tested and we provide warranty.',
        'quality': 'Quality',
        'qualityText': 'All products are quality tested',
        'fastDeliveryTitle': 'Fast Delivery',
        'fastDeliveryText': 'Free shipping for orders over 100₾',
        'support247': '24/7 Support',
        'supportText': 'Our team is always ready to help you',
        'whyShopMonolit': 'Why Shop Monolit?',
        'wideRange': 'Wide Range',
        'wideRangeText': 'Thousands of products from different categories',
        'bestPrices': 'Best Prices',
        'bestPricesText': 'Competitive prices on all products',
        'secureShopping': 'Secure Shopping',
        'secureShoppingText': 'Secure payment system',
        'fastDeliveryAbout': 'Fast Delivery',
        'fastDeliveryAboutText': 'Delivery throughout Georgia',
        
        // Footer
        'address': 'Address',
        'followUs': 'Follow Us',
        'menu': 'Menu',
        'allRightsReserved': 'All rights reserved',
        'footerDescription': 'Your trusted partner for quality products. We offer the best prices and service.',
        
        // Common messages
        'addedToCart': 'added to cart!',
        'orderSuccess': 'Order sent successfully! Order number: #',
    }
};

const currentLanguage = ref(localStorage.getItem('language') || 'geo');

export function useI18n() {
    const setLanguage = (lang) => {
        if (translations[lang]) {
            currentLanguage.value = lang;
            localStorage.setItem('language', lang);
            // Update document language attribute
            document.documentElement.lang = lang;
        }
    };

    const t = (key) => {
        return translations[currentLanguage.value]?.[key] || key;
    };

    const getCurrentLanguage = () => {
        return currentLanguage.value;
    };

    // Initialize document language
    if (typeof document !== 'undefined') {
        document.documentElement.lang = currentLanguage.value;
    }

    return {
        t,
        setLanguage,
        currentLanguage: computed(() => currentLanguage.value),
        getCurrentLanguage
    };
}

