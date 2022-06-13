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
use EasyCorp\Bundle\EasyAdminBundle\Config\UserMenu;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractDashboardController
{   
    private $doctrine;
    
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    
    #[Route('/admin', name: 'app_admin')]
    #[IsGranted('ROLE_ADMIN')]
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
        return $this->render('roles/administrator/index.html.twig', ['users'=>$users, 'plots'=>$plots, 'openValve'=>$openValve, 'cards'=>$cards]);
    }
    
    public function configureUserMenu($user): UserMenu
    {
        $fullName = $user->getFirstName().' '.$user->getLastName();
        
        return parent::configureUserMenu($user)
        // use the given $user object to get the user name
        ->setName($fullName)
        // use this method if you don't want to display the name of the user
        
        ->addMenuItems([
            MenuItem::linkToRoute('Mot de passe', 'fa fa-lock', 'app_admin_password_change'),
        ]);
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
        
        yield MenuItem::section('Piquets');
        yield MenuItem::subMenu('Actions', 'fas fa-list')->setSubItems([
            MenuItem::linkToCrud('Ajouter piquet', 'fas fa-plus', Card::class)->setAction(Crud::PAGE_NEW),
            MenuItem::linkToCrud('Liste piquets', 'fas fa-eye', Card::class)
        ]);
        
        yield MenuItem::linkToLogout('Se déconnecter', 'fas fa-sign-out-alt');
    }
}