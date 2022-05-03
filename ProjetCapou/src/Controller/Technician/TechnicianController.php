<?php

/*============================================================================
    Name        : TechnicianController.php
    Path	    : src/Controller/Technician
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Technician's interface control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Technician;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class TechnicianController extends AbstractController
{
    private UrlGeneratorInterface $urlGenerator;
    private LoggerInterface $logger;
    private RequestStack $requestStack;
    
    public function __construct(UrlGeneratorInterface $urlGenerator, LoggerInterface $logger, RequestStack $requestStack)
    {
        $this->urlGenerator = $urlGenerator;
        $this->logger = $logger;
        $this->requestStack = $requestStack;
    }
    
    #[Route('/technician', name: 'app_technician')]
    public function index(): Response
    {
        
        [
        'user_IP' => $userIP,
        'route_name' => $routeName
        ] = $this->getRouteNameAndUserIP();
        
        $this->logger->info("Un technicien ayant l'adresse IP '{$userIP}' vient d'acc�der à la page: '{$routeName}' ");
        
        return $this->render('roles/technician/index.html.twig');
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
?>