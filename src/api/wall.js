const token = import.meta.env.VITE_APP_TOKEN;
const version = import.meta.env.VITE_APP_VERSION;

export const resultWall = async (id) => {
    return new Promise((resolve) => {
        setTimeout(
            () =>
                VK.Api.call(
                    "wall.get",
                    {
                        access_token: token,
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
