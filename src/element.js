import {
  Button,
  Select,
  Row,
  Table,
  InputNumber,
  Icon,
  Loading,
  Popover,
  Dialog,
  Tabs,
  TabPane,
  Col,
  Option,
  TableColumn,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default (Vue, i18n) => {
  let options = {i18n: i18n.t}
  Vue.use(Button, options)
  Vue.use(Select, options)
  Vue.use(Row, options)
  Vue.use(Table, options)
  Vue.use(InputNumber, options)
  Vue.use(Icon, options)
  Vue.use(Popover, options)
  Vue.use(Dialog, options)
  Vue.use(Tabs, options)
  Vue.use(TabPane, options)
  Vue.use(Col, options)
  Vue.use(Option, options)
  Vue.use(TableColumn, options)
  Vue.use(Loading.directive, options)

  Vue.prototype.$loading = Loading.service
}
