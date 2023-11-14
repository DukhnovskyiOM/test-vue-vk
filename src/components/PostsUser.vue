<script setup>
import store from "../store";
import User from "./User.vue";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const index = store.state.friendsList.findIndex((e) => e.id == props.id);
</script>

<template>
    <template v-for="item in store.getters.getWallUser(index)" :key="item.date">
        <User v-if="item.text">
            <div>
                <p>{{ item.text }}</p>
            </div>
            <div v-if="item?.attachments">
                <img alt="photo" :src="item?.attachments[0]?.photo?.sizes[0]?.url" />
            </div>
        </User>
    </template>
</template>

<style lang="scss" scoped>
span {
    font-size: 12px;
    color: rgb(112, 111, 111);
}
p {
    word-break: break-all;
    width: 80%;
    word-wrap: break-word;
    color: black;
}
</style>
