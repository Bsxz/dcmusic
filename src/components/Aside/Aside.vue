<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();

// 添加新歌单
function addSongList() {
  alert("添加歌单");
}
</script>
<template>
  <el-aside>
    <img class="logo" src="@/assets/logo.png" />
    <el-scrollbar max-height="92vh">
      <ul class="infinite-list">
        <el-menu router>
          <el-menu-item-group title="在线音乐">
            <el-menu-item
              index="/referral"
              :class="{ active: RegExp(/referral/).test(route.path) }"
              >推荐
            </el-menu-item>
            <el-menu-item
              index="/musiccore"
              :class="{ active: RegExp(/musiccore/).test(route.path) }"
              >音乐馆
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="我的音乐">
            <el-menu-item
              index="/ilike"
              :class="{ active: RegExp(/ilike/).test(route.path) }"
              >我喜欢
            </el-menu-item>
            <el-menu-item
              index="/collection"
              :class="{ active: RegExp(/collection/).test(route.path) }"
              >收藏
            </el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1">
            <template #title>
              <span>创建的歌单</span>
              <el-icon class="plus" @click.stop="addSongList()">
                <Plus />
              </el-icon>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="item in store.state.user.subcount.create"
                index="/songlistdetails"
                :route="{ path: '/songlistdetails', query: { id: item.id } }"
                :key="item.id"
                >{{ item.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2" class="collector">
            <template #title>
              <span>收藏的歌单</span>
              <el-icon class="plus">
                <Plus />
              </el-icon>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="item in store.state.user.subcount.collector"
                index="/songlistdetails"
                :route="{ path: '/songlistdetails', query: { id: item.id } }"
                :key="item.id"
                >{{ item.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </ul>
    </el-scrollbar>
  </el-aside>
</template>
<style lang="less" scoped>
.el-aside {
  width: @width;
  border-right: 1px solid #ccc;

  .logo {
    display: block;
    height: 60px;
    margin: 0 auto;
  }

  .el-scrollbar {
    .infinite-list {
      :deep(.el-menu) {
        border-right: none !important;
      }

      :deep(.el-menu-item-group) {
        .is-active {
          color: #000;
        }

        .el-menu-item {
          height: 36px;
          border-radius: 5px;
          width: 160px;
          margin: 0 auto;

          cursor: default;
          margin-bottom: 8px;

          &:nth-last-child(1) {
            margin-bottom: 25px;
          }

          &:hover {
            background-color: @hover;
          }
        }
      }

      :deep(.el-sub-menu) {
        margin-bottom: 25px;

        .el-sub-menu__title {
          height: 30px;
          padding: 7px 0 7px var(--el-menu-base-level-padding);
          line-height: normal;
          font-size: 12px;
          color: var(--el-text-color-secondary);

          &:hover {
            background-color: transparent;
            cursor: default;
          }

          span:hover {
            cursor: pointer;
            color: #000;
          }

          .plus {
            font-size: 14px;
            margin-left: 47px;

            &:hover {
              cursor: pointer;
              color: #000;
            }
          }

          .el-sub-menu__icon-arrow {
            font-size: 14px;

            &:hover {
              cursor: pointer;
              color: #000;
            }
          }
        }

        .el-menu-item-group {
          .el-menu-item-group__title {
            display: none;
          }

          .el-menu-item {
            min-width: 160px;
            padding-left: 20px;

            &:nth-last-child(1) {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
  :deep(.collector) {
    .el-menu-item-group {
      .el-menu-item {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
