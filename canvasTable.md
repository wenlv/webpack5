<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-03-31 16:47:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-03-31 19:00:06
 * @FilePath: /byelide/src/components/CanvasTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="">
    <input @input="handleSearch" type="text" />
    <canvas ref="canvas" id="canvas" width="1600" height="1200"
      >对不起，您的浏览器不支持canvas</canvas
    >
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, defineEmits, watch } from 'vue'

let startRow = 0

const visibleRows = Math.ceil(1200 / 100) - 1

defineEmits('click')

const canvas = ref(null)

const cellWidth = 100 * 2
const cellHeight = 50 * 2

const selectedCell = reactive({ row: -1, column: -1 })
const d = {
  columns: [
    {
      title: '姓名',
      key: 'name',
      width: 100
    },
    {
      title: '年龄',
      key: 'age',
      width: 100
    }
  ],
  dataSource: Array.from({ length: 1000 }).map((item, index) => ({
    key: index,
    name: `name-${index}`,
    age: Math.floor(Math.random() * 100)
  }))
}
const data = reactive({
  ...d,
  tempDataSource: d.dataSource
})

const handleClick = (ev) => {
  // 当前点了哪里
  const { left, top } = canvas.value.getBoundingClientRect()
  const x = ev.clientX - left
  const y = ev.clientY - top

  // 判断我点的那个xy落到了那个单元格下
  const rowIndex = Math.floor((y * 2) / cellHeight) - 1 + startRow
  const colIndex = Math.floor((x * 2) / cellWidth)

  // 只需要判断 rowIndex>0 rowIndex<data.length说明别选中
  if (rowIndex > 0 && rowIndex < data.dataSource.length) {
    // 说明单元格被选中
    selectedCell.row = rowIndex
    selectedCell.column = colIndex

    // 重绘表格
    drawTable()
  }
}

const randowColor = () => {
  const randomNum = Math.random()
  if (randomNum > 0 && randomNum < 0.3) {
    return 'red'
  } else if (randomNum < 0.6) {
    return 'blue'
  } else {
    return 'yellow'
  }
}

const drawTable = () => {
  canvas.value.addEventListener('click', handleClick)

  const ctx = canvas.value.getContext('2d')
  const { columns, dataSource } = data

  // 清除选中
  ctx.clearRect(0, 0, 1600, 1200)

  const pixelRatio = window.devicePixelRatio

  const padding = 10
  ctx.beginPath()

  // 画表头
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]
    ctx.font = `bold ${16 * pixelRatio}px serif`
    ctx.fillText(column.title, i * cellWidth + padding, cellHeight / 2)
  }
  // 画表格
  for (let i = startRow; i < startRow + visibleRows; i++) {
    const record = dataSource[i]
    for (let j = 0; j < columns.length; j++) {
      // 做判断 如果被选中了那么就要画矩形高亮单元格
      const column = columns[j]
      // 先画背景
      // 画矩形其实是fill填充操作
      if (selectedCell.row === i && selectedCell.column === j) {
        ctx.fillStyle = randowColor()
        ctx.fillRect(j * cellWidth, (i - startRow + 1) * cellHeight, cellWidth, cellHeight)
        ctx.fillStyle = 'black'
      }

      // 再画内容
      ctx.font = `${16 * pixelRatio}px serif`
      console.log('column.key---')
      console.log(column.key)
      console.log(record)

      const text = (record && record[column.key]) || ''
      console.log(text)
      ctx.fillText(text, j * cellWidth + padding, (i - startRow + 1) * cellHeight + cellHeight / 2)
    }
  }

  ctx.closePath()
}

const handleWheel = () => {
  document.addEventListener(
    'wheel',
    (ev) => {
      console.log(ev)
      const { deltaY } = ev
      if (deltaY < 0) {
        startRow = Math.max(0, startRow - 1)
      } else {
        startRow = Math.min(data.dataSource.length, startRow + 1)
      }

      drawTable()
    },
    false
  )
}

const handleSearch = (ev) => {
  const { value } = ev.target
  data.dataSource = data.tempDataSource.filter((item) => item.name.includes(value)) || []
}

onMounted(() => {
  drawTable()
  handleWheel()
})
onUnmounted(() => {
  canvas.value?.removeEventListener('click', handleClick)
})

watch(
  () => data.dataSource,
  () => {
    drawTable()
  }
)
</script>
<style lang="scss" scoped>
canvas {
  width: 800px;
  height: 600px;
  background-color: #fff;
}
</style>
