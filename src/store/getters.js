const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    getTheme: state => state.app.theme,
    pageLoading: state=>state.app.pageLoading,
    token: state => state.permission.token,
    userid: state => state.permission.userid,
    roles: state => state.permission.roles,
    permission_routes: state => state.permission.routes,
    DicItem: state=>state.app.DicItem,
}
export default getters
