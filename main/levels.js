// 关卡
function levels( num ){

    var data = [
        [ { x:80 , y:80 , life:1 } ],
        [ { x:10 , y:20 , life:1 } , { x:60 , y:80 , life:2 } ],
        [ { x:100 , y:40 , life:1 } , { x:150 , y:80 , life:1 } , { x:240 , y:100 , life:2 } ],
    ];

    return data[ num - 1 ];

}