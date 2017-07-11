; (function () {
	var vueScrollspy = {};
	vueScrollspy.install = function (Vue) {

		Vue.directive('scrollspy', {
			twoWay: true,
			params: ["steps", "time", "offset"],
			// {
			//     steps: {type: Number, required: false, default: 0},
			//     time: {type: Number, required: false, default: 0}
			// },
			scrollSections: [],
			scroll: function(){
				var offset = parseInt(this.params.offset) || 0
				var pos = this.el.scrollTop + offset
				var stop = false
				var id = false
				for (var i = 0; i < this.scrollSections.length; i++) {
					if (stop) break
					var lastOb = i - 1 > -1 ? this.scrollSections[i - 1] : this.scrollSections[0]
					var lastKey = Object.keys(lastOb)[0]
					var ob = this.scrollSections[i]
					var key = Object.keys(ob)[0]
					var val = ob[Object.keys(ob)[0]]
					if (val > pos) {
						id = lastKey
						stop = true
					}
				}
				if (!id) {
					id = key
				}
				if (!isNaN(parseFloat(id)) && isFinite(id)) {
					id = parseInt(id)
				}
				this.set(id)
			},
			scrollTo: function(id){
				var current = this.el.scrollTop
				var targetID = this.scrollSections.findIndex((ob) => {
					return Object.keys(ob)[0].toString() === id.toString()
				})
				if (targetID > -1) {
					var target = this.scrollSections[targetID]
					target = target[Object.keys(target)[0]]
				} else {
					target = 0
				}
				var time = parseInt(this.params.time) || 0
				var steps = parseInt(this.params.steps) || 0
				var offset = parseInt(this.params.offset) || 0
				var el = this.el

				target -= offset
				target < 0 ? 0 : target
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
				this.scrollSections = []
				var sections = this.el.children
				for (var i = 0; i < sections.length; i++){
					if(sections[i].offsetTop > 0){
						var ob = {}
						ob[i] = sections[i].offsetTop
						this.scrollSections.push(ob)
					}
				}

				var classSections = document.querySelectorAll('.scrollspy-anchor')
				classSections.forEach((el, index) => {
					var id = el.getAttribute('id')
					var ob = {}
					ob[id] = el.offsetTop
					this.scrollSections.push(ob)
				})

				this.sortSections()
			},
			sortSections: function () {
				this.scrollSections.sort((a, b) => {
					return a[Object.keys(a)[0]] - b[Object.keys(b)[0]]
				})
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