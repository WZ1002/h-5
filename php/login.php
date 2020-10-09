<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";
//登陆时验证用户输入
if(isset($_POST['user'])&& isset($_POST['pass'])){
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $result = $conn->query("select * from registry where username='$user'and password='$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false ;
    }
}