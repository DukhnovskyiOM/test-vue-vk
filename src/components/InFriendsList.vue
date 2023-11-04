<script setup>
import store from "../store";
import User from "./User.vue";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <template v-for="item in store.getters.getInFriendsList(id)" :key="item.id">
        <User>
            <div class="image">
                <img alt="user photo" :src="item.photo_100" />
            </div>
            <p>{{ item.first_name }} {{ item.last_name }}</p>
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
</style>
