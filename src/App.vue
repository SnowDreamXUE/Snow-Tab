<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import SettingsPanel from '@/components/SettingsPanel.vue'

const BG_KEY      = 'homepage_background'
const OPACITY_KEY = 'homepage_search_opacity'

const bgImage       = ref<string | null>(null)
const showSettings  = ref(false)
const searchOpacity = ref(0.82)

onMounted(() => {
  const savedBg = localStorage.getItem(BG_KEY)
  if (savedBg) bgImage.value = savedBg

  const savedOpacity = localStorage.getItem(OPACITY_KEY)
  if (savedOpacity) searchOpacity.value = parseFloat(savedOpacity)
})

function onBgChange(val: string | null) {
  bgImage.value = val
}

function onOpacityChange(val: number) {
  searchOpacity.value = val
}

const bgStyle = computed(() => {
  if (bgImage.value) {
    return {
      backgroundImage: `url(${bgImage.value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
  }
  return {}
})
</script>

<template>
  <div class="page" :style="bgStyle">
    <!-- 浅色调蒙层：有背景图时略加遮罩，无背景时透明 -->
    <div class="overlay-tint" :class="{ 'has-bg': !!bgImage }"></div>

    <!-- 顶部右侧工具栏 -->
    <header class="toolbar">
      <button
          class="settings-btn"
          aria-label="打开背景设置"
          :class="{ active: showSettings }"
          @click="showSettings = true"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
          <path
              d="M8 1.5V3M8 13V14.5M14.5 8H13M3 8H1.5M12.7 3.3L11.6 4.4M4.4 11.6L3.3 12.7M12.7 12.7L11.6 11.6M4.4 4.4L3.3 3.3"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          />
        </svg>
      </button>
    </header>

    <!-- 主内容区 -->
    <main class="main">
      <SearchBar :opacity="searchOpacity" />
    </main>

    <!-- 设置面板 -->
    <Transition name="fade">
      <SettingsPanel
          v-if="showSettings"
          :current-bg="bgImage"
          :search-opacity="searchOpacity"
          @close="showSettings = false"
          @bg-change="onBgChange"
          @opacity-change="onOpacityChange"
      />
    </Transition>
  </div>
</template>

<style scoped>
/* ===== 根容器 ===== */
.page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  background-color: #eef0f4;
  overflow: hidden;
}

/* ===== 蒙层 ===== */
.overlay-tint {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background 0.4s ease;
}

.overlay-tint.has-bg {
  background: rgba(255, 255, 255, 0.22);
}

/* ===== 工具栏 ===== */
.toolbar {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 16px;
}

.settings-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #555;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
}

.settings-btn:hover,
.settings-btn.active {
  background: rgba(255, 255, 255, 0.92);
  color: #111;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* ===== 主内容 ===== */
.main {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 向上偏移，使搜索栏在视觉上处于黄金分割偏上位置 */
  padding: 0 20px 18vh;
}

/* ===== 过渡动画 ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
