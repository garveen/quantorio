<template>
  <span>
    <el-select value='' :placeholder="translate('made-in')" @input='changeAllMachine'>
      <el-option v-for='machine in machines' :label='translate(machine)' :value='machine.name' :key='machine.name'></el-option>
    </el-select>
    <img :src='icon(maxSpeedModule)' class='button icon icon-bordered' @click='maxSpeed'>
    <img :src='icon(maxProductivityModule)' class='button icon icon-bordered' @click='maxProductivity'>
  </span>
</template>
