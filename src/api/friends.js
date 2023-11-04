const token = import.meta.env.VITE_APP_TOKEN;
const version = import.meta.env.VITE_APP_VERSION;

export const resultCount = async (id) => {
    return new Promise((resolve) => {
        setTimeout(
            () =>
                VK.Api.call(
                    "friends.get",
                    {
                        access_token: token,
                        user_id: id,
                        v: version,
                        language: "ru",
                    },
                    resolve
                ),
            400
        );
    });
};
