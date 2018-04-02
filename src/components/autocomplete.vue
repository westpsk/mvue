<template>
  <div :class="`autocomplete-wrapper`">
    <input
      type="text"
      :placeholder="placeholder"
      :name="name"
      v-model="type"
      @input="handleInput"
      @dblclick="handleDblclick"
      @blur="handleBlur"
      @keydown="handleKeyDown"
      @focus="handleFocus"
      autocomplete="off"
    />
    <div
      class="autocomplete autocomplete-list"
      v-show="showList && json.length"
    >
      <ul>
        <li
          v-for="(item, i) in json" :key="i"
          :class="activeClass(i)"
        >
          <a href="#"
            @click.prevent="selectList(item)"
            @mousemove="mousemove(i)"
          >
            <span class="autocomplete-anchor-label">{{item[anchor]}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    classes: {},
    placeholder: String,
    debounce: {
      type: Number,
      default: 500
    },
    url: {
      type: String,
      required: true
    },
    // 初始化数据
    initValue: {
      type: String,
      default: ''
    },
    // Anchor of list
    anchor: {
      type: String,
      required: true
    },
    // minimum length
    min: {
      type: Number,
      default: 0
    },
    param: {
      type: String,
      default: 'q'
    },
    // Process the result before retrieveng the result array.
    process: Function,
    onSelect: Function,
    onAjaxProgress: Function,
    onAjaxLoaded: Function,
    onBlur: Function
  },
  data () {
    return {
      type: '',
      showList: false,
      json: [],
      focusList: '',
      debounceTask: undefined
    }
  },
  watch: {

  },
  methods: {
    handleInput (e) {
      const { value } = e.target
      this.showList = true
      if (this.debounce) {
        if (this.debounceTask !== undefined) {
          clearTimeout(this.debounceTask)
        }
        this.debounceTask = setTimeout(() => {
          return this.getData(value)
        }, this.debounce)
      } else {
        return this.getData(value)
      }
    },
    handleDblclick () {
      this.json = []
      this.getData('')
      this.showList = true
    },
    // input 失去焦点时 隐藏
    handleBlur (e) {
      this.onBlur && this.onBlur(e)
      setTimeout(() => {
        // Callback Event
        this.onHide && this.onHide()
        this.showList = false
      }, 250)
    },
    handleFocus (e) {
      this.focusList = 0
    },
    mousemove (i) {
      this.focusList = i
    },
    activeClass (i) {
      const focusClass = i === this.focusList ? 'focus-list' : ''
      return `${focusClass}`
    },
    selectList (data) {
      // Deep clone of the original object
      const clean = this.cleanUp(data)
      // Put the selected data to type (model)
      this.type = clean[this.anchor]
      // Hide List
      this.showList = false
      // Callback Event
      this.onSelect && this.onSelect(clean)
    },
    // Get the original data
    cleanUp (data) {
      return JSON.parse(JSON.stringify(data))
    },
    handleKeyDown (e) {
      let key = e.keyCode
      if (!this.showList) return
      console.log('key', key)
      // key list
      const DOWN = 40
      const UP = 38
      const ENTER = 13
      const ESC = 27

      switch (key) {
        case DOWN:
          e.preventDefault()
          this.focusList++
          break
        case UP:
          e.preventDefault()
          this.focusList--
          break
        case ENTER:
          e.preventDefault()
          this.selectList(this.json[this.focusList])
          this.showList = false
          break
        case ESC:
          this.showList = false
          break
      }

      const listLength = this.json.length - 1
      const outOfRangeBottom = this.focusList > listLength
      const outOfRangeTop = this.focusList < 0
      const topItemIndex = 0
      const bottomItemIndex = listLength

      let nextFocusList = this.focusList
      if (outOfRangeBottom) nextFocusList = topItemIndex
      if (outOfRangeTop) nextFocusList = bottomItemIndex
      this.focusList = nextFocusList
    },
    composeParams (val) {
      const encode = (val) => this.encodeParams ? encodeURIComponent(val) : val
      let params = `${this.param}=${encode(val)}`
      if (this.customParams) {
        Object.keys(this.customParams).forEach((key) => {
          params += `&${key}=${encode(this.customParams[key])}`
        })
      }
      return params
    },
    composeHeader (ajax) {
      if (this.customHeaders) {
        Object.keys(this.customHeaders).forEach((key) => {
          ajax.setRequestHeader(key, this.customHeaders[key])
        })
      }
    },
    doAjax (value) {
      let params = this.composeParams(value)
      let ajax = new XMLHttpRequest()
      ajax.open('GET', `${this.url}?${params}`, true)
      this.composeHeader(ajax)
      // Callback Event
      ajax.addEventListener('progress', (data) => {
        if (data.lengthComputable && this.onAjaxProgress) {
          this.onAjaxProgress(data)
        }
      })
      ajax.addEventListener('loadend', (e) => {
        const { responseText } = e.target
        let json = JSON.parse(responseText)
        this.json = this.process ? this.process(json) : json
      })
      // Send Ajax
      ajax.send()
    },
    getData (value) {
      if (!value || value.length < this.min || !this.url) return
      this.doAjax(value)
    }
  },
  // 生命周期
  // beforeCreate () {
  //   console.log('1. beforeCreate')
  // },
  created () {
    // console.log('2. created')
    this.type = this.initValue ? this.initValue : null
  }
  // beforeMount () {
  //   console.log('3. beforeMount')
  // },
  // mounted () {
  //   console.log('4. mounted')
  // },
  // // 更新
  // beforeUpdate () {
  //   console.log('5. beforeUpdate')
  // },
  // updated () {
  //   console.log('6. updated')
  // },
  // beforeDestroy () {
  //   console.log('7. beforeDestory')
  // },
  // destroyed () {
  //   console.log('8. destroyed')
  // }

}
</script>

<style>
.transition, .autocomplete, .showAll-transition, .autocomplete ul, .autocomplete ul li a{
  transition:all 0.3s ease-out;
  -moz-transition:all 0.3s ease-out;
  -webkit-transition:all 0.3s ease-out;
  -o-transition:all 0.3s ease-out;
}

.autocomplete ul{
  font-family: sans-serif;
  position: absolute;
  list-style: none;
  background: #f8f8f8;
  padding: 10px 0;
  margin: 0;
  display: inline-block;
  min-width: 15%;
  margin-top: 10px;
}

.autocomplete ul:before{
  content: "";
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid #f8f8f8;
  left: 46%;
  top: -20px
}

.autocomplete ul li a{
  text-decoration: none;
  display: block;
  background: #f8f8f8;
  color: #2b2b2b;
  padding: 5px;
  padding-left: 10px;
}

.autocomplete ul li a:hover, .autocomplete ul li.focus-list a{
  color: white;
  background: #2F9AF7;
}

.autocomplete ul li a span, /*backwards compat*/
.autocomplete ul li a .autocomplete-anchor-label{
  display: block;
  margin-top: 3px;
  color: grey;
  font-size: 13px;
}

.autocomplete ul li a:hover .autocomplete-anchor-label,
.autocomplete ul li.focus-list a span, /*backwards compat*/
.autocomplete ul li a:hover .autocomplete-anchor-label,
.autocomplete ul li.focus-list a span{ /*backwards compat*/
  color: white;
}

</style>
