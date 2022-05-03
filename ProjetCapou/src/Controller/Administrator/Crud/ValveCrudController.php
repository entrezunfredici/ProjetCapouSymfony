<?php

/*============================================================================
    Name        : ValveCrudController.php
    Path	    : src/Controller/Administrator/Crud
    Author      : BTS SNIR, LycÃ©e Antoine Bourdelle
    Description : Valve's actions control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Administrator\Crud;

use App\Entity\Valve;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use phpDocumentor\Reflection\Types\Integer;

class ValveCrudController extends AbstractCrudController
{
    private $doctrine;
    private $logger;
    private $requestStack;
    
    public function __construct(ManagerRegistry $doctrine, LoggerInterface $logger, RequestStack $requestStack)
    {
        $this->doctrine = $doctrine;
        $this->logger = $logger;
        $this->requestStack = $requestStack;
        
//         $id = Integer::class;
        
//         $valves = $this->doctrine->getRepository(Valve::class)->find($id);
        
//         ['user_IP' => $userIP] = $this->getRouteNameAndUserIP();
        
//         if (!$valves) {
//             $this->logger->info("Un administrateur ayant l'adresse IP '{$userIP}' vient d'ajouter une nouvelle vanne ");
//         }
//         else {
//             $this->logger->info("Un administrateur ayant l'adresse IP '{$userIP}' vient de modifier l'état d'une vanne ");
//         }
    }
    
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        $entityManager->persist($entityInstance);
        $entityManager->flush();
        
        $this->logger->info("Un administrateur vient d'ajouter une nouvelle vanne ");
    }   
    
    public static function getEntityFqcn(): string
    {
        return Valve::class;
    }
    
//     public function createEntity(string $entityFqcn):void
//     {
//         $this->logger->info("Un administrateur vient d'ajouter une nouvelle vanne ");
//     }

    public function updateEntity($entityManager, $entityInstance):void
    {
        $this->logger->info("Un administrateur vient de modifier l'état d'une vanne ");
        $entityManager->persist($entityInstance);
        $entityManager->flush();
    }
    
    public function deleteEntity($entityManager, $entityInstance):void
    {
        $this->logger->info("Un administrateur vient de supprimmer une vanne ");
        $entityManager->remove($entityInstance);
        $entityManager->flush();
    }
    
    public function configureCrud(Crud $crud): Crud
    {
        return $crud->setEntityLabelInPlural('Vannes')
        ->setEntityLabelInSingular('Vanne')
        ->setPageTitle('index', 'Liste des %entity_label_plural%')
        ->setPageTitle('edit', fn (Valve $valve) => sprintf('Ã‰diter vanne nÂ°%s', $valve->getId()))
        ->setPageTitle('new', 'Ajouter une %entity_label_singular%');
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            BooleanField::new('state'),
        ];
    }
    
}
