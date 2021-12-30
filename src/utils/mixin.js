import {mapState} from "vuex";

const mixin = {
    computed: {
        ...mapState({
            multipage   : state => state.app.multipage,     //多页签设置
            fixedHeader : state => state.app.fixedHeader,
            fixSiderbar : state => state.app.fixSiderbar,
            contentWidth: state => state.app.contentWidth,
            autoHideHeader: state => state.app.autoHideHeader,
        })
    }
};

const mixinDevice = {
    computed: {
        ...mapState({
            device: state => state.app.device,
        })
    },
    methods: {
        isMobile() {
            return this.device === 'mobile'
        },
        isDesktop() {
            return this.device === 'desktop'
        }
    }
};

export {mixin, mixinDevice}
