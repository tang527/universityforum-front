<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent type-box">
            <article class="tile is-child box">
                <p class="subtitle">热门板块</p>

                <b-carousel>
                    <b-carousel-item v-for="(item, index) in hotArticleTypes" :key="index">
                        <section>
                            <div class="hero-body has-text-centered">
                                <div class="card" v-loading="articleTypeLoading">
                                    <header class="card-header">
                                        <p class="card-header-title">版块名:{{ item.typeName }}</p>
                                        <a href="#" class="card-header-icon" aria-label="more options">
                                            <span class="icon">
                                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </a>
                                    </header>
                                    <div class="card-content">
                                        <div class="card-left">
                                            <!-- 注意此处自定义指令real-img才是真实图片地址 -->
                                            <img class="card-image" :src="defaultImg" v-real-img="item.typeImg" />
                                        </div>
                                        <div>
                                            <span>
                                                简介:
                                                <br />
                                                {{ item.typeDesc }}
                                            </span>
                                        </div>
                                    </div>
                                    <footer class="card-footer">
                                        <a href="#" @click="typeDetails(item.typeId)" class="card-footer-item">进入板块</a>
                                    </footer>
                                </div>
                            </div>
                        </section>
                    </b-carousel-item>
                </b-carousel>
            </article>
        </div>
        <div class="tile is-parent is-8">
            <article class="tile is-child box">
                <p align="right">
                    <el-radio-group v-model="articleViewKind" size="medium" @change="changeViewKind">
                        <el-radio-button label="hot" border>最热</el-radio-button>
                        <el-radio-button label="new" border>最新</el-radio-button>
                    </el-radio-group>
                </p>
                <div v-loading="articleLoading">
                    <p class="subtitle">{{ articleViewTitle }}</p>
                    <div class="slide">
                        <div class="box card_list" v-for="(item, i) in articleList" :key="i">
                            <article class="media">
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <span class="article-title">{{ item.artTitle }}</span>
                                            <br />
                                        </p>
                                    </div>
                                    <nav class="level is-mobile">
                                        <div class="level-left">
                                            <span>发贴用户：</span>
                                            <a class="level-item">
                                                <span class="icon is-small">
                                                    <i class="el-icon-user-solid"></i>
                                                    
                                                </span>
                                                {{ item.artUserName }}
                                            </a>
                                            <span>所在版块：</span>
                                            <a class="level-item">
                                                <span class="icon is-small">
                                                    <i class="el-icon-s-cooperation"></i>
                                                </span>
                                                    {{ item.artTypeName }}
                                                
                                            </a>
                                            <span>最近更新：</span>
                                            <a class="level-item" style="width: 200px">
                                                <span class="icon is-small">
                                                    <i class="el-icon-s-promotion"></i>
                                                </span>
                                                    {{ item.artUpdated }}
                                                
                                            </a>
                                        </div>
                                    </nav>
                                    <nav class="level is-mobile">
                                        <div class="level-left">
                                            <span>浏览量<span class="span-blank"></span>：</span>
                                            <a class="level-item">
                                                <span class="icon is-small">
                                                    <i class="el-icon-s-data"></i>
                                                    
                                                </span>
                                                {{ item.artViewNum }}
                                            </a>
                                            <span>评论数<span class="span-blank"></span>：</span>
                                            <a class="level-item">
                                                <span class="icon is-small">
                                                    <i class="el-icon-s-comment"></i>
                                                </span>
                                                    {{ item.artComNum }}
                                                
                                            </a>
                                            <span>点赞数<span class="span-blank"></span>：</span>
                                            <a @click="likeArt(item)" :class="{'level-item':true, 'high_light':item.liked}">
                                                <span class="icon is-small">
                                                    <i class="el-icon-caret-top"></i>
                                                </span>
                                                    {{ item.artLikeNum }}
                                                
                                            </a>
                                        </div>
                                    </nav>
                                </div>
                                <div class="btn-vertical">
                                        <el-button type="success" plain @click="details(item.artId)">查看详情</el-button>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import { getHotArticleType, likeArticle } from '@/api/article';
