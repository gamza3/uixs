// customize plugin by @Lusito
// https://github.com/Lusito/jstree/blob/node-customize/src/jstree-node-customize.js
/**
 * ### Node Customize plugin
 *
 * Allows to customize nodes when they are drawn.
 */
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define('jstree.node_customize', ['jquery','jstree'], factory);
    }
    else if(typeof exports === 'object') {
        factory(require('jquery'), require('jstree'));
    }
    else {
        factory(jQuery, jQuery.jstree);
    }
}(function ($, jstree, undefined) {
    "use strict";

    if($.jstree.plugins.node_customize) { return; }

    /**
     * the settings object.
     * key is the attribute name to select the customizer function from switch.
     * switch is a key => function(el, node) map.
     * default: function(el, node) will be called if the type could not be mapped
     * @name $.jstree.defaults.node_customize
     * @plugin node_customize
     */
    $.jstree.defaults.node_customize = {
        "key": "type",
        "switch": {},
        "default": null
    };

    $.jstree.plugins.node_customize = function (options, parent) {
        this.redraw_node = function (obj, deep, callback, force_draw) {
            var node_id = obj;
            var el = parent.redraw_node.apply(this, arguments);
            if (el) {
                var node = this._model.data[node_id];
                var cfg = this.settings.node_customize;
                var key = cfg.key;
                var type =  (node && node.original && node.original[key]);
                var customizer = (type && cfg.switch[type]) || cfg.default;
                if(customizer)
                    customizer(el, node);
            }
            return el;
        };
    }
}));
/**
 * 
 */
