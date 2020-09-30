<?php

header('content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','root');
define('DBNAME','xiaomi');
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
if($conn->connect_error){
die('数据库连接失败'.$conn->connect_error);
};
$conn->query('SET NAMES UTF8');

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

$res = $conn->query("select * from 360goods");

$arr = Array();
for($i=0;$i<$res->num_rows;$i++){
  $arr[$i]=$res->fetch_assoc();
}
echo json_encode($arr);
