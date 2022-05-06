<template>
    <div>
        <Top />
        <div id="Wrapper">
            <div class="content">
                <div id="Leftbar"></div>
                <!-- <div id="Rightbar">
                    <div class="sep20"></div>
                    <div class="box">
                        <div class="cell">&nbsp;{{ this.$store.state.user.userName }} 个人信息</div>

                        <nav class="level is-mobile">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">发帖数</p>
                                    <p>{{ mypostnum }}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">粉丝</p>
                                    <p>123</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">你关注的人数</p>
                                    <p>456K</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">获赞数</p>
                                    <p>789</p>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div class="sep20"></div>
                </div> -->
                <div id="Main">
                    <div class="sep20"></div>
                    <div class="box">
                        <div class="cell">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td width="88" valign="top" align="center">
                                            <!-- TODO -->
                                            <!-- 刷新缓存 避免图片不更新 -->
                                            <div @click="changeAvatar" @mouseenter="avatarInfoVisible=true" @mouseleave="avatarInfoVisible=false" class="avatar_div">
                                                <img :class="{user_avatar:true, avatar_hover: avatarInfoVisible}" :src="userAvatar ? userAvatar + '?t=' + (new Date().getTime()) : ''" :onerror="avatarFailed"/>
                                            <span class="avatar_word" v-show="avatarInfoVisible">更换头像</span>
                                            </div>
                                            
                                            <div class="sep10"></div>
                                            <i :class="icon_sex"></i>
                                            <strong class="online">ONLINE</strong>
                                        </td>
                                        <!-- <td width="10"></td> -->
                                        <td width="auto" valign="top" align="left">
                                            <div class="fr"></div>
                                            <!-- <h1 style="margin-bottom: 5px;">{{ this.$store.state.user.userName }}</h1> -->
                                            <h1 style="margin-bottom: 5px;">{{ $store.state.user.userName }}</h1>

                                            <span class="gray">
                                                <div class="sep5"></div>
                                                {{ $store.state.user.userShow == '' ? '还没有个性签名哦, 快点设置一个吧' : $store.state.user.userShow }}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="label_group" align="center" valign="top"></td>
                                        <td valign="top" align="center">
                                            <el-form label-position="left">
                                                <el-row :gutter="20">
                                                    <el-col :span="12">
                                                        <el-form-item label="手机号码" label-width="70px">
                                                            <i class="el-icon-phone"></i>
                                                            {{ $store.state.user.userPhone }}
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item label="邮箱" label-width="70px">
                                                            <i class="el-icon-message"></i>
                                                            {{ $store.state.user.userEmail }}
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <el-row>
                                <el-col :span="2" :offset="18">
                                    <el-button type="primary" plain @click="handleEdit">
                                        <i class="el-icon-edit"></i>
                                        修改信息
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="sep20"></div>

                    <div class="box">
                        <div class="inner">
                            <span class="gray">你的帖子</span>
                        </div>
                        <div class="inner">
                            <div class="box" v-for="(item, i) in articles" :key="i">
                                <article class="media">
                                    <div class="media-content">
                                        <div class="content">
                                            <p>
                                                <a @click="details(item.artId)"><strong>{{ item.artTitle }}</strong></a>
                                                <span style="float:right">所属板块: <strong>{{item.artTypeName}}</strong></span>
                                                <br />
                                            </p>
                                        </div>
                                        <nav class="level is-mobile">
                                            <div class="level-left">
                                                <a class="level-item">
                                                    <span class="icon is-small">
                                                        <i class="fab fa-hotjar"></i>
                                                    </span>
                                                    {{ item.artViewNum }}
                                                </a>

                                                <a class="level-item">
                                                    <span class="icon is-small">
                                                        <i class="fas fa-comment-dots"></i>
                                                    </span>
                                                    {{ item.artComNum }}
                                                </a>

                                                <a class="level-item">
                                                    <span class="icon is-small">
                                                        <i class="fas fa-heart"></i>
                                                    </span>
                                                    {{ item.artLikeNum }}
                                                </a>
                                            </div>
                                        </nav>
                                    </div>
                                </article>
                            </div>
                            <el-divider v-if="articles.length == 0">啊哦，原来你还没有帖子</el-divider>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sep20"></div>
        </div>
        <el-dialog title="修改信息" :visible.sync="editVisible" width="33%" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="50px">
                <el-form-item label="姓 名" prop="userName">
                    <el-input v-model="editForm.userName" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="性 别" prop="userSex" label-width="50px">
                    <el-select v-model="editForm.userSex" placeholder="性别" style="width:100%">
                        <el-option v-for="item in sexs" :key="item.value" :label="item.label" :value="item.value">
                            <span>{{ item.label }}</span>
                            <i :class="item.icon" style="float:right"></i>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="签 名" prop="userShow">
                    <el-input type="textarea" placeholder="请输入内容" v-model="editForm.userShow" maxlength="25" show-word-limit> </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 上传头像dialog -->
        <el-dialog title="更换头像" :visible.sync="changeAvatarVisible" width="30%">
            <el-form>
                <el-form-item class="upload">
                    <el-upload
                        action=""
                        list-type="picture-card"
                        :class="{ hide: !uploadVisible }"
                        :limit="1"
                        :file-list="fileList"
                        :on-remove="handleRemoveImg"
                        :http-request="handleUpload"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <span class="descript">请选择图片上传：支持JPG、PNG等格式，图片需小于2M</span>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>


