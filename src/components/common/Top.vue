<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a href="http://www.hubu.edu.cn/">
                <img src="../../assets/imgs/logo.png" class="logo" />
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">首页</router-link>


                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">更多</a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item" @click="artType">全部板块</a>
                        <a class="navbar-item" @click="postArt">发表帖子</a>
                        <hr class="navbar-divider" />
                        <a class="navbar-item" @click="userhome">个人主页</a>
                        
                    </div>
                </div>
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-5"></p>
                    </div>
                    
                </div>
            </div>

            <div class="navbar-end" v-if="!$store.state.isLogin">
                <div class="navbar-item">
                    <div class="buttons">
                        <b-button type="is-info" outlined @click="register">注册</b-button>
                        <div class="navbar-menu">
                            <div class="navbar-end">
                                <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
                                    <a class="navbar-item" slot="trigger" role="button">
                                        <b-button type="is-info" outlined>登录</b-button>
                                    </a>

                                    <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
                                        <div class="modal-card" style="width:300px;">
                                            <section class="modal-card-body">
                                                <b-field label="Email">
                                                    <b-input type="email" v-model="email" placeholder="Your email" required></b-input>
                                                </b-field>

                                                <b-field label="密码">
                                                    <b-input type="password" psw-reveal placeholder="Your psw" required v-model="psw"></b-input>
                                                </b-field>

                                            </section>
                                            <footer class="modal-card-foot">
                                                <button class="button is-primary" @click="login">登录</button>
                                            </footer>
                                        </div>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="$store.state.isLogin">
                
                <div class="login-dropdown">
                    <el-dropdown @command="handleCommand">
                        <el-avatar :size="40">
                            <img class="avatar" :src="userAvatar ? userAvatar + '?t=' + (new Date().getTime()) : ''" :onerror="avatarFailed"/>
                        </el-avatar>
                      <el-dropdown-menu>
                          <el-dropdown-item>
                                  <el-avatar :size="30">
                                      <img class="avatar" :src="userAvatar ? userAvatar + '?t=' + (new Date().getTime()) : ''" :onerror="avatarFailed">
                                  </el-avatar>
                                  <label>{{ $store.state.user.userName }}</label>
                              </el-dropdown-item>
                          <el-dropdown-item command="personal" divided>个人中心</el-dropdown-item>
                          <el-dropdown-item command="msg" divided>我的消息</el-dropdown-item>
                          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                        
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { userLogin, userLogout } from '@/api/user';

export default {
    data() {
        return {
            email: '',
            psw: '',
            userAvatar: this.$store.state.user.userImg,
            avatarFailed: 'this.src ="' +  this.ASSET.USER_IMG_SRC +'"'
        };
    },
    methods: {
        logout() {
            userLogout().then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.$message.success("已退出登录！");
                }
            })
            this.$store.commit('logout');

        },
        userhome() {
            this.$router.push('/userhome');
        },
        artType() {
            this.$router.push({
                name: 'Article',
                params: {
                    typeId: 1
                }
            });
        },
        postArt() {
            this.$router.push('/postarticle');
        },
        login() {
            if(this.email == '' || this.psw == '') {
                return;
            } 
            userLogin({ email: this.email, psw: this.psw })
                .then(res => {
                    if (res.code == this.NET.SUCCESS_CODE) {
                        // 登录成功
                        this.$message.success(res.message);
                        this.$store.commit('login', res.data);
                        this.userAvatar = this.$store.state.user.userImg
                    }
                })
                .catch(() => {});
        },
        register() {
            this.$router.push('/registerhome');
        },
        handleCommand(command) {
            if(command === "personal") {
                this.$router.push('/userhome');
            } else if (command === "logout") {
                this.logout();
            } else if (command === 'msg') {
                this.$router.push('/msg');
            }
        }
    }
};
</script>

<style scoped>
.logo{
    height: 100%;
    display:block;
    max-height: 4.2rem;
}
.avatar {
    object-fit: cover;
}
.login-dropdown {
    margin-top: 0.5rem;
    margin-right: 0.3rem;
}
</style>
