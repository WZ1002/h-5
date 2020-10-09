<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";
//验证用户是否存在
if(isset($_POST['user'])){
    $user = $_POST['user'];
    $result = $conn->query("select * from registry where username = '$user'");
    if($result->fetch_assoc()){
        echo true;//用户存在
    }else{
        echo false;//用户不存在
    }    
}else{
    exit('非法操作');
}