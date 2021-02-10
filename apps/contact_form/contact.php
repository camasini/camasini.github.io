<?php

// Firs part of e-mail
$address1 =  "pawel.muzyka@";
// Second part of e-mail
$address2 = "interia.pl";
$address12 = $address1." ".$address2." ";
$to = $address12;
$id = uniqid();
$subject = "Nowe zlecenie #{$id}";
$email_from = $_POST["email"];
$content = $_POST["message"];
$test = $_POST["message"];
// You must create your mail on domain where you host site. Otherwise message from customer willn't send or going to SPAM
$address3 =  "biuro@";
$address4 = "nesca.pl";
$address34 = $address3." ".$address4." ";
$from = $address34;
$data = date("Y-m-d H:i:s");
$message = "Wiadomość ze strony nesca.pl {$data}\r\n \r\n{$content}";
$headers .= 'From: '.$email_from.'<'.$from.'>' . "\r\n"; 

$headersfrom='';
    $headersfrom .= 'MIME-Version: 1.0' . "\r\n";
    $headersfrom .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
    $headersfrom .= $headers;

//Catch bots on empty input
if (!empty($_POST['hidden'])) die();

//Block duplicate data on bots
$i = 0;
foreach ($_POST as $key => $val){
	if (stristr($val, 'http:')) $i++;
	if (stristr($val, 'https:')) $i++;
	if (stristr($val, '[url=')) $i++;
	if (stristr($val, '[url]')) $i++;
}
if ($i > 1) die();

//Block injections
function IsInjected($str)
{
    $injections = array('(\n+)',
           '(\r+)',
           '(\t+)',
           '(%0A+)',
           '(%0D+)',
           '(%08+)',
           '(%09+)'
           );
               
    $inject = join('|', $injections);
    $inject = "/$inject/i";
    
    if(preg_match($inject,$str))
    {
      return true;
    }
    else
    {
      return false;
    }
}

if(IsInjected($email_from))
{
    echo "Bad email value!";
    exit;
}

if(mail($to,$subject,$message,$headers)) {
    include('confirm.html');
} else {
  include('reject.html');
};

?>