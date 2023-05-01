<?php
    $token = "vk1.a.uCudWR-JvWvkGUvJjwvx5ODNebQmkSS1ypccv1HqaGVlaD0CXMddPehukB_nhERF85DyFb0HlNSG6-ZdNwXLrZ1GoHZj3UOMP7fyyC7fbAPDDrncOTwIu8lQAJsK7YRKsK9Odfndb5N9HmStrL6yk-usPSTWMtMetnN3jAh61cPol6VnP3jp_KoppJv6boO4h0-0dXJGerl1nF-iLTNR0g";
    $f=3;
    $url = "https://api.vk.com/method/groups.search?city_id=1&count=1000&q=sex&access_token=vk1.a.uCudWR-JvWvkGUvJjwvx5ODNebQmkSS1ypccv1HqaGVlaD0CXMddPehukB_nhERF85DyFb0HlNSG6-ZdNwXLrZ1GoHZj3UOMP7fyyC7fbAPDDrncOTwIu8lQAJsK7YRKsK9Odfndb5N9HmStrL6yk-usPSTWMtMetnN3jAh61cPol6VnP3jp_KoppJv6boO4h0-0dXJGerl1nF-iLTNR0g&v=5.131";
    $url2= "https://loveplanet.ru";
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$data = curl_exec($curl);
echo $data;
?>