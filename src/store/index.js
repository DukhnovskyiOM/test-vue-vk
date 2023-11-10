import { createStore } from "vuex";
import { resultCount } from "../api/friends";
import { resultWall } from "../api/wall";

const version = import.meta.env.VITE_APP_VERSION;

const store = createStore({
    state() {
        return {
            idApi: "",
            tokenApi: "",
            isLoadingFriends: false,
            searchList: [],
            origilaList: [],
            friendsList: [],
            inFriendsList: [],
        };
    },
    actions: {
        async getUsers({ commit }) {
            try {
                await VK.Api.call(
                    "friends.get",
                    {
                        Authorization: this.state.tokenApi,
                        user_id: this.state.idApi,
                        count: 100,
                        v: version,
                        fields: "photo_100",
                        language: "ru",
                    },
                    (res) => {
                        if (res.response) {
                            const users = res.response.items;
                            commit("addUsersSearchList", users);
                        }
                    }
                );
            } catch (error) {
                alert(error);
            }
        },
        addUser({ commit }, user) {
            commit("addUserOrigilaList", user);
            commit("deleteUserSearchList", user);
        },
        deleteUser({ commit }, user) {
            commit("deleteUserOrigilaList", user);
            commit("addUserSearchList", user);
        },
        async buildList({ commit }) {
            commit("clearFriendsList");
            this.state.isLoadingFriends = true;
            try {
                for (let i = 0; i < this.state.origilaList.length; i++) {
                    const id = this.state.origilaList[i].id;
                    await VK.Api.call(
                        "friends.get",
                        {
                            Authorization: this.state.tokenApi,
                            user_id: id,
                            order: "name",
                            count: 20,
                            v: version,
                            fields: "photo_100, sex, bdate",
                            language: "ru",
                        },
                        (res) => {
                            if (res.response) {
                                const users = res.response.items;
                                commit("buildFriendsList", users);
                                commit("buildInFriendsList", { id, users });
                                this.dispatch("addFriendsCount", users);
                                this.dispatch("addFriendsUserWall", users);
                            }
                        }
                    );
                }
            } catch (error) {
                alert(error);
            }
        },
        clearList({ commit }) {
            commit("clearFriendsList");
        },
        async addFriendsCount({ commit }, users) {
            for (let j = 0; j < users.length; j++) {
                const idd = users[j].id;
                let result = await resultCount(idd);
                if (result.response) {
                    const r = result.response.count;
                    commit("changeCountUser", { r, idd });
                } else {
                    const r = "нет доступа";
                    commit("changeCountUser", { r, idd });
                }
            }
            this.state.isLoadingFriends = false;
        },
        async addFriendsUserWall({ commit }, users) {
            for (let j = 0; j < users.length; j++) {
                const idd = users[j].id;
                let result = await resultWall(idd);

                if (result.response) {
                    const r = result.response.items;
                    commit("changeWallUser", { r, idd });
                } else {
                    const r = [];
                    commit("changeWallUser", { r, idd });
                }
            }
        },
    },
    mutations: {
        addUsersSearchList(state, users) {
            state.searchList = users;
        },
        newToken(state, n) {
            state.tokenApi = n;
        },
        newId(state, id) {
            state.idApi = id;
        },
        buildFriendsList(state, users) {
            state.friendsList = [...state.friendsList, ...users];
        },
        buildInFriendsList(state, prop) {
            state.inFriendsList = {
                ...state.inFriendsList,
                [prop.id]: [...prop.users.map((e) => e.id)],
            };
        },
        changeCountUser(state, prop) {
            state.friendsList = state.friendsList.map((e) => {
                if (e.id === prop.idd) {
                    e.r = prop.r;
                }
                return e;
            });
        },
        changeWallUser(state, prop) {
            state.friendsList = state.friendsList.map((e) => {
                if (e.id === prop.idd) {
                    e.w = prop.r;
                }
                return e;
            });
        },
        clearFriendsList(state) {
            state.friendsList = [];
        },
        addUserOrigilaList(state, user) {
            state.origilaList = [...state.origilaList, user];
        },
        deleteUserOrigilaList(state, user) {
            state.origilaList = state.origilaList.filter((e) => {
                if (e.id !== user.id) {
                    return e;
                }
            });
        },
        addUserSearchList(state, user) {
            state.searchList = [...state.searchList, user];
        },
        deleteUserSearchList(state, user) {
            state.searchList = state.searchList.filter((e) => {
                if (e.id !== user.id) {
                    return e;
                }
            });
        },
    },
    getters: {
        usersSearch(state) {
            return state.searchList;
        },
        getOriginalList(state) {
            return state.origilaList;
        },
        getFriendsList(state) {
            return state.friendsList;
        },
        getInFriendsList: (state) => (id) => {
            const res = state.origilaList.map((e) => {
                let result = [];
                for (const [key, value] of Object.entries(
                    state.inFriendsList
                )) {
                    if (Object.values(value).findIndex((e) => e == id) !== -1) {
                        if (e.id == key) {
                            result.push(e);
                        }
                    }
                }
                return result;
            });
            return res.flat();
        },
        filteredSearchList: (state) => (value) => {
            return state.searchList.filter((user) =>
                user.first_name.toLowerCase().includes(value.toLowerCase())
            );
        },
        getWallUser: (state) => (value) => {
            return state.friendsList[value].w;
        },
    },
});

export default store;
