<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child box">
                <p class="subtitle">版块导航</p>

                <el-menu
                    :default-active="activeType"
                    class="el-menu-vertical-demo"
                    background-color="#1570AE"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    v-loading="typeLoading"
                >
                    <el-menu-item v-for="item in articleTypes" :key="item.typeId" :index="String(item.typeId)" @click="changeType(item.typeId)">
                        <span>{{item.typeName}}</span>
                    </el-menu-item>
                </el-menu>
            </article>
        </div>

        <div class="tile is-parent is-9">
            <article class="tile is-child box">
                <p align="right">
                    <el-select v-model="order" @change="changeOrder" clearable placeholder="请选择排序方式">
                        <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </p>

                <div class="slide" v-loading="articleLoading">
                    <div class="box card_list" v-for="(item, i) in articleList" :key="i">
                        <article class="media">
                            <div class="media-content">
                                <div>
                                    <p>
                                        <span class="article-title">{{ item.artTitle }}</span>
                                        <br />
                                    </p>
                                </div>
                                <nav class="level is-mobile">
                                    <div class="level-left">
                                        <!-- <span class="content">帖子内容：{{ item.artContent }}</span> -->
                                    </div>
                                </nav>
                                <nav class="level is-mobile">
                                    <div class="level-left">
                                        <span>发贴用户：</span>
                                        <a class="level-item">
                                            <span class="icon is-small">
                                                <i class="el-icon-user-solid"></i>
                                            </span>
                                            {{ item.artUserName }}
                                        </a>
                                        <span>最近更新：</span>
                                        <a class="level-item" style="width: 200px">
                                            <span class="icon is-small">
                                                <i class="el-icon-s-promotion"></i>
                                            </span>
                                            {{ item.artUpdated }}
                                        </a>
                                        <span>发帖时间：</span>
                                        <a class="level-item" style="width: 200px">
                                            <span class="icon is-small">
                                                <i class="el-icon-s-promotion"></i>
                                            </span>
                                            {{ item.artCreated }}
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
                                        <a class="level-item" style="width: 200px">
                                            <span class="icon is-small">
                                                <i class="el-icon-s-comment"></i>
                                            </span>
                                            {{ item.artComNum }}
                                        </a>
                                        <span>点赞数<span class="span-blank"></span>：</span>
                                        <a class="level-item">
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
                <div>
                    <!-- hide-on-sing-page单页时是否隐藏分页 -->
                    <el-pagination
                        :total="total"
                        :current-page.sync="pageNum"
                        :page-size="pageSize"
                        @current-change="changePageNum"
                        layout="prev, pager, next"
                        background
                        :hide-on-single-page="true"
                    ></el-pagination>
                </div>
            </article>
        </div>
    </div>
</template>


<script>
import { getAllArticleType } from '@/api/article';
import { getArticleByTypeId } from '@/api/article';
export default {
    data() {
        return {
            isLoading: true,
            busy: false,
            flag: 0,
            articleLoading: true,
            typeLoading: true,
            order: '',
            // 帖子总数
            total: 0,
            // 页面总数
            pages: 0,
            pageNum: 1,
            pageSize: 10,
            // 排序选择
            orderOptions: this.CONSTANT.ARTICLE_ORDER_OPT,
            articleList: [
                {
                    artTitle: '测试用',
                    artHotNum: 0
                }
            ],
            articleTypes: [
                {
                    typeId: 0,
                    typeCreateTime: '',
                    typeName: '测试',
                    typeDesc: ''
                }
            ],
            activeType: this.$route.params.typeId
        };
    },
    mounted() {
        this.getData();
    },

    methods: {
        getData() {
            let params = { type_id: this.$route.params.typeId, pageNum: this.pageNum, pageSize: this.pageSize };
            this.getArticle(params);
            getAllArticleType()
                .then(res => {
                    if (res.code == this.NET.SUCCESS_CODE) {
                        this.articleTypes = res.data;
                        this.typeLoading = false;
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch(() => {});
        },
        // 通过请求参数获取article 包括类型id、页码、排序方式等
        getArticle(order) {
            let params = { type_id: this.$route.params.typeId, order: order, pageNum: this.pageNum, pageSize: this.pageSize };
            getArticleByTypeId(params).then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.articleList = res.data.list;
                    this.total = res.data.total;
                    this.pageNum = res.data.pageNum;
                    this.pageSize = res.data.pageSize;
                    this.pages = res.data.pages;
                    this.articleLoading = false;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        changeOrder(val) {
            this.getArticle(val);
        },
        changePageNum() {
            this.getArticle(this.order);
        },
        changeType(typeId) {
            this.$router.push({
                name: "Article",
                params: { typeId: typeId }
            });
            // 初始化页码和order方式
            this.pageNum = 1;
            this.order = '';
            this.getData();
        },
        details(artId) {
            this.$router.push({
                name: 'Details',
                params: { artId: artId }
            });
        }
    },
    created() {
        // this.loadMore();
    }
};
</script>

<style scoped>
.slide {
    height: 600px;
    overflow-y: auto;
}
div > a {
    width: 120px;
}
/* 此处设置帖子内容超过单行显示... width设置即为超出此宽度显示... */
.content {
    width: 700px;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.span-blank {
    padding-left: 1em;
}
.media {
    /* 此样式为了设置btn垂直居中 */
    display: flex; /*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items: center; /*指定垂直居中*/
}
.level-item {
    width: 150px;
    justify-content: left;
}
/* 此处设置首页卡片列表 */
.card_list {
    /* content: ""; */
    margin-top: 20px;
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid rgb(100, 99, 99);
}
.card_list:hover {
    box-shadow: 0px 0px 5px 5px #9eb3eb;
    cursor: pointer;
}
.size {
    width: 64px;
    height: 64px;
}
</style>