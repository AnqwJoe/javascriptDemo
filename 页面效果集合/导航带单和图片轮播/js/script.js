//封装一个代替getElementById的方法

function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}

var index=0,
    timer=null,
    pics=byId('banner').getElementsByTagName('div'),
    dots=byId('dots').getElementsByTagName('span'),
    prev=byId('prev'),
    next=byId('next'),
    len=pics.length,
    subMenu=byId('sub-menu'),
    innerBox=subMenu.getElementsByClassName('inner-box'),
    menu=byId('menu-content'),
    menuItems=menu.getElementsByClassName('menu-item');


function slideImg(){
    var main=byId('main');

    //划过清除定时器 离开继续
    main.onmouseover=function(){
        //划过清除
        if(timer)clearInterval(timer);
    }
    main.onmouseout=function(){
        timer=setInterval(function(){
            index++;
            if(index>=len){
                index=0;
            }
            //切换图片
            changeImg();
        },2000);
    }
    //自动在main上触发鼠标离开的事件
    main.onmouseout();

    //遍历所有点击，且绑定点击事件，点击圆点切换图片
    for(var d=0;d<len;d++){
        //给所有span添加一个id的属性，值为d 作为span的索引
        dots[d].id=d;
        dots[d].onclick=function(){
            //改变index为当前span的id值
            index=this.id;

            //调用changeImg 实现切换图片
            changeImg();
        }
    }


    //按钮下一张
    next.onclick=function(){
        index++;
        if(index>=len)index=0;
        changeImg();
    }
    //按钮上一张
    prev.onclick=function(){
        index--;
        if(index<0)index=len-1;
        changeImg();
    }
    //导航菜单
    //遍历主菜单 且绑定事件
    for(var m=0;m<menuItems.length;m++){
        menuItems[m].setAttribute('data-index',m);
        menuItems[m].onmouseover=function(){
            subMenu.className='sub-menu';
            //给每一个menu-item定义data-index属性 作为索引
            var idx=this.getAttribute('data-index');
            //遍历所有子菜单 将每一个都隐藏
            for(var j=0; j<innerBox.length;j++){
                innerBox[j].style.display='none';
                menuItems[j].style.background='none';
                menuItems[j].onmouseout=function(){
                    this.style.background='none';
                }
            }
            menuItems[idx].style.background='rgba(0,0,0,0.2)'
            innerBox[idx].style.display='block';
        }
    }
    menu.onmouseout=function(){
        subMenu.className='sub-menu hide';
    }
    subMenu.onmouseover=function(){
        this.className='sub-menu';
    }
    subMenu.onmouseout=function(){
        this.className='sub-menu hide';
    }

}


//切换图片
function changeImg(){
    //遍历banner下多余的DIV及dots下所有的span 将其隐藏 清除类
    for(var i=0;i<len;i++){
        pics[i].style.display='none';
        dots[i].className="";
    }
    //根据index索引找到当前div和当前span 将其显示出来
    pics[index].style.display='block';
    dots[index].className='active';
}

slideImg();