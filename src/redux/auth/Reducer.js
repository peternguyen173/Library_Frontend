const initialState = {
    isLoggedIn: false,  // Tracks login status
    userRole: null,     // Stores the user's role (admin/user)
    username: null,     // Stores the logged-in user's username
};

// Updated reducer with `username`, `userRole`, and `isLoggedIn`
export default function authReducer(state = initialState, action) {
    console.log('Reducer action:', action); // Debug log
    switch (action.type) {
        case 'SET_USER_INFO':
            console.log('Setting user info:', action.payload); // Debug log
            return {
                ...state,
                userRole: action.payload.role,   // Set user role ('admin' or 'user')
                username: action.payload.username,  // Set the username
                isLoggedIn: true,               // Mark as logged in
            };
        case 'CLEAR_USER_INFO':
            console.log('Clearing user info'); // Debug log
            return {
                ...state,
                userRole: null,       // Clear user role
                username: null,       // Clear username
                isLoggedIn: false,    // Mark as logged out
            };
        default:
            return state;
    }
}
