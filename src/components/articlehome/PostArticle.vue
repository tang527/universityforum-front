<template>
    <div>
        <Top />
        <div id="Wrapper">
            <div class="content">
                <div id="Leftbar"></div>
                <div id="Rightbar">
                    <div class="sep20"></div>
                    <div class="box">
                        <div class="cell">发帖提示</div>
                        <div class="inner">
                            <ul style="margin-top: 0px;">
                                <li>
                                    <span class="f13">主题标题</span>
                                    <div class="sep10"></div>
                                    请在标题中描述内容要点。
                                    <div class="sep10"></div>
                                </li>
                                <li>
                                    <div class="fr" style="margin-top: -5px; margin-right: 5px;"></div>
                                    <span class="f13">正文</span>
                                    <div class="sep10"></div>
                                    可以在正文中为你要发布的主题添加更多细节。
                                    <div class="sep10"></div>
                                </li>
                                <li>
                                    <span class="f13">选择板块</span>
                                    <div class="sep10"></div>
                                    在最后，请为你的主题选择一个板块。恰当的归类会让你发布的信息更加有用。
                                    <div class="sep10"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="sep20"></div>
                    <div class="box">
                        <div class="cell">论坛原则</div>
                        <div class="inner">
                            <ul style="margin-top: 0px;">
                                <li>
                                    <span class="f13">尊重原创</span>
                                    <div class="sep10"></div>
                                    请不要在该论坛发布任何盗版下载链接，包括软件、音乐、电影等等。
                                    <div class="sep10"></div>
                                </li>
                                <li>
                                    <span class="f13">友好互助</span>
                                    <div class="sep10"></div>
                                    保持对陌生人的友善。用知识去帮助别人。
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="Main">
                    <div class="sep20"></div>
                    <div class="box" id="box">
                        <div class="cell">
                            <a href="/">{{ $store.state.user.userName }}</a>
                            <span class="chevron">&nbsp;›&nbsp;</span> 发表新帖
                        </div>
                        <div>
                            <div class="cell">
                                <div class="fr fade" id="title_remaining">请输入50个以内的字符</div>
                                帖子标题
                            </div>
                            <div class="cell" style="padding: 0px;">
                                <el-input
                                    maxlength="50"
                                    show-word-limit
                                    v-model="title"
                                    type="text"
                                    placeholder="请输入帖子标题，如果标题能够表达完整内容，则正文可以为空"
                                ></el-input>
                            </div>
                            <div class="cell">
                                正文
                            </div>

                            <Editor ref="editor" />

                            <div class="cell">
                                <div class="fr fade">请选择合适的版块发表</div>
                                <el-select class="type-select" v-model="activeType" placeholder="请选择要发表的版块">
                                    <el-option v-for="item in articleTypes" :value="item.typeId" :key="item.typeId" :label="item.typeName"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="fr">
                                <button type="button" class="super normal button" @click="postArticle">
                                    <li class="fa fa-paper-plane"></li>
                                    &nbsp;发布
                                </button>
                            </div>
                            <button @click="preview" class="super normal button">
                                <li class="fa fa-eye"></li>
                                &nbsp;预览
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="c"></div>
            <div class="sep20"></div>
        </div>
        <div id="Bottom">
            <div class="content">
                <div class="inner">
                    <div class="sep10"></div>
                    <div class="fr">
                        <a href="https://www.digitalocean.com/?refcode=1b51f1a7651d" target="_blank">
                            <div id="DigitalOcean"></div>
                        </a>
                    </div>
                    <strong>
                        <a href="/about" class="dark" target="_self">关于</a> &nbsp; <span class="snow">·</span> &nbsp;
                        <a href="/faq" class="dark" target="_self">FAQ</a> &nbsp; <span class="snow">·</span> &nbsp;
                        <a href="/p/7v9TEc53" class="dark" target="_self">API</a> &nbsp; <span class="snow">·</span> &nbsp;
                        <a href="/mission" class="dark" target="_self">我们的愿景</a>
                        &nbsp;
                        <span class="snow">·</span> &nbsp;
                        <a href="/advertise/2019.html" class="dark" target="_self">感谢</a>
                        &nbsp;
                    </strong>
                    &nbsp;
                    <div class="sep20"></div>
                    创意工作者们的社区
                    <div class="sep5"></div>
                    World is powered by solitude
                    <div class="sep20"></div>
                    <span class="small fade"> <br />♥ Do have faith in what you're doing. </span>
                    <div class="sep10"></div>
                </div>
            </div>
        </div>
        <el-drawer :title="title" :visible.sync="previewVisible" direction="ttb">
            <div class="preview-drawer" v-html="previewData"></div>
        </el-drawer>
    </div>
</template>



