<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Valve;
use Symfony\Component\HttpFoundation\RedirectResponse;

class ValveController extends AbstractController
{
    private $logger;
    private $doctrine;
    
    public function __construct(ManagerRegistry $doctrine, LoggerInterface $logger)
    {
        $this->doctrine = $doctrine;
        $this->logger = $logger;
    }
    
    #[Route('/valve', name: 'app_valve')]
    public function index(): Response
    {
        $entityManager = $this->doctrine->getManager();
        
        $valveObjects = $this->doctrine->getRepository(Valve::class)->find('13');
        
        if(isset($_GET['on'])){
            $valveObjects->setState('1');
            $entityManager->persist($valveObjects);
            $entityManager->flush();
            $this->logger->info("Un technicien vient d'activer une vanne");
            $response = new RedirectResponse('/valve');
            $response->send();
        }
        else if(isset($_GET['off'])){
            $valveObjects->setState('0');
            $entityManager->persist($valveObjects);
            $entityManager->flush();
            $this->logger->info("Un technicien vient de désactiver une vanne");
        }
        
        return $this->render('valve/index.html.twig');
    }
}
