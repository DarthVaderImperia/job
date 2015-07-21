modules.define('thead', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
	provide(BEMDOM.decl(this.name, {
		onSetMod: {
	        js: {
	            inited: function() {
	                this._hcells = this.findBlocksInside('head-cell');   
	                BEMDOM.blocks['head-cell'].on('click', this._onClick, this);
	            }
	        }
    	},

    	_onClick: function(e){
    		this._clear(e.target);
    		
    		if(e.target.hasMod('type','none')){
        		e.target.toggleMod('type','none','down');
        		this._sendRequest(e.target,'down');
        		return;
        	}

        	if(e.target.hasMod('type','down')){
        		e.target.toggleMod('type','down','up');
        		this._sendRequest(e.target,'up');
        		return;
        	}

        	if(e.target.hasMod('type','up')){
        		e.target.toggleMod('type','up','down');
        		this._sendRequest(e.target,'down');
        		return;
        	}
    	},

    	_clear: function(current){
    		this._hcells.forEach(function(cell) {
                if(cell !== current)
                	cell.setMod('type','none');
            });
    	},

    	_sendRequest: function(sort,order) {
	        this._abortRequest();

	        this._xhr = $.ajax({
	            type: 'GET',
	            dataType: 'html',
	            url: this.params.url,
	            data: {
	            	sort: sort.params.sort,
	            	order: order
	            },
	            cache: false,
	            success: this._onSuccess.bind(this)
	        });
	    },

	    _abortRequest: function() {
	        this._xhr && this._xhr.abort();
	    },

	    _onSuccess: function(result) {
	        this._updateContent(result);
	        this.delMod('loading');
	    },

		_updateContent: function(html) {
	        BEMDOM.update(this.findBlockOutside('table').findBlockInside('tbody').domElem, html);
	    }
	}));
});