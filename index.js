; (function () {
    var vueScrollspy = {};
    vueScrollspy.install = function (Vue) {

        Vue.scrollPos = 0

        Vue.directive('scrollspy', {
            params: ["steps","time"],
            scrollSections: [0],
            scroll: function(){
                var pos = this.el.scrollTop
                var i = 0
                while(pos >= this.scrollSections[i]){i++}
                this.vm.$set("scrollPos",i ? i - 1 : 0)
            },
            scrollTo: function(id){
                var current = this.el.scrollTop
                var target = this.scrollSections[id]
                var gap = target - current
                var time = parseInt(this.params.time) || 1
                var steps = parseInt(this.params.steps) || 1
                var el = this.el
                var timems = parseInt(time/steps)

                for(var i = 1; i <= steps; i++){
                    (function(){
                        var pos = current + (gap/steps)*i;
                        setTimeout(function(){el.scrollTop = pos}, timems*i)
                    })();
                }
            },
            init: function(){
                var sections = this.el.children
                for (var i = 0; i < sections.length; i++){
                    if(sections[i].offsetTop > 0){
                        this.scrollSections.push(sections[i].offsetTop)
                    }
                }
            },
            bind: function(){
                this.vm.$set("scrollPos", 0)

                this.el.addEventListener('scroll', this.scroll.bind(this))

                Vue.prototype.$scrollTo = this.scrollTo.bind(this)
                Vue.prototype.$scrollSet = this.init.bind(this)

            },
            update: function(data) {
            },
            unbind: function() {
                this.el.removeEventListener('scroll', scroll)
            },

        })
    }

    if (typeof exports == "object") {
        module.exports = vueScrollspy;
    } else if (typeof define == "function" && define.amd) {
        define([], function () { return vueScrollspy });
    } else if (window.Vue) {
        window.vueScrollspy = vueScrollspy;
        Vue.use(vueScrollspy);
    }

})();