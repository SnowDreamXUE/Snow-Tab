<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// ===== 搜索引擎配置 =====
interface Engine {
  name: string
  label: string
  url: string
  placeholder: string
  iconColor: string
  iconSvg: string
}

const ENGINES: Engine[] = [
  {
    name: 'bing',
    label: 'Bing',
    url: 'https://www.bing.com/search?q=',
    placeholder: '在 Bing 上搜索...',
    iconColor: '#0078D4',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
       <path d="M11.97 7.569a.92.92 0 00-.805.863c-.013.195-.01.209.43 1.347 1 2.59 1.242 3.214 1.283 3.302.099.213.237.413.41.592.134.138.222.212.37.311.26.176.39.224 1.405.527.989.295 1.529.49 1.994.723.603.302 1.024.644 1.29 1.051.191.292.36.815.434 1.342.029.206.029.661 0 .847a2.491 2.491 0 01-.376 1.026c-.1.151-.065.126.081-.058.415-.52.838-1.408 1.054-2.213a6.728 6.728 0 00.102-3.012 6.626 6.626 0 00-3.291-4.53 104.157 104.157 0 00-1.322-.698l-.254-.133a737.941 737.941 0 01-1.575-.827c-.548-.29-.78-.406-.846-.426a1.376 1.376 0 00-.29-.045l-.093.01z" fill="url(#lobe-icons-bing-0-_R_0_)"></path><path d="M13.164 17.24a4.385 4.385 0 00-.202.125 511.45 511.45 0 00-1.795 1.115 163.087 163.087 0 01-.989.614l-.463.288a99.198 99.198 0 01-1.502.941c-.326.2-.704.334-1.09.387-.18.024-.52.024-.7 0a2.807 2.807 0 01-1.318-.538 3.665 3.665 0 01-.543-.545 2.837 2.837 0 01-.506-1.141 2.161 2.161 0 00-.041-.182c-.008-.008.006.138.032.33.027.199.085.487.147.733.482 1.907 1.85 3.457 3.705 4.195a6.31 6.31 0 001.658.412c.22.025.844.035 1.074.017 1.054-.08 1.972-.393 2.913-.992a325.28 325.28 0 01.937-.596l.384-.244.684-.435.234-.149.009-.005.025-.017.013-.007.172-.11.597-.38c.76-.481.987-.65 1.34-.998.148-.146.37-.394.381-.425.002-.007.042-.068.088-.136a2.49 2.49 0 00.373-1.023 4.181 4.181 0 000-.847 4.336 4.336 0 00-.318-1.137c-.224-.472-.7-.9-1.383-1.245a2.972 2.972 0 00-.406-.181c-.01 0-.646.392-1.413.87a7089.171 7089.171 0 00-1.658 1.031l-.439.274z" fill="url(#lobe-icons-bing-1-_R_0_)" fill-rule="nonzero"></path><path d="M4.003 14.946l.004 3.33.042.193c.134.604.366 1.04.77 1.445a2.701 2.701 0 001.955.814c.536 0 1-.135 1.479-.43l.703-.435.556-.346V8.003c0-2.306-.004-3.675-.012-3.782a2.734 2.734 0 00-.797-1.765c-.145-.144-.268-.24-.637-.496A1780.102 1780.102 0 015.762.362C5.406.115 5.38.098 5.271.059a.943.943 0 00-1.254.696C4.003.818 4 1.659 4 6.223v5.394H4l.003 3.329z" fill="url(#lobe-icons-bing-2-_R_0_)" fill-rule="nonzero"></path>
       <defs><radialGradient cx="93.717%" cy="77.818%" fx="93.717%" fy="77.818%" gradientTransform="scale(-1 -.7146) rotate(49.288 2.035 -2.198)" id="lobe-icons-bing-0-_R_0_" r="143.691%"><stop offset="0%" stop-color="#00CACC"></stop><stop offset="100%" stop-color="#048FCE"></stop></radialGradient><radialGradient cx="13.893%" cy="71.448%" fx="13.893%" fy="71.448%" gradientTransform="scale(.6042 1) rotate(-23.34 .184 .494)" id="lobe-icons-bing-1-_R_0_" r="149.21%"><stop offset="0%" stop-color="#00BBEC"></stop><stop offset="100%" stop-color="#2756A9"></stop></radialGradient><linearGradient id="lobe-icons-bing-2-_R_0_" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#00BBEC"></stop><stop offset="100%" stop-color="#2756A9"></stop></linearGradient></defs>
    </svg>`,
  },
  {
    name: 'google',
    label: 'Google',
    url: 'https://www.google.com/search?q=',
    placeholder: '在 Google 上搜索...',
    iconColor: '#4285F4',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>`,
  },
  {
    name: 'baidu',
    label: '百度',
    url: 'https://www.baidu.com/s?wd=',
    placeholder: '在百度上搜索...',
    iconColor: '#2932E1',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M8.859 11.735c1.017-1.71 4.059-3.083 6.202.286 1.579 2.284 4.284 4.397 4.284 4.397s2.027 1.601.73 4.684c-1.24 2.956-5.64 1.607-6.005 1.49l-.024-.009s-1.746-.568-3.776-.112c-2.026.458-3.773.286-3.773.286l-.045-.001c-.328-.01-2.38-.187-3.001-2.968-.675-3.028 2.365-4.687 2.592-4.968.226-.288 1.802-1.37 2.816-3.085zm.986 1.738v2.032h-1.64s-1.64.138-2.213 2.014c-.2 1.252.177 1.99.242 2.148.067.157.596 1.073 1.927 1.342h3.078v-7.514l-1.394-.022zm3.588 2.191l-1.44.024v3.956s.064.985 1.44 1.344h3.541v-5.3h-1.528v3.979h-1.46s-.466-.068-.553-.447v-3.556zM9.82 16.715v3.06H8.58s-.863-.045-1.126-1.049c-.136-.445.02-.959.088-1.16.063-.203.353-.671.951-.85H9.82zm9.525-9.036c2.086 0 2.646 2.06 2.646 2.742 0 .688.284 3.597-2.309 3.655-2.595.057-2.704-1.77-2.704-3.08 0-1.374.277-3.317 2.367-3.317zM4.24 6.08c1.523-.135 2.645 1.55 2.762 2.513.07.625.393 3.486-1.975 4-2.364.515-3.244-2.249-2.984-3.544 0 0 .28-2.797 2.197-2.969zm8.847-1.483c.14-1.31 1.69-3.316 2.931-3.028 1.236.285 2.367 1.944 2.137 3.37-.224 1.428-1.345 3.313-3.095 3.082-1.748-.226-2.143-1.823-1.973-3.424zM9.425 1c1.307 0 2.364 1.519 2.364 3.398 0 1.879-1.057 3.4-2.364 3.4s-2.367-1.521-2.367-3.4C7.058 2.518 8.118 1 9.425 1z" fill="#2932E1" fill-rule="nonzero"></path>
    </svg>`,
  },
  {
    name: 'github',
    label: 'GitHub',
    url: 'https://github.com/search?q=',
    placeholder: '在 GitHub 上搜索...',
    iconColor: '#24292f',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#24292f"/>
    </svg>`,
  },
]

