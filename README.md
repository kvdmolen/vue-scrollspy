# vue-scrollspy

Scrollspy, and animated scroller for VueJS

## Installation

```
$ npm install vue-scrollspy --save
```

## Setup

```js
var Vue = require('vue');
var Scrollspy = require('vue-scrollspy');
Vue.use(Scrollspy)
```

## Usage

```html
<ul>
    <li :class="{active:scrollPos==0}"><a @click="$scrollTo(0)">Menu 1</a></li>
    <li :class="{active:scrollPos==1}"><a @click="$scrollTo(1)">Menu 2</a></li>
</ul>

<div v-scrollspy :steps="30" :time="200">
    <div>
        <h1>Header 1</h1>
        <p>Content</p>
    </div>
    <div>
        <h1>Header 2</h1>
        <p>Content</p>
    </div>
</div>
```

- `time` in milliseconds.
- `steps` is animation resolution. More steps is smoother.

For non-animated scroll, simply omit these parameters.

When the DOM is ready, or when the content has changed, call `$scrollSet()`:

```js
new Vue({
    ready: function(){
        this.$scrollSet()
    }
})
```


## TODO

- Add bezier animations
- Add `innerHTML` watcher

(If anybody knows how to watch `innerHTML` please let me know.)
