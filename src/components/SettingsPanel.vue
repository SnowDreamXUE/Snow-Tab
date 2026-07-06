<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const BG_KEY      = 'homepage_background'
const OPACITY_KEY = 'homepage_search_opacity'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'bg-change', value: string | null): void
  (e: 'opacity-change', value: number): void
}>()

const props = defineProps<{
  currentBg: string | null
  searchOpacity: number
}>()

const dragOver     = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)
const panelRef     = ref<HTMLElement | null>(null)
const localOpacity = ref(props.searchOpacity)

function onOpacityInput(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value)
  localOpacity.value = val
  localStorage.setItem(OPACITY_KEY, String(val))
  emit('opacity-change', val)
}

// 点击遮罩关闭
function onOverlayClick(e: MouseEvent) {
  if (panelRef.value && !panelRef.value.contains(e.target as Node)) {
    emit('close')
  }
}

// ESC 关闭
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})

// ===== 图片处理 =====
function handleFile(file: File) {
  if (!file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result as string
    localStorage.setItem(BG_KEY, result)
    emit('bg-change', result)
  }
  reader.readAsDataURL(file)
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) handleFile(input.files[0])
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  const file = e.dataTransfer?.files[0]
  if (file) handleFile(file)
}

function removeBg() {
  localStorage.removeItem(BG_KEY)
  emit('bg-change', null)
}
</script>

<template>
  <!-- 遮罩 -->
  <div class="overlay" aria-modal="true" role="dialog" aria-label="背景设置" @click="onOverlayClick">
    <!-- 面板 -->
    <aside ref="panelRef" class="panel slide-in">
      <div class="panel-header">
        <h2 class="panel-title">外观设置</h2>
        <button class="close-btn" aria-label="关闭" @click="emit('close')">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="panel-body">
        <!-- 搜索栏透明度 -->
        <div class="section">
          <div class="section-header">
            <span class="section-label">搜索栏透明度</span>
            <span class="section-value">{{ Math.round(localOpacity * 100) }}%</span>
          </div>
          <input
              type="range"
              class="opacity-slider"
              min="0.1"
              max="1"
              step="0.01"
              :value="localOpacity"
              aria-label="搜索栏背景透明度"
              @input="onOpacityInput"
          />
        </div>

        <div class="section-divider"></div>

        <!-- 背景图标题 -->
        <p class="section-label" style="margin-bottom: 12px;">背景图片</p>

        <!-- 上传区域 -->
        <div
            class="upload-zone"
            :class="{ 'drag-over': dragOver }"
            role="button"
            tabindex="0"
            aria-label="点击或拖拽上传背景图片"
            @click="fileInputRef?.click()"
            @keydown.enter="fileInputRef?.click()"
            @dragover.prevent="dragOver = true"
            @dragleave="dragOver = false"
            @drop.prevent="onDrop"
        >
          <svg class="upload-icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 4V18M14 4L9 9M14 4L19 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 22H24" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
          <p class="upload-main">点击或拖拽图片到此处</p>
          <p class="upload-sub">支持 JPG、PNG、WebP</p>
        </div>

        <input
            ref="fileInputRef"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            class="file-input-hidden"
            aria-hidden="true"
            tabindex="-1"
            @change="onFileChange"
        />

        <!-- 当前背景预览 -->
        <div v-if="currentBg" class="preview-section">
          <p class="section-label">当前背景</p>
          <div class="preview-row">
            <img :src="currentBg" alt="当前背景预览" class="preview-thumb" />
            <button class="remove-bg-btn" @click="removeBg">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M9.5 3.5L3.5 9.5M3.5 3.5L9.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              移除背景
            </button>
          </div>
        </div>

        <!-- 无背景提示 -->
        <div v-else class="no-bg-tip">
          <p>暂无自定义背景，上传图片后将应用为主页背景。</p>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* ===== 遮罩 ===== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

/* ===== 面板 ===== */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}

.slide-in {
  animation: slideIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.panel {
  width: 300px;
  max-width: 90vw;
  height: 100%;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px) saturate(1.6);
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  border-left: 1px solid rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.08);
}

/* ===== 面板头部 ===== */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
}

.panel-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: none;
  cursor: pointer;
  color: #888;
  transition: background 0.15s, color 0.15s;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  color: #333;
}

/* ===== 面板内容 ===== */
.panel-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ===== 上传区域 ===== */
.upload-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 20px;
  border: 1.5px dashed rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-align: center;
}

.upload-zone:hover,
.upload-zone:focus-visible {
  border-color: rgba(60, 100, 220, 0.4);
  background: rgba(60, 100, 220, 0.03);
  outline: none;
}

.upload-zone.drag-over {
  border-color: rgba(60, 100, 220, 0.6);
  background: rgba(60, 100, 220, 0.06);
}

.upload-icon {
  color: #bbb;
  margin-bottom: 4px;
}

.upload-main {
  font-size: 13px;
  font-weight: 500;
  color: #555;
}

.upload-sub {
  font-size: 11px;
  color: #aaa;
}

.file-input-hidden {
  display: none;
}

/* ===== 预览区域 ===== */
.section-label {
  font-size: 11px;
  font-weight: 500;
  color: #aaa;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.preview-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.preview-thumb {
  width: 64px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.remove-bg-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-family: inherit;
  color: #888;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.remove-bg-btn:hover {
  background: rgba(220, 50, 50, 0.07);
  color: #c44;
  border-color: rgba(220, 50, 50, 0.2);
}

/* ===== 无背景提示 ===== */
.no-bg-tip {
  font-size: 12px;
  color: #bbb;
  line-height: 1.6;
  padding: 4px 0;
}

/* ===== 透明度区块 ===== */
.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-value {
  font-size: 12px;
  font-weight: 500;
  color: #888;
  font-variant-numeric: tabular-nums;
}

.section-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: 4px 0;
}

/* range 滑块 */
.opacity-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 99px;
  background: rgba(0, 0, 0, 0.1);
  outline: none;
  cursor: pointer;
}

.opacity-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2b2b2b;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  transition: transform 0.15s;
}

.opacity-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

.opacity-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: #2b2b2b;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
  cursor: pointer;
}
</style>