const HISTORY_KEY = 'homepage_search_history'
const ENGINE_KEY  = 'homepage_engine'
const MAX_HISTORY = 30

// ===== Props =====
const props = defineProps<{
  opacity: number
}>()

// ===== 状态 =====
const query        = ref('')
const engineIndex  = ref(0)
const showEngines  = ref(false)
const showHistory  = ref(false)
const historyList  = ref<string[]>([])
const containerRef = ref<HTMLElement | null>(null)
const inputRef     = ref<HTMLInputElement | null>(null)

const currentEngine = computed(() => ENGINES[engineIndex.value])

const filteredHistory = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return historyList.value
  return historyList.value.filter(h => h.toLowerCase().includes(q))
})

const boxBg = computed(() => `rgba(255, 255, 255, ${props.opacity})`)
const dropdownBg = computed(() => {
  const base = Math.max(props.opacity, 0.88)
  return `rgba(255, 255, 255, ${base})`
})

// ===== 持久化 =====
onMounted(() => {
  const savedEngine = localStorage.getItem(ENGINE_KEY)
  if (savedEngine) {
    const idx = ENGINES.findIndex(e => e.name === savedEngine)
    if (idx !== -1) engineIndex.value = idx
  }

  const savedHistory = localStorage.getItem(HISTORY_KEY)
  if (savedHistory) {
    try { historyList.value = JSON.parse(savedHistory) } catch { /* ignore */ }
  }

  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(historyList.value))
}

function saveEngine() {
  localStorage.setItem(ENGINE_KEY, currentEngine.value.name)
}

