<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
        <scroll-top />
    </div>
</template>



<script>
import ScrollTop from '@/components/ScrollTop.vue';
export default {
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true
        };
    },
    components: {
        'scroll-top': ScrollTop
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        }
    }
};
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.hide .el-upload--picture-card {
    display: none;
}
/* */
.article-title {
    font-size: 1.5rem;
    font-weight: bold;
}

/* 自定义icon */
.el-icon-man {
    background: url('../src/assets/imgs/man.svg') center no-repeat;
}

.el-icon-man:before {
    content: '\e7cd';
    font-size: 24px;
    visibility: hidden;
}

.el-icon-woman {
    background: url('../src/assets/imgs/woman.svg') center no-repeat;
}

.el-icon-woman:before {
    content: '\e7cd';
    font-size: 24px;
    visibility: hidden;
}

.el-icon-my-top {
    background: url('../src/assets/imgs/top.svg') center no-repeat;
}
.el-icon-my-top:before {
    content: '\e7cd';
    font-size: 48px;
    visibility: hidden;
}

.el-icon-my-msg {
    background: url('../src/assets/imgs/msg.svg') center no-repeat;
}

.el-icon-my-msg:before {
    content: '\e7cd';
    font-size: 48px;
    visibility: hidden;
}

/* 设置el-drawer */
.ttb {
    overflow-y: auto !important;
    height: 100% !important;
}
/* 设置button文字 */
.reply_area .el-button {
    font-size: 12px;
}
.reply_area_tip .el-button {
    padding: 5px 1px;
}
</style>
