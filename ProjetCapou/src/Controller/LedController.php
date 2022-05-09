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
    private $logger;
    private $requestStack;
    
    public function __construct(ManagerRegistry $doctrine, LoggerInterface $logger, RequestStack $requestStack)
    {
        $this->doctrine = $doctrine;
        $this->logger = $logger;
        $this->requestStack = $requestStack;
    }
    
    #[Route('/led', name: 'app_led')]
    public function index(): Response
    {
        
        if(isset($_GET['on'])){
            $led = file_get_contents('http://10.100.0.87/gpio.php?on=ON');
            $this->logger->info("Un utilisateur vient de modifier l'état d'une vanne ");
        }
        else if(isset($_GET['off'])){
            $led = file_get_contents('http://10.100.0.87/gpio.php?off=OFF');
            $this->logger->info("Un utilisateur vient de modifier l'état d'une vanne ");
        }
        
        if(isset($_GET['onLed'])){
            $led = file_get_contents('http://10.100.0.87/gpio.php?onLed=ON');
            $this->logger->info("Un utilisateur vient de modifier l'état d'une vanne ");
        }
        else if(isset($_GET['offLed'])){
            $led = file_get_contents('http://10.100.0.87/gpio.php?offLed=OFF');
            $this->logger->info("Un utilisateur vient de modifier l'état d'une vanne ");
        }
        
        return $this->render('led/index.html.twig');
        
    }
}
