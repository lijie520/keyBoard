(function(global,factory){
    if(typeof define === 'function' && define.amd){
        define(function(){
            return factory();
        });
    }else if(typeof module !== 'undefined' && module.exports){
        module.exports = factory();
    }else{
        global.keyBoard = factory(global);
    }
}(typeof window !== 'undefined' ? window : this,function(win){
    var idTag = 0;
    var keyBoard = function(numberId,option){
        this.version = '0.0.1';
        var me = this,
            insertId = 'keyBoard'+(++idTag),
            payId = 'keyBoardPay'+(idTag),
            defaultOpt = {
              
                decimal:2, //小数点长度
                integer:4, //整数部分长度
                btnText:'确认支付', //按钮显示的文字
                btnCallBack:null, //按钮点击后的回调
               
            }
        for(var item in defaultOpt){
            if(option[item]){
                defaultOpt[item] = option[item];
            }
        }
        this.option = defaultOpt;
        var style = ''

        $('head').append('<style type="text/css">'+style+'</style>');

        var html = '<div id="'+insertId+'" class="keyBoard">'+
                    '    <i data-num="1" class="bnt bnl">1</i>'+
                    '    <i data-num="2" class="bnt">2</i>'+
                    '    <i data-num="3" class="bnt">3</i>'+
                    '    <i data-num="del" style="border-right:none;" class="del bnt"><span class="delimg"><span></i>'+
                    '    <i data-num="callback" id="'+payId+'" class="keyBoardPay">'+me.option.btnText+'</i>'+
                    '    <i data-num="4" class="bnl">4</i>'+
                    '    <i data-num="5">5</i>'+
                    '    <i data-num="6" class="bnr">6</i>'+
                    '    <i data-num="7" class="bnl">7</i>'+
                    '    <i data-num="8">8</i>'+
                    '    <i data-num="9" class="bnr">9</i>'+
                    '    <i data-num="0" class="zero bnl bnb">0</i>'+
                    '    <i data-num="." class="bnr bnb"><span>.</span></i>'+
                    '</div>';
        $('body').append(html);
        this.dom = $('#'+insertId);
        this.numDom = $(numberId);
        this.payDom = $('#'+payId);
        this.init = function(){ //插入style、元素 
            me.dom.on('touchstart','i',function(evt){
                evt.preventDefault();
                var num = $(this).data('num');
                switch(num){
                    case 'del':
                        me.delete(me.numDom);
                        break;
                    case 'callback':
                        me.callback();
                        break;
                    
                    default:
                        me.insert(me.numDom,num,me.option);
                }
            });
        }

        this.init();
        return this;
    }

    keyBoard.prototype.delete = function(dom){
        var str = dom.text().trim();
        if(str !== ''){
            dom.text(str.substring(0,str.length-1));
            if(dom.text()==''){
                this.payDom.removeClass('active');
                this.num = 0;
            }else this.num = dom.text();
        }
        return this;
    }
    keyBoard.prototype.callback = function(){
        if(this.payDom.hasClass('active')){
            this.option.btnCallBack && this.option.btnCallBack(parseFloat(this.num));
        }
    }
 
    keyBoard.prototype.insert = function(dom,num,option){
        var str = dom.text();
        if(str == ''){ //没有内容
            if(num == '.'){
                dom.text('0.');
                return;
            }
        }else if(str == '0' && str.length == 1 && num != '.'){ //如果之前输入了0，后面只能输入小数点
            return;
        }else if(str.indexOf('.')>-1){ //已经输入过小数点了
            if(num == '.') return;
            if(str.substring(str.indexOf('.')+1,str.length).length == option.decimal) return;
        }else if(num != '.'){ //没有输入过小数点
            if(str.length==option.integer) return;
        }
        this.num = str + num;
        dom.text(this.num);
        this.payDom.addClass('active');
        return this;
    }

  
    return keyBoard;
}));