(function ($, undefined) {  
    "use strict";
    var a_tag = document.createElement('div');
    var text = document.createTextNode("Button Text");
    var editButton = document.createElement('button');
    var editText = document.createTextNode('수정');
    var deleteButton = document.createElement('button');
    var deleteText = document.createTextNode('삭제');
    
    var btnAddChild;
    var btnAddChildText;
//    var fileBtn = document.createElement('label');
    
    a_tag.className = "jstree-selectListBtn btn_edit_area";
    a_tag.style.top = '8px';
    
    deleteButton.appendChild(deleteText);
    deleteButton.type="button";
    deleteButton.className = "btn_small01 delete none_txt";
    
    editButton.appendChild(editText);
    editButton.type="button";
    editButton.className = 'btn_small01 write none_txt mr4';
    
    
    a_tag.appendChild(editButton);
    a_tag.appendChild(deleteButton);

    btnAddChild = document.createElement('a');
    btnAddChildText = document.createTextNode('메뉴추가');
    
    btnAddChild.setAttribute('href', '#');
    btnAddChild.appendChild(btnAddChildText);
    btnAddChild.className = 'btn_small01 add-list-menu';
    
    // 파일업로드 버튼
    var fileBtn = $('<button/>', {
        class: 'btn_small01 sett none_txt',
        text: '파일업로드',
        css: {
            marginLeft: 4
            ,position: 'relative'
        }
    });
    // 파일업로드 input
    $('<input/>', {
        type: 'file'
        ,name: 'iafile'
        ,css: {
            position: 'absolute'
            ,width: '100%'
            ,height: '100%'
            ,zIndex: -1
            ,left: 0
            ,top: 0
        }
    })
    //.appendTo(fileBtn);
    
    // .jstree-selectListBtn 에 파일 인풋영역 추가
    a_tag.appendChild(fileBtn[0]);
    
    var viewFileName = $('<span/>', {
		class: 'attach_file'
        , css: {
            position: 'absolute'
            , right: '120px'
            , top: '14px'
        }
    });
    $('<i/>', {
        class: 'delete_iafile'
        , css: {
            background: 'url(../../resources/img/btn_close.png) no-repeat'
            , backgroundSize: 'cover'
            , width: 15
            , height: 15
            , display: 'inline-block'
            , position: 'absolute'
            , border: '1px solid #ccc'
            , marginLeft: '5px'
            , marginTop: '3px'
        }
    })
    .appendTo(viewFileName);
    
    // pdf 업로드 버튼
    var btnPPTUpload = $('<label>', {
		class: 'btn_small01 ppt none_txt'
	});
//    
//    var fileBtn = document.createElement('label');
//    	fileBtn.className = 'btn_small01 file none_txt';
    
    $.jstree.plugins.selectListBtn = function (options, parent) {
        var tree = $(options.tree);
        var isSubtree = options.isSubtree;
        
        this.bind = function () {
            parent.bind.call(this); 
            
            this.element.on('click.jstree', '.btn_small01.sett', $.proxy(function (e) {
				var id = $(e.target.closest('li.jstree-node')).attr('id');
				
				vapp.openIaDetailPopup(id);
				//uijs.menu.openFilePopup(id);
			}, this))
            ,
            this.element.on('click.jstree', '.btn_small01.add-list-menu', $.proxy(function(e) {
                var id = $(e.currentTarget).closest('li.jstree-node').attr('id');
              
                tree.jstree("create_node", id, null, "last", function (node) {
                    this.edit(node);
                });
                
            }, this))
            ,
            this.element.on('click.jstree', '.btn_small01.write', $.proxy(function(e) {
                e.stopImmediatePropagation();
                var id = $(e.currentTarget).closest('li.jstree-node').attr('id');
                var ref = tree.jstree(true);
                var node = ref.get_node(id);
                
                ref.edit(node);
            }, this));
            
            this.element.on('click.jstree', '.btn_small01.delete', $.proxy(function(e) {
                e.stopImmediatePropagation();
                var id = $(e.currentTarget).closest('li.jstree-node').attr('id');
                var ref = tree.jstree(true);
                var node = ref.get_node(id);
                
                ref.delete_node(node);
            }, this));
            
            this.element
                .on("click.jstree", ".jstree-selectListBtn", $.proxy(function (e) {
                    e.stopImmediatePropagation();
                    var id = $(e.currentTarget).parent().attr('id');
                    $(e.target).parent().children('.jstree-anchor').trigger('click');
                    //yourFunction(id); // Button on click function
                }, this));
        };
        this.teardown = function () {
            this.element.find(".jstree-selectListBtn").remove();
            parent.teardown.call(this);
        };
        this.redraw_node = function (obj, deep=false, callback, force_draw) {
			
//			this.element.find('.jstree-selectListBtn').remove();
            obj = parent.redraw_node.call(this, obj, deep, callback, force_draw);
            
            if (obj) {
                var node = tree.jstree(true).get_node(obj.id);
                
                if (node) {
	                // 노드 수정 삭제 버튼
                    var tmp = a_tag.cloneNode(true);
                    // 메뉴추가 버튼
                    var addBtn = btnAddChild.cloneNode(true);
                    // 파일추가 버튼 영역 아이디 설정
                    $(tmp).find('.btn_small01.sett').attr({'id': 'iafile_'+obj.id});
                    
                    if (node.original.file_cnt) {
						$(tmp).find('.btn_small01.sett').addClass('added');
					}
                    
//                    $(tmp).find('label').attr('for', 'iafile_'+obj.id);
                    // 파일추가버튼 아이디 설정
                    $(tmp).find('[name=iafile]').attr('id', 'iafile_'+obj.id);
                    
                    // 첨부파일명 표시영역
                    var tmpFileText = viewFileName.clone(true);
                    
                    // ppt 업로드 버튼
                    var tmpBtnPPTUpload = btnPPTUpload.clone(true)[0];
                    
                    var level = $(obj).find('a.jstree-anchor').attr('aria-level');
                    
					// 메인메뉴가 아닌경우만 
                    if (isSubtree) {
//						메인메뉴가 아닌경우에만 메뉴명 옆으로 메뉴추가 버튼 노출						
                        if (node.parent != '#') {
							// 메뉴추가 버튼 - 최하위 메뉴는 표시 안함
                            if (level < 4) {
                                obj.insertBefore(addBtn, obj.childNodes[2]);
                            }
                            
//                          기타 삭제 수정버튼
                            obj.insertBefore(tmp, obj.childNodes[2]);
                            
                            // ppt 업로드 버튼
//                            obj.insertBefore(tmpBtnPPTUpload, obj.childNodes[4]);
                        }
                        console.log(node.original.file_cnt)
//						첨부파일 정보 표시영역 
						if (node.original.view_name != null) {
//							첨부파일 아이디 
							$(tmpFileText).attr('id', 'attach_file_'+obj.id);
//							첨부파일 삭제용 아이디 설정
							$(tmpFileText).attr('data-view-id', node.original.view_id );
							
//							첨부파일 명 표시
							$(tmpFileText).html(function () {
								var html = $(this).html();
								
								return node.original.view_name + html;
							});
							
							obj.insertBefore(tmpFileText[0], obj.childNodes[2]);
						}
                    }
//                  메인메뉴인 경우는 수정 및 삭제 버튼만표시
                    else {
						$(tmp).find('.sett').remove();
                        obj.insertBefore(tmp, obj.childNodes[2]);
                    }
                    
                }
            }
            return obj;
        };
    };
})(jQuery);
 
