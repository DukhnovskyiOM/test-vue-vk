const version = import.meta.env.VITE_APP_VERSION;
import store from "../store";

export const resultWall = async (id) => {
    return new Promise((resolve) => {
        setTimeout(
            () =>
                VK.Api.call(
                    "wall.get",
                    {
                        Authorization: store.state.tokenApi,
                        owner_id: id,
                        count: 50,
                        filter: "all",
                        v: version,
                        language: "ru",
                    },
                    resolve
                ),
            360
        );
    });
};