<script>
import { getArticleByUserId } from '@/api/article';
import { updateInfo } from '@/api/user';
import { uploadAvatar as handleUploadImg } from '@/api/common';
import Top from '@/components/common/Top';

export default {
    data() {
        return {
            mypostnum: 0,
            articles: [
                // {
                //     artId: 0,
                //     artComNum: 0,
                //     artContent: '',
                //     artCreated: '',
                //     artLikeNum: 0,
                //     artTitle: '',
                //     artTypeName: '',
                //     artUserName: '',
                //     artViewNum: 0
                // }
            ],
            user: {},
            editVisible: false,
            uploadVisible: true,
            // 用于编辑时显示图片
            dialogImgUrl: '',
            fileList: [],
            image: "",
            changeAvatarVisible: false,
            avatarInfoVisible: false,
            editForm: { userName: '', userSex: 0, userShow: '' },
            icon_sex: this.$store.state.user.userSex == 1 ? 'el-icon-male' : 'el-icon-female',
            // 用户头像url 如果加载失败或用户没有头像url 则使用默认头像
            userAvatar: this.ASSET.AVATAR_PREFIX + this.$store.state.user.userId + this.ASSET.AVATAR_SUFFIX,
            avatarFailed: 'this.src ="' +  this.ASSET.USER_IMG_SRC +'"',
            sexs: [
                {
                    label: '男',
                    value: 1,
                    icon: 'el-icon-man'
                },
                {
                    label: '女',
                    value: 0,
                    icon: 'el-icon-woman'
                }
            ]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取必要信息
        getData() {
            this.getUserInfo();
            this.getUserArticle();
        },
        getUserInfo() {
            this.user = this.$store.state.user;
        },
        getUserArticle() {
            getArticleByUserId().then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.articles = res.data;
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        // 修改用户信息
        handleEdit() {
            this.fileList = [];
            this.editVisible = true;
            // 修改框获取当前用户的值
            this.editForm.userName = this.$store.state.user.userName;
            this.editForm.userShow = this.$store.state.user.userShow;
            this.editForm.userSex = this.$store.state.user.userSex;
            this.editForm.userImg = this.$store.state.user.userImg;
        },
        // 取消修改信息 并清空Form表单
        cancelEdit() {
            this.editVisible = false;
            this.editForm = {};
        },
        // 保存用户信息修改
        saveEdit() {
            console.log(this.editForm);
            if(!this.beforeEditCheck()) {
                return;
            }
            updateInfo(this.editForm).then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.$message.success('信息修改成功！');
                    // 更新store与localStorage
                    this.$store.commit('updateUserInfo', res.data);
                    this.editVisible = false;
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        beforeEditCheck() {
            if (this.editForm.userName == '') {
                this.$message.error("用户名不能为空！");
                return false;
            }
            return true;
        },
        changeAvatar() {
            this.changeAvatarVisible = true;
        },
        // 上传图片
        handleUpload(item) {
            console.log('进入上传图片流程');
            handleUploadImg(item).then(res => {
                console.log(res);
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.$message.success('图片上传成功！');
                    this.changeAvatarVisible = false;
                    this.dialogImgUrl = res.data;
                    this.image = res.data;
                    // editForm更新
                    this.editForm.userImg = this.image;
                    // 上传后隐藏
                    this.uploadVisible = false;
                } else {
                    this.$message.error('上传超出大小限制！');
                }
            });
        },

        handleRemoveImg() {
            this.uploadVisible = true;
            this.image=null;
        },
        details(artId) {
            this.$router.push({
                name: 'Details',
                params: { artId: artId }
            });
        }
    },
    components: {
        Top
    },
    watch: {
    }
};
</script>


<style scoped>
.avatar_div {
    position: relative; 
    width: 90px; 
    height: 90px;
}
.avatar_div:hover {
cursor:pointer
}
.user_avatar {
    border-radius: 50%;
    width: 75px;
    height: 75px;
    object-fit: cover;
    display: block;
}
.avatar_hover {
    -webkit-filter: contrast(50%); /*考虑浏览器兼容性：兼容 Chrome, Safari, Opera */
    filter: contrast(50%);
}
.avatar_word {
    font-size:12px;
    position: absolute; top: 32%; left: 26%;
}
.descript {
    line-height: 16px;
    color: #99a2aa;
}
.el-form-item {
    margin-left: 5px;
    margin-right: 10px;
    position: relative;
    display: block;
    text-align: left;
}
.upload {
    text-align: center;
}
.label_group {
    width: 73px;
    height: 40px;
}
.gray {
    color: #999;
}
.inner {
    padding: 10px;
    font-size: 14px;
    line-height: 150%;
    text-align: left;
}
#Wrapper {
    text-align: center;
    background-color: #e2e2e2;
    background-image: url(/static/img/shadow_light.png);
    background-repeat: repeat-x;
}
#Rightbar {
    width: 270px;
    float: right;
    margin-right: 20px;
}
.box {
    background-color: var(--box-background-color);
    border-radius: var(--box-border-radius);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e2e2e2;
}
table[Attributes] {
    -webkit-border-horizontal-spacing: 0px;
    -webkit-border-vertical-spacing: 0px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    width: 100%;
}
user agent stylesheet table {
    display: table;
    border-collapse: separate;
    border-spacing: 2px;
    border-color: grey;
}
.cell_tabs {
    padding: 10px 10px 0;
    border-bottom: 1px solid var(--box-border-color);
    text-align: center;
}
.cell_tab:link,
.cell_tab:visited {
    font-size: 14px;
    border-bottom: 3px solid transparent;
    display: inline-block;
    text-decoration: none;
    margin-right: 15px;
    padding: 0 5px 5px;
    color: #99a;
}