uijs.iatree = {
    makeTreeData: function(dataArr, parentId = '#', result = []) {
        
        dataArr.forEach($.proxy(function (el) {
            if (el.parent === parentId) {
                result.push(el);
                this.makeTreeData(dataArr, el.id, result);
            }
        }, this));
        
        return result;
    },
    getSiblings: function (tree, nodeID, parent) {
        var tree = tree.jstree(true),
            parentNode = tree.get_node(parent),
            aChildren = parentNode.children,
            aSiblings = [];
    
        aChildren.forEach(function(c){
            if(c !== nodeID) aSiblings.push(c);
        });
        return aSiblings;
    },
    addNode: function (obj, callback) {
        var node = obj.node;
        
        var text = node.text;
        var parent = node.parent == '#' ? 0 : node.parent;
        var name = node.text;
        var link = '#';
        var site_code = uijs.channel.get();
     
        uijs.ajaxDef({
            ajaxOption: {
                url: '/ia/add',
                data: {'parent': parent, 'text': text, 'name': name, 'link': link, 'site_code': site_code},
            }
            , callback: function (data) {
                if (data) {
                    callback.call(this, data);
                }
            }
        });
    },
    updateNode: function (obj, mode) {
        var node = obj.node;
        var data = {'id': node.id};
        
        if (obj.old_parent != undefined) {
            if (obj.old_parent != obj.parent) {
                data.parent = obj.parent;
            }
        }
        
        if (obj.old != undefined) {
            if (obj.text != obj.old) {
                data.text = obj.text;
            }
        }
        
        if (mode != undefined && mode == 'move') {
            data.update_date = new Date();
            data.sort = obj.position;
            
            data.sort_list = [];
            
            $('#'+node.id).closest('ul.jstree-children').find('.jstree-node').each(function () {
                data.sort_list.push({
                    id: $(this).attr('id')
                    , sort: $(this).index()
                });
            });
        }
        
         uijs.ajaxDef({
            ajaxOption: {
                url: '/ia/update',
                data: data
            }
        });
    },
    deleteNode: function (obj) {
        var node = obj.node;
        
         uijs.ajaxDef({
            ajaxOption: {
                url: '/ia/delete',
                data: {'id': node.id}
            }
        });
    }
};


function demo_create(type) {
    var ref = $('#menutree').jstree(true),
        sel = ref.get_selected();
    if(!sel.length) { 
        return false;
    }
    else {
        sel = sel[0];
        sel = ref.create_node(sel, {"type":type});
        if(sel) {
            ref.edit(sel);
        }
    }
};

function demo_rename() {
    var ref = $('#menutree').jstree(true),
        sel = ref.get_selected();
    if(!sel.length) { return false; }
    sel = sel[0];
    ref.edit(sel);
};

function demo_delete() {
    var ref = $('#menutree').jstree(true),
        sel = ref.get_selected();
    if(!sel.length) { return false; }
    ref.delete_node(sel);
};