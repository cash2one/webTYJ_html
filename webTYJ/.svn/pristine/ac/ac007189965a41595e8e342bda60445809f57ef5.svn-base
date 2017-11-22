/**
 * Created by yeshengqiang on 2016/4/1.
 * Name : 属性中转
 */


'use strict';

define(function (require) {
    var app = require('../app');

    //使用方法
    //路由中加  dependencies: ['services/centerChange']
    //js中加 app.get('centerChange').functionName

    app.factory('centerChange', ['$filter',function ($filter) {
        return {
            centerChange:function(obj){
                var temp = {};
                for(var i in obj){
                    if(obj.hasOwnProperty(i)){
                        temp[i] = obj[i];
                    }
                }
                return temp;
            }
        }
    }
    ]);
});
