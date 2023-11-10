<script setup>
import Input from "./components/Input.vue";
</script>

<template>
    <header class="header">
        <div class="logo">
            <router-link to="/">Autocomplete Search Box</router-link>
        </div>
        <Input />
    </header>
    <main class="main">
        <router-view></router-view>
    </main>
</template>

<style lang="scss" scoped>
@import "./styles/main.scss";
.header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    flex-direction: column;
    position: relative;

    .logo {
        font-size: 25px;
        cursor: default;
        user-select: none;
        font-weight: 500;
        background: white;
        color: black;
        padding: 5px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }
}

.main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    gap: 15px;
}
</style>
