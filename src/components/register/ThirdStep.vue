<template>
    <div class="third">
        <section>
            <div class="content">
                <h3>用户须知</h3>
                <p>
                    本论坛项目刊载的所有内容，包括文字、图片、音频、视频、软件、程序、以及网页版式设计等均在网上搜集。注册时要填写以下项目： 用户名: 中英文即可
                    密码: 不易过于简单。建议6位以上，数字、字母、字符，至少2种混合。 Email: 必填，作为登录账号 性别: 请选择 男或女 填写完毕，点提交
                </p>
            </div>
            <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
                <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
                    <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
                    {{ !props.open ? '查看全部' : '收起' }}
                </a>
            </b-collapse>
        </section>
        <b-button rounded type="is-info" @click="submit">提交注册信息</b-button>
    </div>
</template>

<script>
import { register } from '@/api/user';
export default {
    data() {
        return {};
    },
    methods: {
        submit() {
            const userName = this.$store.state.registeruser.userName;
            const userPsw = this.$store.state.registeruser.userPsw;
            const userShow = this.$store.state.registeruser.userShow;
            const userEmail = this.$store.state.registeruser.userEmail;
            const userPhone = this.$store.state.registeruser.userPhone;
            const userSex = this.$store.state.registeruser.userSex;

            if (userName === '' || userPsw === '' || userShow === '' || userEmail === '' || userPhone === '' || userSex === '') {
                alert('确定信息填写完整了吗？');
            } else {
                register({
                    userName,
                    userPsw,
                    userShow,
                    userEmail,
                    userPhone,
                    userSex
                }).then(res => {
                    if (res.code == this.NET.SUCCESS_CODE) {
                        this.$message.success('恭喜您，注册成功，正在为您跳转！');
                        this.$store.commit('login', res.data);
                        this.$router.push('/');
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
.third {
    text-align: center;
    float: right;
    width: 500px;
    height: 500px;
}
.content {
    margin-bottom: 0 !important;
}
</style>