a:active,
a:link,
a:visited {
    color: #778087;
    text-decoration: none;
    word-break: break-word;
}
user agent stylesheet a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
.cell_tabs {
    padding: 10px 10px 0;
    border-bottom: 1px solid var(--box-border-color);
    text-align: center;
}
user agent stylesheet a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
.fl {
    float: left;
}
img[Attributes] {
    width: 18px;
    vertical-align: middle;
}
.cell {
    padding: 10px;
    font-size: 14px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
}
.box {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e2e2e2;
}
#Main {
    width: auto;
    margin: 0 310px 0 20px;
}
#Leftbar {
    width: 0;
    float: left;
}
.sep20 {
    height: 20px;
}
.content {
    min-width: 600px;
    max-width: 1100px;
    margin: 0 auto;
}
#Top {
    text-align: center;
    background-color: #fff;
    height: 44px;
    font-size: 15px;
    font-weight: 500;
    background-size: 44px 44px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.22);
    padding: 0 20px;
}
user agent stylesheet div {
    display: block;
}
body {
    padding: 0px;
    margin: 0px;
    font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', 'Segoe UI', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
}
:root {
    --box-background-color: #fff;
    --box-background-alt-color: #f9f9f9;
    --box-background-hover-color: #fafafa;
    --box-foreground-color: #000;
    --box-border-color: #e2e2e2;
    --box-border-radius: 3px;
}
user agent stylesheet html {
    color: -internal-root-color;
}
#Top > .content {
    max-width: 1060px;
}
.content {
    min-width: 600px;
    max-width: 1300px;
    margin: 0 auto;
}
table[Attributes] {
    -webkit-border-horizontal-spacing: 0px;
    -webkit-border-vertical-spacing: 0px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    width: 100%;
}
table {
    display: table;
    border-collapse: separate;
    border-spacing: 2px;
    border-color: grey;
}
tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}
td[Attributes] {
    width: 110px;
    text-align: -webkit-left;
}
user agent stylesheet td {
    display: table-cell;
    vertical-align: inherit;
}
a:active,
a:link,
a:visited {
    color: #778087;
    text-decoration: none;
    word-break: break-word;
}
user agent stylesheet a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
#Logo {
    width: 94px;
    height: 30px;
    background-image: url(/static/img/v2ex@2x.png);
    background-size: 94px 30px;
    background-repeat: no-repeat;
    display: inline-block;
}
</style>