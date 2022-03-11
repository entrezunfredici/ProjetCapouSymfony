<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'home')]
    public function index()
    {
//         $logger->info('premier log');
        //LoggerInterface $logger
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    
//     public function index(): Response
//     {
//         return $this->json([
//             'message' => 'Welcome to your new controller!',
//             'path' => 'src/Controller/HomeController.php',
//         ]);
//     }
}
