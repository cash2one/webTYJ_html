'use strict';


define(function (require) {
    var app = require('../app');

    app.factory('tyjUtil', function () {
        return {

            /**
             * JSON克隆
             * @param jsonObject 传递要克隆的json对象
             * @returns tyjUtil
             */
            jsonClone:function(jsonObject){
                if(jsonObject.length&&jsonObject.length>0){
                    var arr=[];
                    for(var i=0;i<jsonObject.length;i++){
                        arr.push(_jsonClone(jsonObject[i]));
                    }
                    return arr;
                }
                else{
                    return _jsonClone(jsonObject);
                }
            },

            /**
             * 生成UUID
             * @returns UUID
             */
            uuid:function() {
                function _p8(s) {
                    var p = (Math.random().toString(16)+"000000000").substr(2,8);
                    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
                }
                return _p8() + _p8(true) + _p8(true) + _p8();
            },

            //判断是否为数组
            isArray: function (obj){
                return (typeof obj=='object')&&obj.constructor==Array;
            },
            /**
             * 日期转换为格式yyyy-MM-dd
             * maogaofei 2016-06-23
             * @param date
             * @returns {string}
             */
            getDayStr:function(dateStr){
                var date = new Date(dateStr);
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            }

        };
        function _jsonClone(jsonObject) {
            if (typeof jsonObject == 'object') {
                var cloneItem = {};
                for (var key in jsonObject) {
                    cloneItem[key] = jsonObject[key];
                    //console.log(key+"---"+jsonObject[key]);
                }

                return cloneItem;
            }
            else {
                return jsonObject;
            }
        }
    });
});


