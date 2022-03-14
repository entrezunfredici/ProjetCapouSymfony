<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Psr\Log\LoggerInterface;

class HomeController extends AbstractController
{
    private LoggerInterface $logger;
    private RequestStack $requestStack;
    private Security $security;
    
    public function __construct(LoggerInterface $logger, RequestStack $requestStack, Security $security)
    {
        $this->logger = $logger;
        $this->requestStack = $requestStack;
        $this->security = $security;
    }
    
    #[Route('/', name: 'home')]
    public function index(LoggerInterface $logger)
    {
        [
            'user_IP' => $userIP,
            'route_name' => $routeName
        ] = $this->getRouteNameAndUserIP();
        
        //$userEmail = $this->security->getUser()->getEmail();
        
        if(!$this->getUser()){
            $this->logger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient d'accèder à la page: '{$routeName}' ");
        }

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
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
