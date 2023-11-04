<script setup>
import InFriendsList from "../components/InFriendsList.vue";
import PostsUser from "../components/PostsUser.vue";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <button class="button"><router-link to="/">назад</router-link></button>
    <div class="conteiner">
        <h1>В друзьях</h1>
        <InFriendsList :id="id" />
    </div>
    <div class="conteiner">
        <h1>Стена</h1>
        <PostsUser :id="id" />
    </div>
</template>

<style lang="scss" scoped>
.conteiner {
    display: flex;
    flex-direction: column;
    position: relative;
    width: max(33%, 400px);
    padding: 10px;
    gap: 15px;
    border-radius: 15px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

    h1 {
        text-align: center;
        text-transform: uppercase;
        font-size: 20px;
        color: rgb(92, 92, 92);
    }
}

.button {
    background: rgb(13, 168, 26);
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    user-select: none;
    font-weight: 500;
    text-transform: uppercase;
    padding: 10px;
    overflow: hidden;
    position: fixed;
    left: 10%;
    top: 9%;
    text-align: center;

    &:hover {
        background: rgb(15, 15, 15);
        color: white;
    }
}
</style>
