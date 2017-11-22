/**
 * Created by Administrator on 2015/5/14.
 */


define(['tyjApp'], function (module) {
   
    module.factory("$savedContent", function() {
        return [];
    })
        .directive("saveContent", function($savedContent) {
            return {
                restrict: "A",
                compile: function($element, $attrs) {
                    var content = $element.html();
                    $savedContent[$attrs.saveContent] = content;
                }
            }
        })
        .directive("applyContent", function($savedContent) {
            return {
                restrict: "EAC",
                compile: function($element, $attrs) {
                    return function($scope, $element, $attrs) {
                        var content = $savedContent[$attrs.applyContent];
                        var lang = $attrs.highlightLang;
                        if (lang == "html")
                            content = escapeHtml(content);
                        content = trimIndent(content);
                        var pre = prettyPrintOne(content, lang);
                        $element.html(pre);
                    }
                }
            }
        })
        .directive("nav", function() {
            return {
                restrict: "A",
                compile: function($element) {
                    var sections = $("section");
                    angular.forEach(sections, function(section) {
                        var $section = $(section);
                        var id = $section.attr('id');
                        var titleHtml = $section.find("h1").html();
                        titleHtml = titleHtml.slice(0, titleHtml.indexOf("<")).trim();
                        $element.append("<li><a href='#"+id+"'>"+titleHtml+"</a></li>")
                    })
                }
            }
        });
    return module;
});