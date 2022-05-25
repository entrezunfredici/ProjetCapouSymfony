<?php

/*============================================================================
    Name        : ValveCrudController.php
    Path	    : src/Controller/Administrator/Crud
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Valve's actions control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Administrator\Crud;

use App\Entity\Valve;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;

class ValveCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Valve::class;
    }
    
    public function configureCrud(Crud $crud): Crud
    {
        return $crud->setEntityLabelInPlural('Vannes')
                    ->setEntityLabelInSingular('Vanne')
                    ->setPageTitle('index', 'Liste des %entity_label_plural%')
                    ->setPageTitle('edit', fn (Valve $valve) => sprintf('Éditer vanne n°%s', $valve->getId()))
                    ->setPageTitle('new', 'Ajouter une %entity_label_singular%')
                    ->showEntityActionsInlined();
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            BooleanField::new('state'),
        ];
    }
}
