<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="zhCN" :data-locale="dateZhCN">
    <n-modal v-model:show="visibleSettingsDialog" :style="bodyStyle" size="small" preset="card"
      class="userscript-settings-dialog" :bordered="false" title="脚本设置">
      <template #header>
        <header>脚本设置</header>
      </template>
      <n-tabs type="segment">
        <n-tab-pane name="background" tab="🎨 背景">
          <n-scrollbar class="userscript-settings-dialog-main">
            <n-form ref="formRef" :model="config" size="medium" label-placement="top">
              <tips>
                <div class="tips-row" style="display: flex; justify-content: space-between; align-items: center;">
                  <aside>
                    <n-space size="small">
                      <n-switch v-model:value="dynamicBackgroundImage" @update-value="onChangeDynamicBackgroundImage">
                        <template #checked>
                          🔀 随机背景
                        </template>
                        <template #unchecked>
                          📌 固定背景
                        </template>
                      </n-switch>
                    </n-space>
                  </aside>
                  <main>
                    <n-space size="small">
                      <n-button strong secondary type="info" size="small" :disabled="!dynamicBackgroundImage"
                        @click="application.emit('onUpdateBackgroundImage')">
                        🎲 刷新背景
                      </n-button>
                      <n-button strong secondary type="info" size="small" :disabled="!!config.bgColor"
                        @click="BackgroundImage.onOpenBackgroundImage">
                        🔍 查看背景
                      </n-button>
                    </n-space>
                  </main>
                </div>
              </tips>
              <n-form-item label="背景颜色(优先使用)" path="bgColor">
                <div style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
                  <n-color-picker style="width: calc(100% - 60px);" v-model:value="config.bgColor" :show-alpha="true"
                    :actions="['clear']" :on-complete="() => onChangeBgColor()" />
                  <n-button size="small" secondary type="info" style="width: 50px;"
                    @click="config.bgColor = '', onChangeBgColor()">清除</n-button>
                </div>
              </n-form-item>
              <n-form-item label="内置(百度皮肤)背景图片类目范围(点选)" path="categorys">
                <n-space size="small">
                  <n-tag v-for="(ids, category) in BackgroundImage.IMG_CATEGORYS"
                    :checked="config.categorys.includes(category)" checkable type="warning"
                    :on-update-checked="(checked: boolean) => onUpdateCheckedCategory(category, checked)">
                    {{ category }}
                  </n-tag>
                </n-space>
              </n-form-item>
              <n-form-item label="自定义背景图片[待修改]" path="bgColor">
                <custom-image v-model:url="config.customUrl"></custom-image>
              </n-form-item>
            </n-form>
          </n-scrollbar>
        </n-tab-pane>

        <n-tab-pane name="page" tab="📃 页面">
          <n-scrollbar class="userscript-settings-dialog-main">
            <n-form ref="formRef" :model="config" size="medium" label-placement="top">
              <n-form-item label="是否显示目录栏" path="showCatalogue">
                <section style="width: 100%;">
                  <tips>
                    <div class="tips-row">
                      开启之后会显示文章目录(若存在)
                    </div>
                  </tips>
                  <n-switch v-model:value="config.showCatalogue" @update-value="onChange('showCatalogue')">
                    <template #checked>
                      显示
                    </template>
                    <template #unchecked>
                      隐藏
                    </template>
                  </n-switch>
                </section>
              </n-form-item>
              <n-form-item label="是否显示 设置(小齿轮)按钮" path="showSourceLink">
                <section style="width: 100%;">
                  <tips>
                    <div class="tips-row">
                      隐藏之后设置(小齿轮)按钮会与回到顶部按钮同步显示和隐藏
                    </div>
                  </tips>
                  <n-switch v-model:value="config.defaultShowMenu" @update-value="onChange('defaultShowMenu')">
                    <template #checked>
                      显示
                    </template>
                    <template #unchecked>
                      隐藏
                    </template>
                  </n-switch>
                </section>
              </n-form-item>
              <n-form-item label="是否显示 原文链接" path="showSourceLink">
                <section style="width: 100%;">
                  <tips>
                    <div class="tips-row">
                      原文链接从顶部文章信息或原文中提取, 若作者直接文中写入原文链接(未在文章信息中标注), 有可能会匹配错误
                    </div>
                  </tips>
                  <n-switch v-model:value="config.showSourceLink" @update-value="onChange('showSourceLink')">
                    <template #checked>
                      显示
                    </template>
                    <template #unchecked>
                      隐藏
                    </template>
                  </n-switch>
                </section>
              </n-form-item>
              <n-form-item label="文章宽度[待修改]" path="articleWeightRate">
                <section style="width: 100%;">
                  <tips>
                    <div class="tips-row">
                      宽度基于源码中的 .container 的宽度, 详见 <a target="_blank" href="https://github.com/SublimeCT/greasy_monkey_scripts/issues/4#issuecomment-675349913">#4</a>
                    </div>
                  </tips>
                  <section style="width: calc(100% - 20px); margin: 0 10px;">
                    <n-slider v-model:value="config.articleWeightRate" :marks="{ 0: '0%', 50: '50%', 100: '100%' }" @update-value="onChange('articleWeightRate')" />
                  </section>
                </section>
              </n-form-item>
            </n-form>
          </n-scrollbar>
        </n-tab-pane>
        <n-tab-pane name="about" tab="💡 关于">
          <n-scrollbar class="userscript-settings-dialog-main">
            <a href="https://github.com/SublimeCT/csdn-reading-mode" target="_blank" class="link">GitHub</a>
          </n-scrollbar>
        </n-tab-pane>
      </n-tabs>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