// ===== 搜索 =====
function doSearch() {
  const q = query.value.trim()
  if (!q) return
  historyList.value = [q, ...historyList.value.filter(h => h !== q)].slice(0, MAX_HISTORY)
  saveHistory()
  window.location.href = currentEngine.value.url + encodeURIComponent(q)
  showHistory.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !(e as any).isComposing) doSearch()
  if (e.key === 'Escape') {
    showHistory.value = false
    inputRef.value?.blur()
  }
}

// ===== 历史记录 =====
function selectHistory(item: string) {
  query.value = item
  showHistory.value = false
  inputRef.value?.focus()
}

function removeHistory(item: string) {
  historyList.value = historyList.value.filter(h => h !== item)
  saveHistory()
}

function clearHistory() {
  historyList.value = []
  saveHistory()
  showHistory.value = false
}

// ===== 引擎切换 =====
// 修复：切换引擎后关闭所有面板并取消输入框焦点
function selectEngine(idx: number) {
  engineIndex.value = idx
  saveEngine()
  showEngines.value = false
  showHistory.value = false
  inputRef.value?.blur()
}

// ===== 点击外部关闭 =====
// 修复：点击外部区域时也让输入框失去焦点
function handleOutsideClick(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    showHistory.value = false
    showEngines.value = false
    inputRef.value?.blur()
  }
}

// 修复：只要存在历史记录，就允许展示下拉面板（不受当前输入内容是否匹配的影响）
function onFocus() {
  if (historyList.value.length > 0) {
    showHistory.value = true
  }
}

function onInput() {
  if (historyList.value.length > 0) {
    showHistory.value = true
  }
}
</script>

<template>
  <div ref="containerRef" class="search-wrapper fade-up" style="animation-delay: 0.05s">
    <!-- 搜索框主体 -->
    <div
        class="search-box"
        :class="{ focused: showHistory || showEngines }"
        :style="{ background: boxBg }"
    >
      <!-- 引擎图标按钮 -->
      <button
          class="engine-btn"
          :aria-label="`当前引擎：${currentEngine.label}，点击切换`"
          @click.stop="showEngines = !showEngines; showHistory = false"
      >
        <span class="engine-favicon" aria-hidden="true" v-html="currentEngine.iconSvg"></span>
        <svg class="chevron" :class="{ open: showEngines }" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 3.5L5 6.5L8.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="divider" aria-hidden="true"></div>

      <!-- 输入框 -->
      <input
          ref="inputRef"
          v-model="query"
          type="search"
          class="search-input"
          :placeholder="currentEngine.placeholder"
          autocomplete="off"
          spellcheck="false"
          @focus="onFocus"
          @input="onInput"
          @keydown="onKeydown"
      />

      <!-- 清空按钮 -->
      <button
          v-if="query"
          class="clear-btn"
          aria-label="清空输入"
          @click="query = ''; inputRef?.focus()"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- 搜索按钮 -->
      <button class="search-btn" aria-label="搜索" @click="doSearch">
        <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.7"/>
          <path d="M12.5 12.5L15.5 15.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- 引擎下拉列表 -->
    <div
        v-if="showEngines"
        class="dropdown engine-dropdown slide-down"
        :style="{ background: dropdownBg }"
        role="listbox"
        aria-label="搜索引擎列表"
    >
      <!-- 修复：增加 .stop 阻止冒泡导致的外部点击检测误触 -->
      <button
          v-for="(engine, idx) in ENGINES"
          :key="engine.name"
          class="dropdown-item engine-item"
          :class="{ active: idx === engineIndex }"
          role="option"
          :aria-selected="idx === engineIndex"
          @click.stop="selectEngine(idx)"
      >
        <span class="engine-favicon-sm" aria-hidden="true" v-html="engine.iconSvg"></span>
        <span class="engine-name">{{ engine.label }}</span>
        <svg v-if="idx === engineIndex" class="check-icon" width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- 历史记录下拉 -->
    <!-- 修复：放宽 v-if 条件，只要有历史记录且处于展示状态即弹出面板 -->
    <div
        v-if="showHistory && historyList.length > 0"
        class="dropdown history-dropdown slide-down"
        :style="{ background: dropdownBg }"
        role="listbox"
        aria-label="搜索历史"
    >
      <div class="dropdown-header">
        <span class="dropdown-title">最近搜索</span>
        <!-- 修复：增加 .stop 避免清除时冒泡触发焦点错乱 -->
        <button class="clear-all-btn" @click.stop="clearHistory">全部清除</button>
      </div>
      <!-- 修复：增加 .stop 避免选中记录时冒泡触发外部点击检测 -->
      <div
          v-for="item in filteredHistory"
          :key="item"
          class="dropdown-item history-item"
          role="option"
          tabindex="0"
          @click.stop="selectHistory(item)"
          @keydown.enter.prevent="selectHistory(item)"
          @keydown.space.prevent="selectHistory(item)"
      >
        <svg class="history-icon" width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="1.3"/>
          <path d="M6.5 4V6.5L8 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="history-text">{{ item }}</span>
        <button
            class="remove-btn"
            aria-label="删除此记录"
            @click.stop="removeHistory(item)"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M8 3L3 8M3 3L8 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== 容器 ===== */
