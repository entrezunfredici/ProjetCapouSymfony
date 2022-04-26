<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Symfony\Component\Routing\Annotation\Route;

class MqttController extends AbstractController
{
    #[Route('/mqtt', name: 'app_mqtt')]
    public function index():Response
    {
        require '../vendor/autoload.php';

//         $process = new Process(['echo', 'hello']);
// //         $process->run();
    
//         while ($process->run()){
//             //dump('test');
//             echo 'test';
//         }
        
//         // executes after the command finishes
//         if (!$process->isSuccessful()) {
//             throw new ProcessFailedException($process);
//         }
        
//         echo $process->getOutput();

//         $process = new Process(['echo', 'hello']);
//         $process->start();
        
//         foreach ($process as $type => $data) {
//             if ($process::OUT === $type) {
//                 echo "\nRead from stdout: ".$data;
//             } else { // $process::ERR === $type
//                 echo "\nRead from stderr: ".$data;
//             }
//         }
        

        
//         $server   = '10.100.0.5';
//         $port     = 1883;
//         $clientId = '01';
        
//         $mqtt = new \PhpMqtt\Client\MqttClient($server, $port, $clientId);
//         $mqtt->connect();
//         echo 'connecte';
//         $mqtt->subscribe('Gateway', function($topic, $message){
//             echo sprintf("Received message on topic [%s]: %s\n", $topic, $message);
//         }, 0);
        //$mqtt->loop();
        
        $process = new Process(['echo', 'hello']);
        $process->run(function ($type, $buffer) {            
            //echo 'OUT > '.$buffer;
            $server   = '10.100.0.5';
            $port     = 1883;
            $clientId = '01';
            
            $mqtt = new \PhpMqtt\Client\MqttClient($server, $port, $clientId);
            $mqtt->connect();
            echo 'connecte';
            $mqtt->subscribe('Gateway', function($topic, $message){
                echo sprintf("Received message on topic [%s]: %s\n", $topic, $message);
            }, 0);
            
            $mqtt->loop();
            $mqtt->disconnect();                
            
        });
            
        return $this->render('mqtt/index.html.twig');
    }
}