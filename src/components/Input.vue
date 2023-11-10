<script setup>
import { ref } from "vue";
import store from "../store";
const id = import.meta.env.VITE_APP_ID;

const input = ref("");

const addUserToOriginalList = (user) => {
    store.dispatch("addUser", user);
};
const openAuth = () => {
    VK.init({
        apiId: id,
        SameSite: 'none',
        crossorigin: ''
    });
    VK.Auth.login(function (response) {
        console.log(response);
        if (response.session) {
            const n = response.session.sid;
            const id = response.session.user.id;
            store.commit("newToken", n);
            store.commit("newId", id);
            store.dispatch("getUsers");
        } else {
            alert("нужна авторизация");
        }
    }, VK.access.FRIENDS);
};
</script>

<template>
    <div v-if="!store.state.tokenApi" class="results_search_none">
        <strong>Loading...<button class="auth" @click="openAuth">нажми для авторизации</button></strong>
    </div>
    <input
        v-else
        type="text"
        v-model="input"
        placeholder="Search users..."
        class="search"
    />
    <div v-if="input.length" class="wrapper">
        <button class="btnClose" @click="input = ''">очистить</button>
        <div
            class="item"
            v-for="user in store.getters.filteredSearchList(input)"
            :key="user.id"
        >
            <div class="image">
                <img alt="user photo" :src="user.photo_100" />
            </div>
            <p>{{ user.first_name }} {{ user.last_name }}</p>
            <button class="btn" @click="addUserToOriginalList(user)"></button>
        </div>
        <div
            class="error"
            v-if="input && !store.getters.filteredSearchList(input).length"
        >
            <p>No results found!</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>


    .auth {
        background: rgb(102, 255, 0);
        cursor: pointer;
        border: none;
        border-radius: 5px;
        margin: 25px;
        color: rgb(0, 0, 0);
        user-select: none;
        font-weight: 700;
        text-transform: uppercase;
        padding: 10px;
        overflow: hidden;
        position: relative;
        right: 15px;
        top: 5px;
        text-align: center;
    }

.results_search_none {
    font-size: 14px;
    font-weight: 400;

    strong {
        color: red;
    }
}
.btnClose {
    position: relative;
    background: rgb(184, 96, 96);
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: rgb(255, 255, 255);
    user-select: none;
    font-weight: 500;
    text-transform: uppercase;
    padding: 10px;
    overflow: hidden;
    text-align: center;

    &:hover {
        background: rgb(172, 56, 10);
        color: white;
    }
}
.search {
    display: block;
    width: max(33%, 330px);
    margin: 20px auto;
    padding: 10px 45px;
    background: white url("../image/icon/search.svg") no-repeat 15px center;
    background-size: 15px 15px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.wrapper {
    display: flex;
    z-index: 9999;
    background-color: white;
    position: absolute;
    top: 105px;
    flex-direction: column;
    padding: 8px;
    border-radius: 5px;
    gap: 5px;
    width: max(33%, 330px);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    .item {
        display: flex;
        gap: 15px;
        width: 100%;
        height: 50px;
        padding: 2px 0;
        color: black;
        cursor: pointer;

        .btn {
            cursor: pointer;
            position: absolute;
            right: 15px;
            background-color: transparent;
            background-image: url("../image/icon/add1.svg");
            background-size: cover;
            background-repeat: no-repeat;
            width: 45px;
            height: 45px;
            border: none;
            outline: none;
            margin-right: 5px;

            &:hover {
                background-image: url("../image/icon/add.svg");
            }
        }

        .image {
            width: 45px;
            height: 45px;
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

        &:hover {
            background-color: rgb(101, 190, 250);
            width: 110%;
            margin-left: -5%;
            padding-left: 5%;
            color: white;
        }
    }

    .error {
        background-color: tomato;
        text-align: left;
        padding: 5px;
    }
}
</style>
