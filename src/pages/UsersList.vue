<script setup>
import store from "../store";
import OriginalList from "../components/OriginalList.vue";
import FriendsList from "../components/FriendsList.vue";

const buildList = () => {
    store.dispatch("buildList");
};

const clearList = () => {
    store.dispatch("clearList");
};
</script>

<template>
    <div class="conteiner">
        <h1>Исходный</h1>
        <button
            class="button"
            :disabled="store.getters.getOriginalList.length === 0"
            @click="buildList"
        >
            построить
        </button>
        <OriginalList />
    </div>
    <div class="conteiner">
        <div v-if="store.state.isLoadingFriends" class="results_search_none">
            <strong>Loading...</strong>
        </div>
        <h1>Друзья</h1>
        <button
            class="button"
            :disabled="store.getters.getFriendsList.length === 0"
            @click="clearList"
        >
            очистить
        </button>
        <FriendsList />
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
    .results_search_none {
        font-size: 14px;
        font-weight: 400;

        strong {
            color: red;
        }
    }
    .button {
        background: rgb(233, 231, 231);
        cursor: pointer;
        border: none;
        border-radius: 5px;
        color: grey;
        user-select: none;
        font-weight: 500;
        text-transform: uppercase;
        padding: 10px;
        overflow: hidden;
        position: absolute;
        right: 15px;
        top: 5px;
        text-align: center;

        &:not(:disabled):hover {
            background: rgb(13, 168, 26);
            color: white;
        }
    }
}
</style>
