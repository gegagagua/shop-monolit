<template>
    <div id="app">
        <Header />
        <main>
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';

export default {
    name: 'App',
    components: {
        Header,
        Footer
    }
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
}

#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
}
</style>

