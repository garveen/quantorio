<template>
  <span>
    <el-select value='' :placeholder="translate('made-in')" @input='changeAllMachine'>
      <el-option v-for='machine in machines' v-if='isValid(machine)' :label='translate(machine)' :value='machine.name' :key='machine.name'></el-option>
    </el-select>
    <img :src='icon(maxSpeedModule)' class='button icon icon-bordered' @click='maxSpeed'>
    <img :src='icon(maxProductivityModule)' class='button icon icon-bordered' @click='maxProductivity'>
    <span v-for="beacon, beaconIndex in beacons">
      <el-popover placement="bottom" trigger='click'>
        <div class="flex">
          <ModuleSelector ref="modulePopover" v-for="index in beacon.module_slots" :key='index' :allows='beacon.allowed_effects' :module.sync='beacon.modules[index - 1]' @change='maxBeacon(beacon, beaconIndex)'></ModuleSelector>
          <el-input-number :min=0 controls-position="right" v-model='beacon.count' size='small' @change='maxBeacon(beacon, beaconIndex)'></el-input-number>
        </div>
        <span slot='reference'>
          <img class='button icon icon-bordered' :src='icon(beacon)'>
        </span>
      </el-popover>
    </span>
  </span>
</template>
