<?php

return array(


    'pdf' => array(
        'enabled' => true,
        //'binary'  => '/usr/local/bin/wkhtmltopdf', //default
        'binary' => '"e:\Program Files\wkhtmltopdf\bin\wkhtmltopdf"', //windows
        //'binary'  => '/usr/local/bin/wkhtmltopdf-amd64', //vagrant
         'timeout' => false,
        'options' => array(),
        'env'     => array(),
    ),
    'image' => array(
        'enabled' => true,
        'binary'  => '/usr/local/bin/wkhtmltoimage-amd64',
        'timeout' => false,
        'options' => array(),
        'env'     => array(),
    ),

);
