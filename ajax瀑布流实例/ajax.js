function ajax(method,url,data,success){
    var xhr = null;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else{
        xhr = ActiveXObject("Microsoft","XMLHTTP");
    };

    if(method == 'get' && data){ //如果get方法并且有数据存在
        url += '?' +data;
    }

    xhr.open(method,url,true);
    if(method == 'get'){
        xhr.send();
    }else{
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success && success(xhr.responseText);
            }else{
                alert('出错了,err' + xhr.status);
            }
        }
    }

}