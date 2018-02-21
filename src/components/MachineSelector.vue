<template>
  <el-select value='' :placeholder="translate('made-in')" @input='changeAllMachine'>
    <el-option v-for='machine in machines' :label='translate(machine)' :value='machine.name' :key='machine.name'></el-option>
  </el-select>
</template>
