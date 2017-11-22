define(['tyjApp'],function(module){
	module.factory('Paginator',function() {
		return function(fetchFunction,pageSize){
			var paginator = { 
		            hasNextVar : false,
		            object:{},
		            page:{},
		            pages:[],
		            templateUrl:'',
		            next: function() {
		                if(this.hasNextVar) {  
		                	this.page.currentPage += 1;
		                    this._load();
		                }  
		            },  
		            _load: function() {
		                var self = this;
		                fetchFunction(this.page,function(callback) {
		                	self.page=callback.PageRestful.page;
		                	self.object=callback.PageRestful;
		                    self.hasNextVar = callback.PageRestful.page.currentPage<callback.PageRestful.page.totalPage;
		                    self.templateUrl = "paging";
		                    self.pages=[];
		                    var index=1;
		                    if(self.page.currentPage<=2)
		                    {
		                    	for(var i=1;i<=self.page.totalPage;i++)
			                    {
			                    	if(index<=5)
			                    	{
			                    		self.pages.push(i);
			                    		index++;
			                    	}else
			                    	{
			                    		return;
			                    	}
			                    }
		                    }else if(self.page.currentPage>=3 && self.page.totalPage-2>=self.page.currentPage)
		                    {
		                    	if(index<=5)
		                    	{
		                    		for(var i=self.page.currentPage-2;i<=self.page.currentPage+2;i++)
				                    {
		                    			self.pages.push(i);
		                    			index++;
				                    }
		                    	}else
		                    	{
		                    		return;
		                    	}
		                    }else if(self.page.totalPage<=5)
		                    {
		                    	for(var i=1;i<=self.page.totalPage;i++)
			                    {
	                    			self.pages.push(i);
			                    }
		                    	return;
		                    }
		                    else
		                    {
		                    	if(index<=5)
		                    	{
		                    		for(var i=self.page.totalPage-4;i<=self.page.totalPage;i++)
				                    {
		                    			self.pages.push(i);
		                    			index++;
				                    }
		                    	}else
		                    	{
		                    		return;
		                    	}
		                    }
		                });
		            },  
		            hasNext: function() {  
		            	return this.page.currentPage<this.page.totalPage;
		            },  
		            previous: function() {
		                if(this.hasPrevious()) {  
		                    this.page.currentPage -= 1;
		                    this._load();  
		                }  
		            },  
		            hasPrevious: function() {  
		                return this.page.currentPage>1;
		            },
		            go:function(currentPage)
		            {
		            	if(currentPage>=1 && currentPage<=this.page.totalPage) {  
		                    this.page.currentPage=currentPage;
		                    this._load();
		                }
		            }
		        };
			paginator.page.showCount=pageSize;//设置每页显示记录数
			paginator._load();//加载第一页
			return paginator;
		};
	});
}); 