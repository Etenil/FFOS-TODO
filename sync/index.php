<?php

require(__DIR__ . '/vendor/autoload.php');
require('conf.php');

require('storage.php');
require('sync.php');

$app = new \atlatl\Core();
$app->serve(array(
    'POST:/login' => 'SyncController::login',
    '/logout'     => 'SyncController::logout',
    '/save'       => 'SyncController::saveTasks',
    '/retrieve'   => 'SyncController::retrieveTasks',
));

