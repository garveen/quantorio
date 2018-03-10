<template>
  <svg></svg>
</template>
<script>
import store from '../store'
import Helpers from './Helpers'
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'

export default {
  props: ['bonus'],
  mounted () {
    let g = new dagreD3.graphlib.Graph()
      .setGraph({
        ranksep: 20,
        nodesep: 20,
      })
    g.setDefaultEdgeLabel(() => {})

    let cache = {}
    let adding = []

    Object.values(store.state.meta.technologies).forEach(technology => {
      if (technology.effects && technology.effects.some(effect => this.bonus[effect.type] !== undefined)) {
        adding.push(technology)
      } else {
        cache[technology.name] = technology
      }
    })

    let add = technology => {
      let matches = technology.name.match(/^(.+?)(-(\d+))?$/)
      let label = Helpers.translate('technology-name.' + matches[1])
      if (matches[3]) {
        label += ' ' + matches[3]
      }
      g.setNode(technology.name, {label: label, rx: 5, ry: 5, enabled: false})
      if (!technology.prerequisites) {
        return
      }
      technology.prerequisites.forEach(pre => {
        g.setEdge(pre, technology.name, {label: '', curve: d3.curveBasis, arrowhead: 'vee'})
        if (cache[pre]) {
          let t = cache[pre]
          cache[pre] = false
          add(t)
        }
      })
    }

    adding.forEach(add)

    // Create the renderer
    // eslint-disable-next-line new-cap
    var render = new dagreD3.render()

    // Set up an SVG group so that we can translate the final graph.
    var svg = d3.select(this.$el)
    var inner = svg.append('g')

    var zoom = d3.zoom().on('zoom', () => {
      inner.attr('transform', d3.event.transform)
    })
    svg.call(zoom)
    // Run the renderer. This is what draws the final graph.
    let getRelated = (name, enabling) => {
      let edges
      let k
      if (enabling) {
        edges = g.inEdges(name)
        k = 'v'
      } else {
        edges = g.outEdges(name)
        k = 'w'
      }
      return edges.map(edge => edge[k])
    }

    let enableNode = (name, enable) => {
      let node = g.node(name)
      if (enable) {
        node.style = 'fill: #7f7'
      } else {
        node.style = ''
      }
      node.enabled = enable
      getRelated(name, enable).forEach(related => enableNode(related, enable))
    }
    // bad solution
    let rerender = () => {
      render(inner, g)
      inner.selectAll('g.node').on('click', (d) => {
        let enabled = g.node(d).enabled
        enableNode(d, !enabled)
        this.$emit('change', g.nodes().filter(node => g.node(node).enabled))
        rerender()
      })
    }
    rerender()
    var initialScale = 1
    svg.call(zoom.transform, d3.zoomIdentity.translate((this.$el.clientWidth - g.graph().width * initialScale) / 2, 20).scale(initialScale))

    svg.attr('height', g.graph().height * initialScale + 40)
  }
}
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
>>> g.type-TK > rect {
  fill: #00ffd0
}

>>> text {
  font-size: 14px;
}

>>> .node rect {
  stroke: #999;
  fill: #fff;
  stroke-width: 1.5px;
}

>>> .node {
  cursor: pointer;
}

>>> .edgePath path {
  stroke: #333;
  stroke-width: 1.5px;
}
</style>