import { getHotArticle } from '@/api/article';
import { getNewArticle } from '@/api/article';

export default {
    data() {
        return {
            hotArticleTypes: [
                {
                    typeId: 0,
                    typeName: '',
                    typeCreateTime: '',
                    typeDesc: '',
                    typeImg: 'http://cdn.colonel.wang/forum/img/type/book.png',
                    typeLevel: 0,
                    articleNum: 0
                }
            ],
            articleTypeLoading: true,
            articleList: [
                {
                    artTitle: '测试用',
                    artHotNum: 0
                }
            ],
            articleViewKind: 'hot',
            articleViewTitle: '热门帖子',
            articleLoading: true,
            defaultImg: this.ASSET.TYPE_IMG_SRC
        };
    },
    created() {
        this.getData();
    },
    mounted() {

    },
    methods: {
        getData() {
            // 获取热门板块信息
            getHotArticleType().then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.hotArticleTypes = res.data;
                    this.articleTypeLoading = false;
                } else {
                    this.$message.error('获取热门板块失败');
                }
            });
            this.getArticleList();
        },
        // 切换最热与最新帖子时触发
        changeViewKind(val) {
            this.articleLoading = true;
            this.articleViewTitle = this.CONSTANT.ARTICLE_KIND_MAP[val];
            this.getArticleList();
        },
        // 根据articleViewKind的值获取数据
        getArticleList() {
            if (this.articleViewKind === 'hot') {
                getHotArticle().then(res => {
                    if (res.code == this.NET.SUCCESS_CODE) {
                        this.articleList = this.dealWithArticleList(res.data);
                        this.articleLoading = false;
                    } else {
                        this.$message.error(res.message);
                    }
                });
            } else if (this.articleViewKind === 'new') {
                getNewArticle().then(res => {
                    if (res.code == this.NET.SUCCESS_CODE) {
                        this.articleList = this.dealWithArticleList(res.data);
                        this.articleLoading = false;
                    } else {
                        this.$message.error(res.message);
                    }
                });
            }
        },
        dealWithArticleList(articles) {
            let likedList = this.$store.state.likeList;
            console.log(likedList);
            articles.forEach(article => {
                console.log(likedList.includes(article.artId));
                if(likedList.includes(article.artId)) {
                    article.liked = true;
                }
            });
            return articles;
        },
        allart() {
            this.$router.push('/allarticlehome');
        },
        details(artId) {
            this.$router.push({
                name: 'Details',
                params: { artId: artId }
            });
        },
        typeDetails(typeId) {
            this.$router.push({
                name: 'Article',
                params: {
                    typeId: typeId
                }
            });
        },
        likeArt(item) {
            if(item.liked) {
                this.$message.warning('您已经点过赞了！');
                return;
            }
            item.liked = true;
            console.log("进入了likeArt方法 artId:" + item.artId);
            likeArticle({artId: item.artId, artUserId: item.artUserId}).then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    item.artLikeNum += 1;
                    this.$store.commit('liked', item.artId);
                } else {
                    this.$message.error(res.message);
                }
            })
        }
    },
    components: {}
};
</script>

<style scoped>

div>a {
    width: 120px;
}
.span-blank {
    padding-left:1em;
}
.media {
    /* 此样式为了设置btn垂直居中 */
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items:center;/*指定垂直居中*/
}
.level-item {
    width: 150px;
    justify-content:left;
}
.card_list {
    /* content: ""; */
    margin-top: 20px;
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid rgb(100, 99, 99);
}
.card_list:hover {
    box-shadow: 0px 0px 5px 5px #9EB3EB;
    cursor: pointer;
}
.type-box {
    margin-left: 30px;

}
.slide {
    height: 300px;
    overflow-y: auto;
}
.card-image {
    display: inline;
    width: 40%;
}
.subtitle {
    text-align: left;
}
.button {
    text-align: center;
    margin: 0 auto;
}
.size {
    width: 64px;
    height: 64px;
}
.high_light {
    color: rgb(252,25,68);
}
</style>
