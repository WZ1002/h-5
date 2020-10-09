<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";
//往数据库添加数据
if(isset($_POST['user'])){
    $user = $_POST['user'];
  $pass = sha1($_POST['pass']);
   $email = $_POST['email'];
   $conn->query("insert registry values(default,'$user','$pass','$email',NOW())");
   
}