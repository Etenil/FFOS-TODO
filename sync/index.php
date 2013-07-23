<?php

require(__DIR__ . '/vendor/autoload.php');
require('conf.php');

class Storage {
    // TODO
}

class SyncController extends \atlatl\Controller {
    function saveTasks() {
        $tasks = json_decode($this->request->allpost());
    }

    function retrieveTasks() {
        $tasks = 
    }
}

$app = new \atlatl\Core();
$app->serve()

