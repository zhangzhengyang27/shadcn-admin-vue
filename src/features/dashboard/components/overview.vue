<template>
  <div ref="chartRef" class="h-[350px] w-full" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([BarChart, CanvasRenderer, GridComponent, TooltipComponent])

const chartRef = ref<HTMLDivElement>()

const data = [
  { name: 'Jan', total: 1865 },
  { name: 'Feb', total: 2234 },
  { name: 'Mar', total: 1892 },
  { name: 'Apr', total: 3421 },
  { name: 'May', total: 2789 },
  { name: 'Jun', total: 4125 },
  { name: 'Jul', total: 3156 },
  { name: 'Aug', total: 3890 },
  { name: 'Sep', total: 2567 },
  { name: 'Oct', total: 4231 },
  { name: 'Nov', total: 3612 },
  { name: 'Dec', total: 4890 },
]

let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  const maxValue = Math.max(...data.map((d) => d.total))

  const style = getComputedStyle(document.documentElement)
  const primary = style.getPropertyValue('--primary').trim() || '#6366f1'
  const background = style.getPropertyValue('--background').trim() || 'hsl(0 0% 100%)'
  const foreground = style.getPropertyValue('--foreground').trim() || 'hsl(0 0% 3.9%)'
  const border = style.getPropertyValue('--border').trim() || 'hsl(0 0% 89.8%)'

  chartInstance.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: primary.replace(')', ' / 0.1)').replace('oklch', 'oklch'),
        },
      },
      backgroundColor: background,
      borderColor: border,
      borderWidth: 1,
      textStyle: {
        color: foreground,
        fontSize: 12,
      },
      formatter: (params: any) => {
        const item = params[0]
        return `${item.name}<br/><span style="color:${primary};font-weight:600">$${item.value.toLocaleString()}</span>`
      },
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'hsl(var(--muted-foreground))', fontSize: 12 },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'hsl(var(--muted-foreground))',
        fontSize: 12,
        formatter: (value: number) => `$${value}`,
      },
      splitLine: { show: false },
      max: maxValue * 1.1,
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.total),
        barWidth: '60%',
        itemStyle: {
          color: primary,
          borderRadius: [4, 4, 0, 0],
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
