const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    getTheme: state => state.app.theme,
    token: state => state.permission.token,
    roles: state => state.permission.roles,
    permission_routes: state => state.permission.routes
}
export default getters