.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
}

/* ===== 搜索框 ===== */
.search-box {
  display: flex;
  align-items: center;
  height: 54px;
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 27px;
  box-shadow:
      0 2px 12px rgba(0, 0, 0, 0.06),
      0 1px 3px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.search-box.focused,
.search-box:focus-within {
  border-color: rgba(0, 0, 0, 0.13);
  box-shadow:
      0 0 0 3px rgba(60, 100, 220, 0.1),
      0 4px 20px rgba(0, 0, 0, 0.09);
}

/* ===== 引擎图标按钮 ===== */
.engine-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 6px 0 20px;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.15s;
}

.engine-btn:hover {
  opacity: 0.7;
}

.engine-favicon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.engine-favicon :deep(svg) {
  width: 18px;
  height: 18px;
  display: block;
}

.chevron {
  transition: transform 0.2s ease;
  color: #999;
  flex-shrink: 0;
}

.chevron.open {
  transform: rotate(180deg);
}

/* ===== 分隔线 ===== */
.divider {
  width: 1px;
  height: 20px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 4px;
  flex-shrink: 0;
}

/* ===== 输入框 ===== */
.search-input {
  flex: 1;
  height: 100%;
  padding: 0 8px;
  background: none;
  border: none;
  outline: none;
  font-size: 15px;
  font-family: inherit;
  color: #1a1a1a;
  min-width: 0;
}

.search-input::placeholder {
  color: #aaa;
  font-weight: 300;
}

.search-input::-webkit-search-cancel-button {
  display: none;
}

/* ===== 清空按钮 ===== */
.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 2px;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;
  color: #bbb;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.clear-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  color: #666;
}

/* ===== 搜索按钮 ===== */
.search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-right: 7px;
  border-radius: 21px;
  border: none;
  background: #7EC8E3;
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;
}

.search-btn:hover {
  background: #5BA4C9;
}

.search-btn:active {
  transform: scale(0.95);
}

/* ===== 下拉面板通用 ===== */
.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  backdrop-filter: blur(24px) saturate(1.8);
  -webkit-backdrop-filter: blur(24px) saturate(1.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  color: #333;
  text-align: left;
  gap: 10px;
  transition: background 0.12s;
}

.dropdown-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

/* ===== 引擎下拉 ===== */
.engine-dropdown {
  width: 180px;
  left: 0;
  right: auto;
}

.engine-item {
  justify-content: flex-start;
}

.engine-item.active {
  color: #1a1a1a;
  font-weight: 500;
}

.engine-favicon-sm {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.engine-favicon-sm :deep(svg) {
  width: 16px;
  height: 16px;
  display: block;
}

.engine-name {
  flex: 1;
}

.check-icon {
  color: #3c64dc;
  flex-shrink: 0;
  margin-left: auto;
}

/* ===== 历史记录下拉 ===== */
.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-title {
  font-size: 11px;
  font-weight: 500;
  color: #aaa;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.clear-all-btn {
  font-size: 12px;
  color: #888;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 2px 0;
  transition: color 0.15s;
}

.clear-all-btn:hover {
  color: #e55;
}

.history-item {
  gap: 10px;
}

.history-icon {
  color: #ccc;
  flex-shrink: 0;
}

.history-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;
  color: #ccc;
  flex-shrink: 0;
  transition: background 0.12s, color 0.12s;
}

.remove-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  color: #888;
}

/* ===== 移动端适配 ===== */
@media (max-width: 640px) {
  .search-box {
    height: 50px;
    border-radius: 14px;
  }

  .search-input {
    font-size: 14px;
  }

  .search-btn {
    width: 38px;
    height: 34px;
    margin-right: 5px;
  }
}
</style>