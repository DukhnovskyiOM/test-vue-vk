<script setup>
import store from "../store";
import User from "./User.vue";

const deleteUserFromOriginalList = (user) => {
    store.dispatch("deleteUser", user);
    store.dispatch("buildList");
};
</script>

<template>
    <template v-for="user in store.getters.getOriginalList" :key="user.id">
        <User>
            <div class="image">
                <img alt="user photo" :src="user.photo_100" />
            </div>
            <p>{{ user.first_name }} {{ user.last_name }}</p>
            <button
                class="btn"
                @click="deleteUserFromOriginalList(user)"
            ></button>
        </User>
    </template>
    <template v-if="store.getters.getOriginalList.length === 0">
        <User>
            <h1>Здесь пока пусто</h1>
        </User>
    </template>
</template>

<style lang="scss" scoped>
.image {
    min-width: 45px;
    min-height: 45px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: white;

    img {
        width: 35px;
        height: 35px;
    }
}

p {
    width: 80%;
    word-wrap: break-word;
}

.btn {
    cursor: pointer;
    background-color: transparent;
    background-image: url("../image/icon/delete.svg");
    background-size: cover;
    background-repeat: no-repeat;
    width: 25px;
    height: 25px;
    border: none;
    outline: none;

    &:hover {
        background-image: url("../image/icon/delete1.svg");
    }
}
</style>
