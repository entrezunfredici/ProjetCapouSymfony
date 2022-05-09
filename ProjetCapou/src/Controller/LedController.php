<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LedController extends AbstractController
{
    
    #[Route('/led', name: 'app_led')]
    public function index(): Response
    {
        
        if(isset($_GET['on'])){
            $led = file_get_contents('http://10.100.0.87/gpio.php?on=ON');
        }
        else if(isset($_GET['off'])){
            $led = file_get_contents('http://10.100.0.87/gpio.php?off=OFF');
        }
        
        if(isset($_GET['onLed'])){
            $led = file_get_contents('http://10.100.0.87/gpio.php?onLed=ON');
        }
        else if(isset($_GET['offLed'])){
            $led = file_get_contents('http://10.100.0.87/gpio.php?offLed=OFF');
        }
        
        return $this->render('led/index.html.twig');
        
    }
}
