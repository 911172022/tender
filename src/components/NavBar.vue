<template>
    <div class="nav container">
        <div class="nav-left">
            <img src="../assets/logo.png" alt />
            <span>广电系统线上采购一体化平台1</span>
        </div>
        <div class="right">
            <nav class="nav-right">
                <li v-for="(item, index) in navList" :key="index" @click="navClick(index)">{{item.name}}</li>
            </nav>
            <el-button icon="el-icon-search" class="" type="text" @click="searchShow">
                <input type="text" class="search" @blur="removeShow" />
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        navList: Array
    },
    methods: {
        navClick(index) {
            let lis = document.getElementsByTagName("li");
            lis.forEach((item, i) => {
                if (index === i) {
                    lis[i].style.cssText = "color: #f90;border-bottom: 2px solid #f90;";
                } else {
                    lis[i].style.cssText = "";
                }
            });
        },
        searchShow() {
            let search = document.querySelector(".search");
            let button = document.querySelector(".el-button");
            let searchBtn = document.querySelector(".el-icon-search");
            button.classList.add("button");
            searchBtn.classList.add("search-btn");
            search.classList.add("search-in");
            search.focus();
        },
        removeShow() {
            let search = document.querySelector(".search");
            let button = document.querySelector(".el-button");
            let searchBtn = document.querySelector(".el-icon-search");
            button.classList.remove("button");
            searchBtn.classList.remove("search-btn");
            search.classList.remove("search-in");
        }
    },
    mounted() {
        let li = document.getElementsByTagName("li")[0];
        li.style.cssText = "color: #f90;border-bottom: 2px solid #f90;";
    }
};
</script>

<style lang="scss" scope>
.nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 90px;
    line-height: 90px;
    .nav-left {
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        img {
            max-height: 60px;
            margin-right: 15px;
        }
        span {
            font-size: 20px;
            font-weight: bold;
        }
    }
    .right {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .nav-right {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        li {
            font-size: 18px;
            margin-right: 20px;
            height: 65px;
            cursor: pointer;
            &:hover {
                color: #f90;
            }
        }
    }
    .el-button {
        width: 70px;
    }
    .el-icon-search {
        padding: 0 20px;
        height: 100%;
        font-size: 25px;
        color: #000;
    }
    .search {
        position: absolute;
        right: 0;
        top: 0;
        height: 40px;
        float: right;
        border-radius: 20px;
        width: 0px;
        padding: 0;
        border: 0px solid rgb(242, 242, 242);
        outline: none;
        color: #585858;
        background-color: rgb(242, 242, 242);
    }
}
.search-in {
    width: 400px !important;
    transition: width 1s !important;
    padding: 5px 5px 5px 20px !important;
    border: 2px solid rgb(242, 242, 242) !important;
}
.button {
    position: relative;
    left: 0;
    top: 20%;
    width: 420px;
}
.search-btn {
    position: absolute;
    right: 0;
    top: 14px;
    z-index: 1;
}
</style>