<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{ 
    private LoggerInterface $logger;
    private RequestStack $requestStack;
    
    public function __construct(LoggerInterface $logger, RequestStack $requestStack)
    {
        $this->logger = $logger;
        $this->requestStack = $requestStack;
    }
    
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        [
        'user_IP' => $userIP,
        'route_name' => $routeName
        ] = $this->getRouteNameAndUserIP();
        
        if(!$this->getUser()){
            $this->logger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient d'accèder à la page: '{$routeName}' ");
        }
        
        return $this->render('home/index.html.twig');
    }
    
    private function getRouteNameAndUserIP(): array
    {
        $request = $this->requestStack->getCurrentRequest();
        
        return [
            'user_IP' => $request->getClientIp() ?? 'Inconnue',
            'route_name' => $request->attributes->get('_route')
        ];
    }
}
