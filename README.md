# vue-scrollspy

Scrollspy, and animated scrolt-to, for VueJS

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

HTML:

```html
<ul>
    <li :class="{active:scrollPos == 0}">
        <a @click="$scrollTo(0)">Menu 1</a>
    </li>
    <li :class="{active:scrollPos == 1}">
        <a @click="$scrollTo(1)">Menu 2</a>
    </li>
</ul>

<div v-scrollspy="scrollPos" :steps="30" :time="200">
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

Javascript:

```js
new Vue({
    data: {
        scrollPos: 0
    },
    ready: function(){
        this.$scrollSet()
    }
})
```

Using the directive creates the global function `$scrollSet()`. Call this when the DOM is ready, or when the DOM has changed.

## Animated Scroll

For animated scroll, use as follows:

```html
<div v-scrollspy="scrollPos" :steps="30" :time="200">
```

`time` in milliseconds, `steps` is animation resolution (more steps results in a smoother animation). For non-animated scroll, simply omit these parameters.

## TODO

- Add bezier animations
- Add `innerHTML` watcher

(If anybody knows how to watch `innerHTML` please let me know.)
