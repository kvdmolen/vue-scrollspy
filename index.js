; (function () {
    var vueScrollspy = {};
    vueScrollspy.install = function (Vue) {

        Vue.directive('scrollspy', {
            twoWay: true,
            params: ["steps", "time"],
            // {
            //     steps: {type: Number, required: false, default: 0},
            //     time: {type: Number, required: false, default: 0}
            // },
            scrollSections: [],
            scroll: function(){
                var pos = this.el.scrollTop
                var i = 0
                while(pos >= this.scrollSections[i]){i++}
                this.set(i ? i - 1 : 0)
            },
            scrollTo: function(id){
                var current = this.el.scrollTop
                var target = this.scrollSections[id]
                var time = parseInt(this.params.time) || 0
                var steps = parseInt(this.params.steps) || 0
                var el = this.el

                if(!steps){
                    el.scrollTop = target
                }else{
                    var timems = parseInt(time/steps)
                    var gap = target - current
                    for(var i = 0; i <= steps; i++){
                        (function(){
                            var pos = current + (gap/steps)*i;
                            setTimeout(function(){el.scrollTop = pos}, timems*i)
                        })();
                    }
                }
            },
            init: function(){
                this.scrollSections = [0]
                var sections = this.el.children
                for (var i = 0; i < sections.length; i++){
                    if(sections[i].offsetTop > 0){
                        this.scrollSections.push(sections[i].offsetTop)
                    }
                }
            },
            bind: function(){
                this.el.addEventListener('scroll', this.scroll.bind(this))
                Vue.prototype.$scrollSet = this.init.bind(this)
                Vue.prototype.$scrollTo = this.scrollTo.bind(this)
            },
            update: function(newVar, oldVar) {
                // if(oldVar != newVar){
                //     this.scrollTo(newVar)
                // }
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