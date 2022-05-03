<?php

/*============================================================================
    Name        : AdminController.php
    Path	    : src/Controller/Administrator
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Administrator's interface control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Administrator;

use App\Entity\Card;
use App\Entity\Plot;
use App\Entity\User;
use App\Entity\Valve;
use Doctrine\Persistence\ManagerRegistry;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractDashboardController
{
    #[IsGranted('ROLE_ADMIN')]
    
    private $doctrine;
    private LoggerInterface $logger;
    private RequestStack $requestStack;
    
    public function __construct(ManagerRegistry $doctrine, LoggerInterface $logger, RequestStack $requestStack)
    {
        $this->doctrine = $doctrine;
        $this->logger = $logger;
        $this->requestStack = $requestStack;
    }
    
    #[Route('/admin', name: 'app_admin')]
    public function index(): Response
    {
        $users = $this->doctrine->getRepository(User::class)->count([]);
        $plots = $this->doctrine->getRepository(Plot::class)->count([]);
        $openValve = $this->doctrine->getRepository(Valve::class)->count(['state' => 1]);
        if(($this->doctrine->getRepository(Card::class)->count([]))!=0){
            $cards = $this->doctrine->getRepository(Card::class)->count([]);
        }
        else{
            $cards = 0;
        }

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        // $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        // return $this->redirect($adminUrlGenerator->setController(OneOfYourCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        
        [
        'user_IP' => $userIP,
        'route_name' => $routeName
        ] = $this->getRouteNameAndUserIP();
        
        $this->logger->info("Un administrateur ayant l'adresse IP '{$userIP}' vient d'acc�der à la page: '{$routeName}' ");
        
        return $this->render('roles/administrator/index.html.twig', ['users'=>$users, 'plots'=>$plots, 'openValve'=>$openValve, 'cards'=>$cards]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Irrigation Connectée');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToUrl('Accueil', 'fas fa-home', $this->generateUrl('app_admin'));
        
        yield MenuItem::section('Utilisateurs');
        yield MenuItem::subMenu('Actions', 'fas fa-list')->setSubItems([
            MenuItem::linkToCrud('Ajouter utilisateur', 'fas fa-plus', User::class)->setAction(Crud::PAGE_NEW),
            MenuItem::linkToCrud('Liste utilisateurs', 'fas fa-eye', User::class)
        ]);
        
        yield MenuItem::section('Parcelles');
        yield MenuItem::subMenu('Actions', 'fas fa-list')->setSubItems([
            MenuItem::linkToCrud('Ajouter parcelle', 'fas fa-plus', Plot::class)->setAction(Crud::PAGE_NEW),
            MenuItem::linkToCrud('Liste parcelles', 'fas fa-eye', Plot::class)
        ]);
        
        yield MenuItem::section('Vannes');
        yield MenuItem::subMenu('Actions', 'fas fa-list')->setSubItems([
            MenuItem::linkToCrud('Ajouter vanne', 'fas fa-plus', Valve::class)->setAction(Crud::PAGE_NEW),
            MenuItem::linkToCrud('Liste vannes', 'fas fa-eye', Valve::class)
        ]);

        yield MenuItem::linkToLogout('Se déconnecter', 'fas fa-sign-out-alt');
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