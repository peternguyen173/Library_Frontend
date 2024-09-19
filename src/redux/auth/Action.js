// Action to set the user role and username (log in)
export const setUserInfo = (role, username) => {
    console.log('Dispatching setUserInfo:', { role, username }); // Debug log
    return {
        type: "SET_USER_INFO",
        payload: {
            role,
            username,
        },
    };
};

// Action to clear the user info (log out)
export const clearUserInfo = () => ({
    type: "CLEAR_USER_INFO",
});
