<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h1 class="text-center mb-5">კონტაქტი</h1>
                
                <div class="row g-4 mb-5">
                    <div class="col-md-4">
                        <div class="text-center p-4 bg-light rounded">
                            <i class="bi bi-geo-alt-fill fs-1 text-primary mb-3"></i>
                            <h5>მისამართი</h5>
                            <p class="text-muted mb-0">თბილისი, საქართველო</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="text-center p-4 bg-light rounded">
                            <i class="bi bi-telephone-fill fs-1 text-primary mb-3"></i>
                            <h5>ტელეფონი</h5>
                            <p class="text-muted mb-0">+995 555 123 456</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="text-center p-4 bg-light rounded">
                            <i class="bi bi-envelope-fill fs-1 text-primary mb-3"></i>
                            <h5>Email</h5>
                            <p class="text-muted mb-0">info@shopmonolit.ge</p>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm">
                    <div class="card-body p-4">
                        <h3 class="mb-4">გამოგვიგზავნეთ შეტყობინება</h3>
                        <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="name" class="form-label">სახელი</label>
                                <input v-model="form.name" type="text" class="form-control" id="name" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="form.email" type="email" class="form-control" id="email" required>
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">ტელეფონი</label>
                                <input v-model="form.phone" type="tel" class="form-control" id="phone">
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">შეტყობინება</label>
                                <textarea v-model="form.message" class="form-control" id="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg w-100">
                                <i class="bi bi-send"></i> გაგზავნა
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'Contact',
    setup() {
        const form = ref({
            name: '',
            email: '',
            phone: '',
            message: ''
        });

        const submitForm = () => {
            // Here you would typically send the form data to a backend
            alert('შეტყობინება წარმატებით გაიგზავნა!');
            form.value = {
                name: '',
                email: '',
                phone: '',
                message: ''
            };
        };

        return {
            form,
            submitForm
        };
    }
}
</script>

