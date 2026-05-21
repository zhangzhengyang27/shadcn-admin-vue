<template>
  <div ref="chartRef" class="h-[300px] w-full" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([LineChart, CanvasRenderer, GridComponent, TooltipComponent, LegendComponent])

const chartRef = ref<HTMLDivElement>()

const data = [
  { name: 'Mon', clicks: 487, uniques: 312 },
  { name: 'Tue', clicks: 523, uniques: 389 },
  { name: 'Wed', clicks: 672, uniques: 445 },
  { name: 'Thu', clicks: 598, uniques: 412 },
  { name: 'Fri', clicks: 734, uniques: 521 },
  { name: 'Sat', clicks: 341, uniques: 234 },
  { name: 'Sun', clicks: 298, uniques: 198 },
]

let chartInstance: echarts.ECharts | null = null

const oklchWithAlpha = (color: string, alpha: number): string => {
  const match = color.match(/^oklch\(([^)]+)\)$/)
  if (match) {
    return `oklch(${match[1]} / ${alpha})`
  }
  return color
}

onMounted(() => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)

  const style = getComputedStyle(document.documentElement)
  const primary = style.getPropertyValue('--primary').trim() || '#6366f1'
  const muted = style.getPropertyValue('--muted-foreground').trim() || 'hsl(0 0% 45%)'
  const background = style.getPropertyValue('--background').trim() || 'hsl(0 0% 100%)'
  const foreground = style.getPropertyValue('--foreground').trim() || 'hsl(0 0% 3.9%)'
  const border = style.getPropertyValue('--border').trim() || 'hsl(0 0% 89.8%)'

  chartInstance.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: background,
      borderColor: border,
      borderWidth: 1,
      textStyle: {
        color: foreground,
        fontSize: 12,
      },
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: muted,
        },
        lineStyle: {
          color: muted,
          opacity: 0.3,
        },
      },
    },
    legend: {
      data: ['Clicks', 'Unique Visitors'],
      top: 0,
      textStyle: {
        color: 'hsl(var(--muted-foreground))',
        fontSize: 12,
      },
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 32,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'hsl(var(--muted-foreground))', fontSize: 12 },
      splitLine: { show: false },
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'hsl(var(--muted-foreground))', fontSize: 12 },
      splitLine: { show: false },
    },
    series: [
      {
        name: 'Clicks',
        type: 'line',
        data: data.map((d) => d.clicks),
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: oklchWithAlpha(primary, 0.2) },
              { offset: 1, color: oklchWithAlpha(primary, 0) },
            ],
          },
        },
        lineStyle: {
          color: primary,
          width: 2,
        },
        itemStyle: {
          color: primary,
        },
      },
      {
        name: 'Unique Visitors',
        type: 'line',
        data: data.map((d) => d.uniques),
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: oklchWithAlpha(muted, 0.15) },
              { offset: 1, color: oklchWithAlpha(muted, 0) },
            ],
          },
        },
        lineStyle: {
          color: muted,
          width: 2,
        },
        itemStyle: {
          color: muted,
        },
      },
    ],
  })
})

onUnmounted(() => {
  chartInstance?.dispose()
  chartInstance = null
})
</script>
