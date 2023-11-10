const version = import.meta.env.VITE_APP_VERSION;
import store from "../store";

export const resultCount = async (id) => {
    return new Promise((resolve) => {
        setTimeout(
            () =>
                VK.Api.call(
                    "friends.get",
                    {
                        Authorization: store.state.tokenApi,
                        user_id: store.state.idApi,
                        v: version,
                        language: "ru",
                    },
                    resolve
                ),
            400
        );
    });
};
