<template>
  <div
    class="col-md-9 col-sm-9 col-xs-9"
    style="flex: 1; margin: 0; padding: 0"
  >
    <div id="content_div" class="jumbotron">
      <!-- 面包屑区域 -->
      <slot name="breadcrumb"></slot>
      <!-- tab栏区域 -->
      <slot name="tab-nav"></slot>
      <div class="panel panel-default">
        <div class="panel-heading">
          <!-- 搜索框区域开始 -->
          <slot name="searchForm"></slot>
          <!-- 搜索框区域结束 -->
        </div>
        <div class="panel-body">
          <!-- 表格区域开始 -->
          <slot name="dataTable"></slot>
          <!-- 表格区域结束 -->
          <!-- 分页区域开始 -->
          <slot name="pagination"></slot>
          <!-- 分页区域结束 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>