<script>
import { getAllArticleType } from '@/api/article';
import { createArticle } from '@/api/article';
import { isStrEmpty } from '@/utils/util';
import Top from '@/components/common/Top';
import Editor from '@/components/common/Editor';
export default {
    data() {
        return {
            select: '',
            title: '',
            text: '',
            userId: '',
            articleTypes: [
                {
                    typeId: 0,
                    typeCreateTime: '',
                    typeName: '测试',
                    typeDesc: ''
                }
            ],
            activeType: 1,
            previewVisible: false,
            previewData: ''
        };
    },
    mounted() {
        this.getData();
        console.log(this.$refs);
    },
    methods: {
        getData() {
            this.getTypeList();
        },
        getTypeList() {
            getAllArticleType().then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.articleTypes = res.data;
                } else {
                    this.$message.error(res.message);
                }
            });
            // 有可能是从type页面跳转过来，尝试获取typeId
            if (this.$route.query.typeId) {
                this.activeType = this.$route.query.typeId;
            }
        },
        preview() {
            if (this.validatePost({ artTitle: this.title, artContent: this.$refs.editor.editorData })) {
                this.previewData = this.$refs.editor.editorData;
                // 不知为何这个drawer上面有一个内联样式height:30%我无法修改，只能通过js手动改 目前该样式设置于 App.vue
                this.previewVisible = true;
            } else {
                return;
            }
        },
        postArticle() {
            let article = {
                artTitle: this.title,
                artContent: this.$refs.editor.editorData,
                artTypeId: this.activeType
            };
            // 内容校验
            if (this.validatePost(article)) {
                // 发送请求
                createArticle(article).then(res => {
                    if (res.code == this.NET.SUCCESS_CODE) {
                        this.$message.success('帖子已经发布成功！');
                        // TODO 跳转到新发的帖子页面
                        // this.$router.push({
                        //     name: 'Details',
                        //     params: { artId: res.data }
                        // });
                    } else {
                        this.$message.error(res.message);
                    }
                });
            }
        },
        validatePost(article) {
            if (isStrEmpty(article.artTitle)) {
                this.$message.warning('帖子标题不能为空！');
                return false;
            } else if (isStrEmpty(article.artContent)) {
                this.$message.warning('帖子内容不能为空！');
                return false;
            }
            //TODO 需要防止XSS攻击
            return true;
        }
    },
    components: {
        Editor,
        Top
    }
};
</script>

<style scoped>
.fade {
    color: #ccc;
}

.type-select {
    width: 8rem;
    display: flex;
}
.type-select::after {
    content: '';
    display: block;
    clear: both;
}

style Attribute {
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    font-size: 14px;
    line-height: 120%;
}

#Bottom {
    border-top: 1px solid rgba(0, 0, 0, 0.22);
    background-color: var(--box-background-color);
    text-align: center;
    color: #999;
    padding: 0 10px;
}

#Top {
    text-align: center;
    background-color: var(--box-background-color);
    height: 44px;
    font-size: 15px;
    font-weight: 500;
    background-size: 44px 44px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.22);
    padding: 0 20px;
}
#Wrapper {
    background-color: #e2e2e2;
    background-image: url(/static/img/shadow_light.png);
    background-repeat: repeat-x;
}
#Top > .content {
    max-width: 1060px;
}
.content {
    min-width: 600px;
    max-width: 1100px;
    margin: 0 auto;
}
/* 控制drawer的样式 */
.ttb {
    height: 100% !important;
    bottom: 0 !important;
    overflow-y: auto;
}
.preview-drawer {
    padding: 2rem;
}

.c {
    clear: both;
}
.sep20 {
    height: 20px;
}
#Leftbar {
    width: 0;
    float: left;
}
#Rightbar {
    width: 270px;
    float: right;
    margin-right: 20px;
}
.fr {
    float: right;
    text-align: right;
}
#Main {
    width: auto;
    margin: 0 310px 0 20px;
}
.box {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e2e2e2;
}
.cell {
    padding: 10px;
    font-size: 14px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
}
.inner {
    padding: 10px;
    font-size: 14px;
    line-height: 150%;
    text-align: left;
}
ul {
    margin: 15px 0 15px 20px;
    padding: 0;
}
user agent stylesheet ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
user agent stylesheet li {
    display: list-item;
    text-align: -webkit-match-parent;
}
.f13 {
    font-size: 13px;
}
.sep10 {
    height: 10px;
}
form {
    display: block;
    margin-top: 0em;
}
element.style {
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    font-size: 14px;
    line-height: 120%;
}
input[type='hidden' i] {
    display: none;
    -webkit-appearance: initial;
    background-color: initial;
    cursor: default;
    padding: initial;
    border: initial;
}
#editor {
    position: relative;
    width: auto;
    height: 600px;
    font-size: 16px;
    line-height: 130%;
}
</style>