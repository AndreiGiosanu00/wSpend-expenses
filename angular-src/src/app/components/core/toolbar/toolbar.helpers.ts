let username = (JSON.parse(localStorage.getItem('user'))) ? JSON.parse(localStorage.getItem('user')).username : '';

export const ToolbarHelpers = {

	currentUser: {
		photoURL: "../../../../assets/user-image.png",
		currentUserName: username
	}
};
