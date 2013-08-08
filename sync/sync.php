<?php

require('persona.php');

class SyncController extends \atlatl\Controller {
    protected function jsonResponse($data, $status = 200) {
        $response = \atlatl\Injector::give('Response');
        $response->setHeader('Content-Type', 'x-application/json');
        $response->setHeader('Access-Control-Allow-Origin', '*');
        $response->setStatus($status);
        $response->setBody(json_encode($data));
        return $response;
    }
    
    function login() {
        $persona = new Persona('http://localhost:8008');
        $result = $persona->verifyAssertion($_POST['assertion']);
        if($result->status == 'okay') {
            $_SESSION['uid'] = $result->email;
            return $this->jsonResponse(array(
                'result' => 'success',
                'email' => $result->email
            ));
        } else {
            $_SESSION['uid'] = null;
            return $this->jsonResponse(array('result' => 'error'), 403);
        }
    }

    function logout() {
        $_SESSION['uid'] = null;
        return $this->jsonResponse(array('result' => 'success'));
    }
    
    function saveTasks() {
        $tasks = json_decode($this->request->allpost());
    }

    function retrieveTasks() {
    }
}