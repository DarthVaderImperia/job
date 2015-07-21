modules.define('head-cell', ['i-bem__dom'], function(provide, BEMDOM) {
	provide(BEMDOM.decl(this.name, {
		onSetMod: {
	        js: {
	            inited: function() {
	            	this.bindTo('click', this._onClick);
	            }
	        }
    	},
    	_onClick: function(e){
    		e.preventDefault();
    		this.emit('click');
    	}
	}));
});