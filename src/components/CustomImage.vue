<template>
  <section style="width: 100%;">
    <header style="margin-bottom: 10px;">
      <n-h6 prefix="bar" align-text class="tips">
        <p class="tips-row">
          <!-- <svg t="1698559432281" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11607" width="200" height="200"><path d="M512 0C229.256533 0 0 229.256533 0 512s229.256533 512 512 512 512-229.256533 512-512S794.743467 0 512 0zM512 938.666667C276.3264 938.666667 85.333333 747.6736 85.333333 512S276.3264 85.333333 512 85.333333s426.666667 190.993067 426.666667 426.666667S747.6736 938.666667 512 938.666667z" p-id="11608"></path><path d="M512 426.666667c47.172267 0 85.333333 38.161067 85.333333 85.333333l0 256c0 47.172267-38.161067 85.333333-85.333333 85.333333s-85.333333-38.161067-85.333333-85.333333L426.666667 512C426.666667 464.827733 464.827733 426.666667 512 426.666667z" p-id="11609"></path><path d="M512 170.666667c47.172267 0 85.333333 38.161067 85.333333 85.333333s-38.161067 85.333333-85.333333 85.333333-85.333333-38.161067-85.333333-85.333333S464.827733 170.666667 512 170.666667z" p-id="11610"></path></svg> -->
          所有文件都只会保存到本地浏览器中(<a style="color: #f0a020;" href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API">indexeddb</a>), 不会上传到外部服务器 :)
        </p>
        <p class="tips-row" v-show="isUploading">
          <span style="color: #f0a020;">正在保存中, 请不要关闭窗口 ...</span>
          <n-progress
            type="line"
            :percentage="percentage"
            :indicator-placement="'inside'"
            processing
          />
        </p>
      </n-h6>
    </header>
    <n-upload
      ref="uploadRef"
      accept="image/*"
      :multiple="true"
      :default-file-list="images"
      :custom-request="customRequest"
      @change="onChange"
      @remove="onRemove"
      @preview="onPreview"
      @before-upload="onBeforeUpload"
      @finish="onFinished"
      :show-preview-button="true"
      list-type="image-card">
      选择文件
    </n-upload>
    <footer style="margin-top: 10px;">
      <n-button strong secondary type="error" size="small" @click="removeAll">
        删除所有图片
      </n-button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { NUpload, NH6, NProgress, NButton, type UploadFileInfo } from 'naive-ui';
import type { CustomRequestOptions, OnChange, OnFinish, SettledFileInfo } from 'naive-ui/es/upload/src/interface';
import { CustomBackgroundImage } from '../utils/BackgroundImage';
import { Application } from '../Application';
import { ref } from 'vue';
import { DB, DBTable } from '../utils/AppStorage';

const props = defineProps<{
  url: string
}>()

const uploadRef = ref<InstanceType<typeof NUpload>>()
const images = CustomBackgroundImage.images

// 从 indexeddb 中取出所有背景图
CustomBackgroundImage.getImages()

const customRequest = async (options: CustomRequestOptions) => {
  if (!options.file.file) return console.warn('Missing Image file')
  await CustomBackgroundImage.save(options)
}

const onRemove = (data: { file: SettledFileInfo, fileList: SettledFileInfo[] }) => {
  console.log('onRemove', data)
  CustomBackgroundImage.remove(data.file)
}

const onPreview = async (file: SettledFileInfo) => {
  const fileRecord = await DB.get<{ file: File }>(DBTable.BackgroundImageFiles, file.id)
  file.url = URL.createObjectURL(fileRecord.file)
  Application.application.emitPreviewImage(file.url)
  console.log('onPreview', file)
}

const onChange: OnChange = data => {
  // console.warn('onChange', data.fileList.length)
  // Object.assign(images, data.fileList)
  images.value = data.fileList
}

let isUploading = ref(false)
const percentage = ref(0)

const onBeforeUpload = () => {
  if (!isUploading.value) {
    isUploading.value = true
    console.time('上传所有图片')
    percentage.value = 0
  }
}

const onFinished: OnFinish = ({ file, event }) => {
  let allFinished = true
  let uploadedCount = 0
  for (const img of images.value) {
    if (img.id === file.id || img.status === 'finished') {
      uploadedCount++
    } else {
      allFinished = false
      break
    }
  }
  percentage.value = Number((uploadedCount / images.value.length * 100).toFixed(2))
  // console.log(file, file.status, event, allFinished, images)
  if (allFinished) {
    isUploading.value = false
    console.timeEnd('上传所有图片')
    percentage.value = 100
  }
}

const removeAll = async () => {
  await CustomBackgroundImage.clear()
  uploadRef.value?.clear()
}
</script>

<style scoped>
.tips {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}
.tips-row {
  display: block;
  transition: 0.2s all ease-in-out;
}
</style>