const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    refreshToken: state => state.user.refreshToken,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    menus: state => state.user.menus,
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes
};
export default getters;