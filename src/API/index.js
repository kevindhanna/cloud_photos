export default class API {
    constructor() {
        this.credentials = null
    }

    async init(settings) {
        const token = await this.getAppToken(settings)
        const { server } = settings
        this.credentials = {
            uuser,
            password,
            server
        }
    }
}