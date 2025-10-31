<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
                <div class="card shadow-lg">
                    <div class="card-body p-5">
                        <h2 class="text-center mb-4">რეგისტრაცია</h2>
                        
                        <form @submit.prevent="handleRegister">
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
                                <input v-model="form.phone" type="tel" class="form-control" id="phone" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="password" class="form-label">პაროლი</label>
                                <input v-model="form.password" type="password" class="form-control" id="password" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="passwordConfirm" class="form-label">პაროლის დადასტურება</label>
                                <input v-model="form.passwordConfirm" type="password" class="form-control" id="passwordConfirm" required>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input v-model="form.agree" type="checkbox" class="form-check-input" id="agree" required>
                                <label class="form-check-label" for="agree">
                                    ვეთანხმები <a href="#">პირობებს</a>
                                </label>
                            </div>
                            
                            <button type="submit" class="btn btn-primary w-100 btn-lg mb-3">
                                <i class="bi bi-person-plus"></i> რეგისტრაცია
                            </button>
                        </form>
                        
                        <div class="text-center">
                            <p class="mb-0">
                                უკვე გაქვთ ანგარიში? 
                                <router-link to="/login" class="text-primary">შესვლა</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'Register',
    setup() {
        const router = useRouter();
        const form = ref({
            name: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirm: '',
            agree: false
        });

        const handleRegister = () => {
            if (form.value.password !== form.value.passwordConfirm) {
                alert('პაროლები არ ემთხვევა!');
                return;
            }

            // Mock registration - in real app, this would call an API
            const user = {
                id: 1,
                name: form.value.name,
                email: form.value.email,
                phone: form.value.phone
            };
            
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', 'mock-token-123');
            
            alert('რეგისტრაცია წარმატებით დასრულდა!');
            router.push('/');
            window.location.reload(); // Reload to update header
        };

        return {
            form,
            handleRegister
        };
    }
}
</script>