import { StyleValue, ref } from 'vue';
import { NTag, NScrollbar, NSlider, NSpace, NSwitch, NModal, NForm, NFormItem, NColorPicker, NButton, NConfigProvider, NTabs, NTabPane } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { Application } from '../Application';
import { BackgroundImage } from '../utils/BackgroundImage';
import { config, visibleSettingsDialog } from '../State'
import { ScriptConfig } from '../ScriptConfig';
import CustomImage from './CustomImage.vue'
import { zhCN, dateZhCN } from 'naive-ui'
import Tips from './Tips.vue'

const bodyStyle: StyleValue = { width: '600px' }

const application = Application.application

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#fd9841',
    primaryColorHover: '#ffb97c',
    primaryColorPressed: '#ff871f',
  },
}

/**
 * 监听配置项更新并触发钩子函数, 在 `Plugins` 中进行处理
 * @param field 更新的属性名称
 */
const onChange = (field: keyof ScriptConfig) => application.emitConfigChanged(field)

const onUpdateCheckedCategory = (category: string, checked: boolean) => {
  if (checked && !config.categorys.includes(category)) {
    config.categorys.push(category)
  } else {
    config.categorys = config.categorys.filter(c => c !== category)
  }
  onChange('categorys')
}

const onChangeBgColor = () => {
  onChange('bgColor')
  // 若背景颜色清空则刷新背景图片
  if (!config.bgColor) application.emit('onUpdateBackgroundImage')
}

/** 是否使用随机背景 */
const dynamicBackgroundImage = ref(!config.fixedImageId)
/** 修改是否使用随机背景 */
const onChangeDynamicBackgroundImage = () => {
  application.emit('onChangeDynamicBackground', dynamicBackgroundImage.value)
  if (dynamicBackgroundImage.value) {
    application.emit('onUpdateBackgroundImage')
  }
}
</script>

<style lang="scss">
.userscript-settings-dialog {

  main,
  aside {
    margin: 0;
  }

  .n-form-item-label {
    position: relative;
  }

  .n-form-item-label::before {
    content: "";
    width: 3px;
    height: 62%;
    display: block;
    background-color: var(--n-feedback-text-color-warning);
    border-radius: calc(var(--n-bar-width) / 2);
    transition: background-color .3s var(--n-bezier);
    left: -8px;
    top: 0;
    bottom: 0;
    position: absolute;
  }

  .n-form-item-label span {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 5px;
    /* text-indent: -3px; */
  }

  .link {
    color: #2080f0;
  }

  .n-card__content {
    padding: 0;
    padding-bottom: 0;
  }

  .n-tabs-nav {
    padding: 0 var(--userscript-dialog-padding);
  }

  .n-form-item-label span::after {
    content: ":";
  }

  .userscript-settings-dialog-main {
    width: 100%;
    height: 60vh;
    margin: 0;
    padding: 0 var(--userscript-dialog-padding);
    padding-left: 7px;
    overflow-y: auto;

    .n-scrollbar-container {
      padding-left: 8px;
    }
  }
}
</style>
