<script setup>
import store from "../store";
import User from "./User.vue";

const ageUser = (str) => {
    const dd = str.split(".").map((d) => Number(d));
    if (dd.length !== 3) {
        return str;
    } else {
        const ageEnter = new Date(dd[2], dd[1] - 1, dd[0], 0, 0, 0, 0);
        const dateNow = new Date();
        const age = dateNow.getFullYear() - ageEnter.getFullYear();
        return age;
    }
};
const sexUser = (num) => {
    if (num) {
        if (num === 1) {
            return "женский";
        } else {
            return "мужской";
        }
    } else {
        return "не указоно";
    }
};
const getRGBC = (perc) => {
    let r = perc;
    if (perc > 7) {
        r = 1;
    }
    const n = `${r * 2 + 10}`;
    const color = `${n}5`;
    return `${color}, ${color}, ${color}`;
};
</script>

<template>
    <template v-for="user in store.getters.getFriendsList" :key="Math.random()">
        <User
            :style="{
                backgroundColor: `rgb(${getRGBC(
                    store.getters.getInFriendsList(user.id).length
                )})`,
            }"
        >
            <router-link :to="{ path: `/user/${user.id}` }">
                <div class="itemWrapp">
                    <div class="image">
                        <img alt="user photo" :src="user.photo_100" />
                    </div>
                    <div class="text">
                        <h3>{{ user.first_name }} {{ user.last_name }}</h3>
                        <p>
                            Пол:
                            <span>{{ sexUser(user.sex) }} </span>
                        </p>
                        <p>
                            Возраст:
                            <span>{{
                                user.bdate ? ageUser(user.bdate) : "не указано"
                            }}</span>
                        </p>
                        <p>
                            Друзей: <span>{{ user.r }}</span>
                        </p>
                    </div>
                </div>
            </router-link>
        </User>
    </template>
    <template v-if="store.getters.getFriendsList.length === 0">
        <User>
            <h1>Здесь пока пусто</h1>
        </User>
    </template>
</template>

<style lang="scss" scoped>
.itemWrapp {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.image {
    min-width: 45px;
    min-height: 45px;
    width: 45px;
    height: 45px;
    border: 1px solid lightgray;
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

.text {
    width: 90%;
    color: black;

    h3 {
        margin-bottom: 3px;
        color: black;
    }

    p {
        font-size: 14px;
        color: black;
        margin-bottom: 2px;

        span {
            color: black;
            font-size: 16px;
            font-weight: 500;
        }
    }
}
</style>
